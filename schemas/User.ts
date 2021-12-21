import { list } from '@keystone-next/keystone/schema';
import { password, relationship, text } from '@keystone-next/fields';

export const User = list({
  fields: {
    name: text(
      {
        isRequired: true,
      }
    ),
    email: text(
      {
        isRequired: true, isUnique: true,
      }
    ),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
    }),
    password: password(),
    // TODO add roles, const , orders
    orders: relationship(
      {
        ref: 'Order.user',
        many: true,
      }
    ),
  },
});
