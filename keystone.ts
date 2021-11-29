import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import { Product } from './schemas/Product';
const {
  DATABSE_URL = 'mongodb+srv://sick:8beKpYfHUPeRl03O@clustorr.zmgxn.mongodb.net/sickfits?retryWrites=true&w=majority',
  COOKIE_SECRET,
  FRONTEND_URL,
} = process.env;

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

export default withAuth({
  db: {
    adapter: 'mongoose',
    url: DATABSE_URL,
  },
  lists: createSchema({
    // scheme goes here
    User,
    Product,
  }),
  server: {
    cors: {
      origin: FRONTEND_URL,
    },
  },
  ui: {
  // TODO: Show UI only for people that pass the test
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
});
