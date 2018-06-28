import { ObjectId } from 'bson';
import { User } from '../models';

interface UserInput {
  id: string;
  platform: string;
  vendor: string;
  product: string;
}

const resolvers: { [k: string]: any } = {
  Query: {
    user: (root: any, { id }: UserInput) => {
      console.log('user resolver', id);
      const user = User.findById(id);
      return user;
      return {
        id: new ObjectId().toString(),
        platform: 'a platform',
        vendor: 'a vendor',
        product: 'a product',
        ip: '0.0.0.0',
        countryCode: 'AU',
        city: 'Sydney',
      };
    },
  },
  User: {},
  Mutation: {
    upsertUser: async (root: any, { id, platform, vendor, product }: UserInput) => {
      const user = User.build({
        id: new ObjectId().toString(),
        platform,
        vendor,
        product,
      });
      await (user as any).save();
      console.log('user resolver', user);
      return { user };
    },
  },
};

export default resolvers;
