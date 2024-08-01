import connectDB from "@/src/configs/Database";
import Property from "@/src/models/Property";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const userId = params.userId;

    if (!userId) {
      return new Response("User Id required", {
        status: 400,
      });
    }

    const Userpropertiesdata = await Property.find({ owner: userId });

    return new Response(JSON.stringify(Userpropertiesdata), { status: 200 });
  } catch (error) {
    
    console.log(error);

    return new Response("something fishyyy", { status: 500 });
  }
};
