import connectDB from "@/src/configs/Database";
import Message from "@/src/models/Message";
import { getSessionUser } from "@/src/utils/getSessionUser";

export const dynamic = "force-dynamic";
//get

export const GET = async () => {
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

    const readmessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) //sort read msgs in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const unreadmessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) //sort read msgs in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadmessages, ...readmessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

//post
export const POST = async (req) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await req.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({
          message: "you must login!",
        }),
        { status: 401 }
      );
    }

    const { user } = sessionUser;

    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "can not send a message to yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      name,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
