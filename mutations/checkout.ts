import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';
type Arguments = {
  token: string,
}

const graphql = String.raw;

const checkout = async (
  root: any,
  { token } : Arguments,
  context: KeystoneContext
) : Promise<OrderCreateInput> => {
  const { session } = context;

  if (!!session) {
    try {
      const { itemId } = session;
      console.log('Destructured ITem', itemId);

      const user = await context.lists.User.findOne({
        where: { id: itemId },
        resolveFields: graphql`
          id
          name
          email
          cart {
            id,
            quantity
            product {
                name
                price
                description
                id
                photo {
                    id
                    image {
                        id
                        publicUrlTransformed
                    }
                }
            }
          }
      `,
      });

      const { id } = user;
      const cartItems =  user.cart.filter(item => !!item.product);
      const amount = cartItems.reduce((tally: number, cartItem: CartItemCreateInput) => {
        return (tally) + (cartItem.quantity * cartItem?.product?.price);
      }, 0);
      console.log('AMT', amount);

      const charge = await stripeConfig.paymentIntents.create({
        amount,
        currency: 'USD',
        confirm: true,
        payment_method: token,
      });
      const orderItems = cartItems.map((cartItem) => {
        const { product, quantity } = cartItem;
        const { name, description, price, photo } = product;
        return {
          name,
          description,
          price,
          quantity,
          photo: { connect: { id: photo.id } },
        };
      });

      return await context.lists.Order.createOne({
        data: {
          total: charge.amount,
          charge: charge.id,
          items: { create: orderItems },
          user: { connect: { id } },
        },
        resolveFields: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  /*
   * 1. Make sure to be signed in.
   * 1.1 if so.. Query it.
   */


  // 2. Calc total price fot their order.

  // 3. Create the payment with the stripe lib

  // 4. Convert cart items to order items,

  // Create order to return to frontend.
};

export default checkout;
