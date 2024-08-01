import connectDB from "@/src/configs/Database";
import Message from "@/src/models/Message";
import { getSessionUser } from "@/src/utils/getSessionUser";

export const dynamic = "force-dynamic";

//get/unread

export const GET = async (req) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({
          message: "you must login!",
        }),
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
