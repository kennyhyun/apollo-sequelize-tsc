import { ObjectId } from 'bson';
import * as geoip from 'geoip-country-only';
import * as IP from 'ip';
import { User, UserModel } from '../models';
import { RootResolvers, Context } from '../types';

interface UserInput {
  id: string;
  platform: string;
  vendor: string;
  product: string;
}

const { SERVER_IP_ADDR } = process.env;

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
    upsertUser: async (
      root: UserModel,
      { id, platform, vendor, product }: UserInput,
      context: Context
    ) => {
      let {
        request: { ip },
      } = context;
      if (IP.isPrivate(ip) && SERVER_IP_ADDR) {
        ip = SERVER_IP_ADDR;
      }
      const { country } = geoip.lookup(ip) || ({} as any);

      const modifier = {
        platform,
        vendor,
        product,
        countryCode: country,
      };

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
        // console.log('created user', user);
        return { user };
      }
    },
  },
};

export default resolvers;
