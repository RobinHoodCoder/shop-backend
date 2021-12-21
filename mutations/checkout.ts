import { KeystoneContext } from '@keystone-next/types';
import { OrderCreateInput } from '../.keystone/schema-types';
type Arguments = {
  token: string,
}

const checkout = async (
  root: any,
  { token } : Arguments,
  context: KeystoneContext
) : Promise<OrderCreateInput> => {

};

export default checkout;
