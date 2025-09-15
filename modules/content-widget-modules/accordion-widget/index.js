import areaConfig from '../../../lib/area.js';
import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '手风琴',
    icon: 'menu-open-icon',
    description: '在页面上添加可展开的内容',
    previewImage: 'svg'
  },
  icons: {
    'menu-open-icon': 'MenuOpen'
  },
  fields: {
    add: {
      accordions: {
        type: 'array',
        label: '手风琴项目',
        titleField: 'title',
        inline: true,
        fields: {
          add: {
            title: {
              type: 'string',
              label: '标题'
            },
            content: {
              type: 'area',
              label: '内容',
              options: {
                widgets: areaConfig.apos
              }
            }
          }
        }
      },
      ...aosSchema
    }
  }
};
