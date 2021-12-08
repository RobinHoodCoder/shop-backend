import 'dotenv/config';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';

const { CloudinaryAdapter } = require('@keystonejs/file-adapters');

const {
  CLOUDINARY_CLOUD_NAME: cloudName = '',
  CLOUDINARY_SECRET: apiSecret = '',
  CLOUDINARY_KEY: apiKey = '',
} = process.env || {};

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
      label: 'Source',
      access: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    }),
    altText: text(),
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
      initialColumns: ['image', 'altText', 'product'],
    },
  },
});
