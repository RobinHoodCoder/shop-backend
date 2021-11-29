import { text } from '@keystone-next/fields';

export const Product = list({
  /*
   * TODO:
   * assecc
   */
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
  },
});
