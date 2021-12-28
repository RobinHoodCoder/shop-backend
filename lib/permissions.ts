import { ListAccessArgs } from '../types';
import { permissionsList } from '../schemas/fields';

const permissionEntries = permissionsList.map(permission => [
  permission,
  function ({ session }: ListAccessArgs) {
    return !!session?.data.role?.[permission];
  },
]);
const generatedPermissions = Object.fromEntries(permissionEntries);
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('robin');
  },
};
