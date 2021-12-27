import { list } from '@keystone-next/keystone/schema';
import { password, relationship, text } from '@keystone-next/fields';
import { permissions, rules } from '../access';


export const User = list({
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    /*
     * only people with the permission can delete themselves!
     * You can't delete yourself
     */
    delete: permissions.canManageUsers,
  },
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
