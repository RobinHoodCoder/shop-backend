import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { text } from '@keystone-next/fields';
import 'dotenv/config';

const {
  CLOUDINARY_CLOUD_NAME: cloudName,
  CLOUDINARY_SECRET: apiSecret,
  CLOUDINARY_KEY: apiKey,
} = process.env;

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
  },
});
