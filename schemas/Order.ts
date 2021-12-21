import { list } from '@keystone-next/keystone/schema';
import { integer, relationship, text, virtual } from '@keystone-next/fields';

export const Order = list({
  fields: {
    label: virtual({
    // TODO: check this. May need finction instead
      resolver: (item) => {
        return `Cool ${item.total}`;
      },
      graphQLReturnType: 'string',
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
