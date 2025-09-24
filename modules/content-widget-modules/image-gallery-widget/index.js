import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '图片画廊',
    description: '现代化的图片画廊组件，采用shadcn UI设计风格',
    previewImage: 'jpg',
    icon: 'image-gallery-icon'
  },
  icons: {
    'image-gallery-icon': 'ImageAlbum'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '画廊标题',
        help: '可选的画廊标题'
      },
      description: {
        type: 'string',
        label: '画廊描述',
        textarea: true,
        help: '可选的画廊描述文字'
      },
      layout: {
        type: 'select',
        label: '布局样式',
        required: true,
        choices: [
          {
            label: '网格布局 (Grid)',
            value: 'grid',
            def: true
          },
          {
            label: '轮播布局 (Carousel)',
            value: 'carousel'
          },
          {
            label: '瀑布流布局 (Masonry)',
            value: 'masonry'
          }
        ]
      },
      gridColumns: {
        type: 'select',
        label: '网格列数',
        required: true,
        choices: [
          {
            label: '2列',
            value: 2,
            def: true
          },
          {
            label: '3列',
            value: 3
          },
          {
            label: '4列',
            value: 4
          }
        ],
        if: {
          layout: 'grid'
        }
      },
      showCaptions: {
        type: 'boolean',
        label: '显示图片说明',
        def: true
      },
      enableLightbox: {
        type: 'boolean',
        label: '启用灯箱效果',
        def: true
      },
      aspectRatio: {
        type: 'select',
        label: '图片比例',
        choices: [
          {
            label: '正方形 (1:1)',
            value: 'square'
          },
          {
            label: '横向 (4:3)',
            value: 'landscape'
          },
          {
            label: '纵向 (3:4)',
            value: 'portrait'
          },
          {
            label: '宽屏 (16:9)',
            value: 'widescreen'
          },
          {
            label: '自适应',
            value: 'auto',
            def: true
          }
        ]
      },
      _images: {
        type: 'relationship',
        withType: '@apostrophecms/image',
        label: '图片',
        required: true,
        max: 20
      },
      ...aosSchema
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'description', '_images']
      },
      display: {
        label: '显示设置',
        fields: ['layout', 'gridColumns', 'showCaptions', 'enableLightbox', 'aspectRatio']
      }
    }
  }
};
