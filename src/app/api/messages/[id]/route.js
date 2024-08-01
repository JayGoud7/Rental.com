import connectDB from "@/src/configs/Database";
import Message from "@/src/models/Message";
import { getSessionUser } from "@/src/utils/getSessionUser";

export const dynamic = "force-dynamic";

//put

export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

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

    const message = await Message.findById(id);

    if (!message) return new Response("message not found", { status: 404 });

    if (message.recipient.toString() !== userId) {
      return new Response("Unautheroized", { status: 401 });
    }

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

//delete
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

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

    const message = await Message.findById(id);

    if (!message) return new Response("message not found", { status: 404 });

    if (message.recipient.toString() !== userId) {
      return new Response("Unautheroized", { status: 401 });
    }

    await message.deleteOne();

    return new Response(JSON.stringify("message deleted"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
