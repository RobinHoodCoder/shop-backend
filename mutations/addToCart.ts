import { KeystoneContext, SessionContext } from '@keystone-next/types';
import { CartItemCreateInput } from  '../.keystone/schema-types';
import { Session } from '../types';

const AddToCart = async (
  root: any,
  { productId }: {productId:string},
  context: KeystoneContext
) : Promise<CartItemCreateInput> => {
  console.log('Adding to cart');
  // 1. check user, check if signed in.
  const session = await context.session as Session;

  if (!session?.itemId) {
    throw new Error('You must be signed in to add to cart');
  }


  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: {
        id: session.itemId,
      },
      product: {
        id: productId,
      },
    },
  });

  const [existingCartItem] = allCartItems;
  console.log('existingCartItem!!!', existingCartItem);


  if (!!existingCartItem) {
    const { quantity, id } = existingCartItem;
    console.log(`Already ${existingCartItem.quantity} in cart`);
    return await context.lists.CartItem.updateOne({
      id,
      data: {
        quantity: quantity + 1,
      },
    });
  }

  return await context.lists.CartItem.createOne({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: session.itemId,
        },
      },
      quantity: 1,
    },
  });


  // 2. Query the current user's cart

  /*
   * 3. See if current item is present in cart.
   *  1. If so, update quantity.
   *  2. If not, add new item to cart.
   */

  // check if product is in stock
};

export default AddToCart;
