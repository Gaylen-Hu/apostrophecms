import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '图片画廊',
    description: '在页面上添加图片画廊',
    previewImage: 'jpg',
    icon: 'image-gallery-icon'
  },
  icons: {
    'image-gallery-icon': 'ImageAlbum'
  },
  fields: {
    add: {
      displayType: {
        type: 'select',
        label: '幻灯片显示类型',
        required: true,
        choices: [
          {
            label: '大型单张幻灯片',
            value: 1,
            def: true
          },
          {
            label: '三张幻灯片',
            value: 3
          },
          {
            label: '四张幻灯片',
            value: 4
          }
        ]
      },
      _images: {
        type: 'relationship',
        withType: '@apostrophecms/image',
        label: '图片',
        required: true,
        max: 10
      },
      ...aosSchema
    }
  }
};
