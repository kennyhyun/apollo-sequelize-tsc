import { ObjectId } from 'bson';

interface UserInput {
  id: string;
};

const resolvers: any = {
  Query: {
    user: (root: any, { id }: UserInput) => {
      return {
        id: (new ObjectId()).toString(),
        platform: 'a platform',
        vendor: 'a vendor',
        product: 'a product',
        ip: '0.0.0.0',
        countryCode: 'AU',
        city: 'Sydney',
      };
    }
  }
};

export default resolvers;
