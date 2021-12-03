import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import 'dotenv/config';

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

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary: {
        cloudName,
        apiSecret,
        apiKey,
        folder: 'shop',
      },
      label: 'Source',
    }),
    altText: text({
      isRequired: true,
    }),
    product: relationship({
      ref: 'Product.photo',
    }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'product'],
    },
  },
});
