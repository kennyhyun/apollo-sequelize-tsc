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
      /*
      return {
        id: new ObjectId().toString(),
        platform: 'a platform',
        vendor: 'a vendor',
        product: 'a product',
        ip: '0.0.0.0',
        countryCode: 'AU',
        city: 'Sydney',
      };
      */
    },
  },
  User: {},
  Mutation: {
    upsertUser: async (root: UserModel, { id, platform, vendor, product }: UserInput) => {
      const user = User.build({
        id: new ObjectId().toString(),
        platform,
        vendor,
        product,
      });
      await user.save();
      console.log('user resolver', user);
      return { user };
    },
  },
};

export default resolvers;
