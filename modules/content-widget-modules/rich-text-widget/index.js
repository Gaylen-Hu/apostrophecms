import areaConfig from '../../../lib/area.js';
import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '富文本',
    description: '在页面上添加样式文本',
    icon: 'format-text-icon',
    previewImage: 'png',
    defaultData: { content: '<p>wassuppe</p>' }
  },
  fields: {
    add: {
      richText: {
        type: 'area',
        label: '富文本',
        options: {
          widgets: {
            ...areaConfig.richText
          }
        }
      },
      ...aosSchema
    }
  }
};
