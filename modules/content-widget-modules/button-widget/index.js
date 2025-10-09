/**
 * Enhanced Button Widget - 增强型按钮小部件
 * 基于 enhanced-button 开源库，提供丰富的按钮样式和特效
 * https://github.com/jakobhoeg/enhanced-button
 */
import buttonSchema from '../../../lib/buttonSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '增强按钮',
    icon: 'button-icon',
    previewImage: 'jpg',
    preview: true
  },
  icons: {
    'button-icon': 'GestureDoubleTap'
  },
  fields: {
    add: {
      ...buttonSchema.button
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['linkText', 'linkType', '_linkPage', '_linkFile', 'linkUrl', 'linkTarget', 'ariaLabel']
      },
      style: {
        label: '样式设置',
        fields: ['variant', 'size', 'effect']
      },
      advanced: {
        label: '高级选项',
        fields: ['icon', 'iconPlacement', 'fullWidth', 'disabled']
      }
    }
  }
};
