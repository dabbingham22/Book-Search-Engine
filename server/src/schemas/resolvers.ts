import { signToken } from "../utils/auth.js";
import { AuthenticationError } from "apollo-server";
import { User } from "../models/User.js";

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: { user: any }) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate(
          "savedBooks"
        );
      }
      throw new AuthenticationError("Not Authenticated");
    },
  },

  Mutation: {
    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("User or password incorrect");
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (
      _parent: unknown,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (
      _parent: any,
      { book }: { book: any },
      context: { user: any }
    ) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._Id },
          {
            $push: { savedBooks: book },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Could not find user");
    },
    removeBook: async (
      _parent: unknown,
      { bookId }: { bookId: string },
      context: { user: any }
    ) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { savedBooks: { bookId } },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Could not find user");
    },
  },
};

export default resolvers;
