import connectDB from "@/src/configs/Database";
import Property from "@/src/models/Property";
import { getSessionUser } from "@/src/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const propertydata = await Property.findById(params.id);

    if (!propertydata)
      return new Response("not found property", { status: 404 });

    return new Response(JSON.stringify(propertydata), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("something fishyyy", { status: 500 });
  }
};

//delete

export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    //check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response("not found property", { status: 404 });

    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response(JSON.stringify("property deleted", { status: 200 }));
  } catch (error) {
    console.log(error);

    return new Response("something fishyyy", { status: 500 });
  }
};

//put request
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = params;

    const { userId } = sessionUser;

    const formData = await request.formData();

    //access all values in propertyform
    const amenities = formData.getAll("amenities");

    //get property toi update

    const existProperty = await Property.findById(id);

    if (!existProperty) {
      return new Response("Property does not exist", { status: 404 });
    }

    //verify Ownership
    if (existProperty.owner.toString() !== userId) {
      return new Response("unauthorized", { status: 400 });
    }

    //create property data object to store in database

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    //update to database

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    return new Response("Failed to add propertyform ", { status: 500 });
  }
};
