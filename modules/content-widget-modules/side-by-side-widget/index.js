import areaConfig from '../../../lib/area.js';
import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '并排布局',
    icon: 'layout-side-icon',
    description: '并排显示两个内容区域',
    previewImage: 'jpg'
  },
  icons: {
    'layout-side-icon': 'PageLayoutSidebarRight'
  },
  fields: {
    add: {
      invert: {
        type: 'boolean',
        label: '反转列顺序',
        required: true,
        def: false
      },
      one: {
        type: 'area',
        contextual: true,
        options: {
          widgets: areaConfig.all
        }
      },
      two: {
        type: 'area',
        contextual: true,
        options: {
          widgets: areaConfig.all
        }
      },
      ...aosSchema
    }
  }
};
