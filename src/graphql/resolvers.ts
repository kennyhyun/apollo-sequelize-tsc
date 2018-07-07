import { ObjectId } from 'bson';
import { User, UserModel } from '../models';
import { RootResolvers, Context } from '../types';

interface UserInput {
  id: string;
  platform: string;
  vendor: string;
  product: string;
}

const resolvers = {
  Query: {
    user: (root: RootResolvers, args: UserInput, context: Context) => {
      const { id } = args;
      const user = User.findById(id);
      return user;
    },
  },
  User: {},
  Mutation: {
    upsertUser: async (root: UserModel, { id, platform, vendor, product }: UserInput) => {
      const modifier = { platform, vendor, product };

      if (id) {
        const [cnt] = await User.update(modifier, { where: { id } });
        if (cnt < 1) {
          throw new Error(`Could not update user ${id}`);
        }
        return { user: await User.findById(id) };
      } else {
        const user = User.build({
          id: new ObjectId().toString(),
          ...modifier,
        });
        await user.save();
        console.log('created user', user);
        return { user };
      }
    },
  },
};

export default resolvers;
