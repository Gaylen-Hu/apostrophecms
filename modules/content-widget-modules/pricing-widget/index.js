import areaConfig from '../../../lib/area.js';
import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '价格表',
    icon: 'cards-icon',
    description: '在页面上显示价格卡片',
    previewImage: 'svg'
  },
  icons: {
    'cards-icon': 'Cards'
  },
  fields: {
    add: {
      intro: {
        type: 'area',
        label: '介绍',
        options: {
          widgets: areaConfig.richText
        }
      },
      cards: {
        type: 'array',
        label: '卡片',
        titleField: 'label',
        inline: true,
        max: 4,
        fields: {
          add: {
            label: {
              type: 'string',
              label: '标签'
            },
            content: {
              type: 'area',
              label: '内容',
              options: {
                widgets: areaConfig.richText
              }
            },
            features: {
              type: 'array',
              label: '功能列表',
              titleField: 'title',
              fields: {
                add: {
                  title: {
                    type: 'string',
                    label: '标题'
                  }
                }
              }
            },
            buttons: {
              type: 'area',
              label: '按钮',
              options: {
                max: 2,
                widgets: {
                  button: {}
                }
              }
            }
          }
        }
      },
      ...aosSchema
    }
  }
};
