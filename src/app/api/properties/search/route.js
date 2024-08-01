import connectDB from "@/src/configs/Database";
import Property from "@/src/models/Property";

//get search
// export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location");

    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    //only check for property
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
