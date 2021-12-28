import { list } from '@keystone-next/keystone/schema';
import { integer, relationship, text, virtual } from '@keystone-next/fields';
import { isSignedIn, rules } from '../access';

export const Order = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
  },
  fields: {
    label: virtual({
    // TODO: check this. May need finction instead
      resolver: (item) => {
        return `Cool ${item.total}`;
      },
      graphQLReturnType: 'String',
    }),
    total: integer(),
    items: relationship(
      {
        ref: 'OrderItem.order',
        many: true,
      }
    ),
    user: relationship(
      {
        ref: 'User.orders',
      }
    ),
    charge: text(),
  },
});
