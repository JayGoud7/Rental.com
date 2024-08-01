import GoogleProvider from "next-auth/providers/google";
import connectDB from "../configs/Database";
import User from "../models/User";


export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      //conect to database
      await connectDB();
      //check if user exist
      const userExists = await User.findOne({ email: profile.email });
      //if not add user to database
      if (!userExists) {
        //truncate
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //return to true to login
      return true;
    },
    async session({ session }) {
      //get user from database
      const user = await User.findOne({ email: session.user.email });
      //assign the user id to session
      session.user.id = user._id.toString();
      //return session
      return session;
    },
  },
};
