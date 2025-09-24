import aosSchema from '../../../lib/aosSchema.js';
import areaConfig from '../../../lib/area.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '左右布局容器',
    description: '左右两栏布局容器组件，支持自定义背景色和间距',
    previewImage: 'svg',
    icon: 'layout-icon'
  },
  icons: {
    'layout-icon': 'Layout'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '布局标题',
        help: '可选的布局标题'
      },
      backgroundColor: {
        type: 'color',
        label: '背景颜色',
        def: '#2563eb',
        help: '选择布局的背景颜色'
      },
      backgroundGradient: {
        type: 'boolean',
        label: '启用渐变背景',
        def: true,
        help: '是否使用渐变背景效果'
      },
      gradientFrom: {
        type: 'color',
        label: '渐变起始色',
        def: '#2563eb',
        if: {
          backgroundGradient: true
        }
      },
      gradientTo: {
        type: 'color',
        label: '渐变结束色',
        def: '#1d4ed8',
        if: {
          backgroundGradient: true
        }
      },
      borderRadius: {
        type: 'select',
        label: '圆角大小',
        choices: [
          { label: '无圆角', value: 'none' },
          { label: '小圆角', value: 'sm' },
          { label: '中等圆角', value: 'md' },
          { label: '大圆角', value: 'lg' },
          { label: '超大圆角', value: 'xl' },
          { label: '完全圆角', value: 'full' }
        ],
        def: 'xl'
      },
      shadow: {
        type: 'select',
        label: '阴影效果',
        choices: [
          { label: '无阴影', value: 'none' },
          { label: '小阴影', value: 'sm' },
          { label: '中等阴影', value: 'md' },
          { label: '大阴影', value: 'lg' },
          { label: '超大阴影', value: 'xl' }
        ],
        def: 'xl'
      },
      padding: {
        type: 'select',
        label: '内边距',
        choices: [
          { label: '小', value: 'sm' },
          { label: '中等', value: 'md' },
          { label: '大', value: 'lg' },
          { label: '超大', value: 'xl' }
        ],
        def: 'lg'
      },
      layoutDirection: {
        type: 'select',
        label: '布局方向',
        choices: [
          { label: '左内容右图片', value: 'left-content' },
          { label: '左图片右内容', value: 'right-content' }
        ],
        def: 'left-content'
      },
      contentArea: {
        type: 'area',
        label: '左侧内容区域',
        options: {
          widgets: areaConfig.all
        }
      },
      imageArea: {
        type: 'area',
        label: '右侧图片区域',
        options: {
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      ...aosSchema
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'contentArea', 'imageArea']
      },
      design: {
        label: '设计设置',
        fields: ['backgroundColor', 'backgroundGradient', 'gradientFrom', 'gradientTo', 'borderRadius', 'shadow', 'padding', 'layoutDirection']
      }
    }
  }
};
