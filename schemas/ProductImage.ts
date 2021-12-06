import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import 'dotenv/config';

const { CloudinaryAdapter } = require('@keystonejs/file-adapters');

const {
  CLOUDINARY_CLOUD_NAME: cloudName,
  CLOUDINARY_SECRET: apiSecret,
  CLOUDINARY_KEY: apiKey,
} = process.env;

/*
 *const fileAdapter = new CloudinaryAdapter({
 *cloudName,
 *apiKey,
 *apiSecret,
 *folder: 'shop',
 *});
 */

console.log(
  {
    cloudName,
    apiSecret,
    apiKey,
  }, 'aweg'

);

/*
 *image: cloudinaryImage({
 *  cloudinary: adapter,
 *  label: 'Source',
 *}),
 */

const adapter = new CloudinaryAdapter({
  cloudName,
  apiKey,
  apiSecret,
  folder: 'shop',
});
export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary: adapter,
      views: {

      },
      label: 'Source',
      access: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    }),
    altText: text({
      isRequired: true,
      label: 'Alt Text',
    }),
    product: relationship({
      ref: 'Product.photo',
      many: true,
      access: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'product'],
    },
  },
});
