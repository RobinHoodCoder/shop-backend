import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const { argv } = process;

const {
  DATABSE_URL = 'mongodb+srv://sick:8beKpYfHUPeRl03O@clustorr.zmgxn.mongodb.net/sickfits?retryWrites=true&w=majority',
  COOKIE_SECRET,
  FRONTEND_URL,
} = process.env || {};

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: COOKIE_SECRET,
};

const  { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  initFirstItem: {
    fields: [
      'name',
      'email',
      'password',
    ],
  },
  secretField: 'password',
});

export default withAuth(
  config({
    db: {
      adapter: 'mongoose',
      url: DATABSE_URL,
      async onConnect(keystone) {
        console.log('Connected', keystone);
        if (argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
    // scheme goes here
      User,
      Product,
      ProductImage,
    }),
    server: {
      cors: {
        origin: FRONTEND_URL,
      },
    },
    ui: {
      isAccessAllowed: ({ session }) => {
        console.log({ session });
        return !!session?.data;
      },
    },
    session: withItemData(
      statelessSessions(sessionConfig),
      {
        User: `id`,
      }
    ),
  // TODO: change this for roles
  })
);
