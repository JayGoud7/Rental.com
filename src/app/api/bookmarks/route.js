import connectDB from "@/src/configs/Database";
import User from "@/src/models/User";
import Property from "@/src/models/Property";
import { getSessionUser } from "@/src/utils/getSessionUser";

export const dynamic = "force-dynamic";

//get /pai/bookmarks

export const GET = async () => {
  try {
    await connectDB();

    const sessionuser = await getSessionUser();

    if (!sessionuser || !sessionuser.userId) {
      return new Response("user id is required", {
        status: 401,
      });
    }
    const { userId } = sessionuser;
    //find user in database
    const user = await User.findOne({ _id: userId });

    //get bookmark
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

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

    let message;

    if (isBookmarked) {
      //if already bookmarked remove it
      user.bookmarks.pull(propertyId);
      message = "bookmark removed successfully";
      isBookmarked = false;
    } else {
      //if not
      user.bookmarks.push(propertyId);
      message = "bookmarked added successfully";
      isBookmarked = true;
    }

    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", error);
  }
};
