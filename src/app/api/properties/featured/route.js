import connectDB from "@/src/configs/Database";

import Property from "@/src/models/Property";



export const GET = async (req) => {
  try {
    await connectDB();

    const properties = await Property.find({
      is_featured: true,
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("something fishyyy", { status: 500 });
  }
};
