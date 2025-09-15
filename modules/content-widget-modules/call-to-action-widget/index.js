import areaConfig from '../../../lib/area.js';
import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '行动号召',
    icon: 'gesture-tap-button-icon',
    placeholderUrl: '/modules/@apostrophecms/image-widget/placeholder.jpg',
    description: '在页面上添加带有行动号召的大型英雄图片',
    previewImage: 'jpg'
  },
  init(self) {
    self.determineBestAssetUrl('placeholder');
  },
  icons: {
    'gesture-tap-button-icon': 'GestureTapButton'
  },
  fields: {
    add: {
      style: {
        type: 'select',
        label: '布局样式',
        required: true,
        choices: [
          {
            label: '基础',
            value: 'basic',
            def: true
          },
          {
            label: '大型横幅',
            value: 'large-marquee'
          }
        ]
      },
      contentAlignment: {
        type: 'select',
        label: '内容对齐',
        required: true,
        choices: [
          {
            label: '左对齐',
            value: 'left',
            def: true
          },
          {
            label: '居中',
            value: 'centered'
          },
          {
            label: '右对齐',
            value: 'right'
          }
        ]
      },
      featureImage: {
        type: 'area',
        label: '特色图片',
        required: true,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      content: {
        type: 'area',
        label: '内容',
        required: true,
        options: {
          widgets: {
            ...areaConfig.richText,
            'button-strip': {}
          }
        }
      },
      ...aosSchema
    }
  }
};
