import connectDB from "@/src/configs/Database";
import User from "@/src/models/User";

import { getSessionUser } from "@/src/utils/getSessionUser";
export const dynamic = "force-dynamic";

export const POST = async (req) => {
  try {
    await connectDB();

    const { propertyId } = await req.json();
    const sessionuser = await getSessionUser();

    if (!sessionuser || !sessionuser.userId) {
      return new Response("user id is required", {
        status: 401,
      });
    }

    //find user in database
    const { userId } = sessionuser;
    const user = await User.findOne({ _id: userId });

    //check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", error);
  }
};
