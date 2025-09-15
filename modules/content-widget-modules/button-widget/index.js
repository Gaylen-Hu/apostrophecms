import buttonSchema from '../../../lib/buttonSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '按钮',
    icon: 'button-icon'
  },
  icons: {
    'button-icon': 'ShapeRectanglePlus'
  },
  fields: {
    add: {
      ...buttonSchema.button
    }
  }
};
