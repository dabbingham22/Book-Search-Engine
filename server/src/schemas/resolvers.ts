import { signToken, AuthenticationError } from '../utils/auth.js';
import { User } from '../models/index.js';


const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
    },

    Mutation: { 
        login: async (_parent: unknown, { email, password }: { email: string; password: string }) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new AuthenticationError('User or password incorrect');
            }
            const token= signToken(user);
            return { token, user };
        },

        addUser: async (_parent: unknown, { username, email, password }: { username: string; email: string; password: string }) => {
            const user = await User.create({ username, email, password });
    const token = signToken(user);
    return { token, user };
          },
    }
};

export default resolvers;
