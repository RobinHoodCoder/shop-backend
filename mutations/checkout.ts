import { KeystoneContext } from '@keystone-next/types';
import { OrderCreateInput } from '../.keystone/schema-types';
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
      console.log(!!user, 'User?');
      console.dir(user, { depth: null });
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
