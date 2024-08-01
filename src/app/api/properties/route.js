import connectDB from "@/src/configs/Database";
import cloudinary from "@/src/configs/cloudinary";
import Property from "@/src/models/Property";
import { getSessionUser } from "@/src/utils/getSessionUser";

export const GET = async (request) => {
  try {
    await connectDB();
    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 3;

    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});

    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      properties,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("something fishyyy", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    //access all values in propertyform
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((img) => img.name !== "");

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
      // images,
    };

    //upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //covert the image data to base64

      const imageBase64 = imageData.toString("base64");

      //make request to upload to cloudinary

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "PropertyImg",
        }
      );
      imageUploadPromises.push(result.secure_url);

      //wait for all imgs to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    return new Response("Failed to add propertyform ", { status: 500 });
  }
};
