import { list } from '@keystone-next/keystone/schema';
import { integer, relationship, text } from '@keystone-next/fields';
import { isSignedIn, rules } from '../access';

export const OrderItem = list({
  access: {
    create: isSignedIn, // only on frontend
    read: rules.canManageOrderItems, // only if
    update: rules.canOrder, // only managers should be able to update
    delete: isSignedIn,
  },
  fields: {
    name: text({}),
    description: text({}),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({
      ref: 'Order.items',
    }),
  },
});
