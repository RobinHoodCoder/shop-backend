import { list } from '@keystone-next/keystone/schema';
import { integer, relationship, text } from '@keystone-next/fields';

export const OrderItem = list({
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