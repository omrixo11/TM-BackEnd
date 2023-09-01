import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dt05eha9m',
      api_key: '969154374736257',
      api_secret: 'lGjsDp2mJs9M21b000UXwYP9wrE',
    });
  },
};