import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { CartItem } from './schemas/CartItem';
import { extendGraphqlSchema } from './mutations';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { permissionsList } from './schemas/fields';
import { Role } from './schemas/Role';

const { argv } = process;

const {
  DATABASE_URL,
  COOKIE_SECRET,
  FRONTEND_URL,
} = process.env || {};

[
  DATABASE_URL,
  COOKIE_SECRET,
  FRONTEND_URL,
].forEach((item) => {
  if (!item) {
    throw new Error(`${item} not provided. please check.env`);
  }
});

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
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      console.log({ args });
      await sendPasswordResetEmail({ resetToken: args.token, to: args.identity });
    },
  },
});
export default withAuth(
  config({
    server: {
      cors: {
        origin: [FRONTEND_URL, 'localhost:1234', 'localhost:3000/api/graphql'],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: DATABASE_URL,
      async onConnect(keystone) {
        console.log('Connected');
        if (argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      isAccessAllowed: ({ session }) => {
        return !!session?.data;
      },
    },
    session: withItemData(
      statelessSessions({
        maxAge: 60 * 60 * 24 * 360,
        secret: COOKIE_SECRET || 'sajlkdsajlkdjsalddd3333333kjdsaldsa',
      }),
      {
        User: `id name email role { ${permissionsList.join(' ')} }`,
      }
    ),
  // TODO: change this for roles
  })
);
