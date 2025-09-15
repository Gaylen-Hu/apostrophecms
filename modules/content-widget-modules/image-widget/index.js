import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/image-widget',
  options: {
    icon: 'image-icon',
    label: '图片',
    description: '在页面上显示图片',
    previewImage: 'jpg',
    className: 'img-fluid'
  },
  fields: {
    add: {
      ...aosSchema
    }
  }
};
