import linkSchema from '../../../lib/linkSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '侧边内容组件',
    description: '用于左右布局中的内容组件，支持标题、描述、列表和按钮',
    previewImage: 'svg',
    icon: 'content-icon'
  },
  icons: {
    'content-icon': 'FileText'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        required: true,
        help: '内容区域的标题'
      },
      description: {
        type: 'string',
        label: '描述',
        textarea: true,
        help: '内容区域的描述文字'
      },
      features: {
        type: 'array',
        label: '特性列表',
        max: 10,
        fields: {
          add: {
            text: {
              type: 'string',
              label: '特性文本',
              required: true
            },
            icon: {
              type: 'select',
              label: '图标',
              choices: [
                { label: '✓ 对勾', value: 'check' },
                { label: '★ 星号', value: 'star' },
                { label: '● 圆点', value: 'circle' },
                { label: '→ 箭头', value: 'arrow' },
                { label: '⚡ 闪电', value: 'bolt' },
                { label: '🔧 工具', value: 'wrench' },
                { label: '📋 列表', value: 'list' },
                { label: '💡 灯泡', value: 'lightbulb' }
              ],
              def: 'check'
            }
          }
        }
      },
      button: {
        type: 'object',
        label: '行动按钮',
        fields: {
          add: {
            ...linkSchema,
            style: {
              type: 'select',
              label: '按钮样式',
              choices: [
                { label: '主要按钮', value: 'primary' },
                { label: '次要按钮', value: 'secondary' },
                { label: '轮廓按钮', value: 'outline' },
                { label: '文本按钮', value: 'text' }
              ],
              def: 'primary'
            },
            size: {
              type: 'select',
              label: '按钮大小',
              choices: [
                { label: '小', value: 'sm' },
                { label: '中等', value: 'md' },
                { label: '大', value: 'lg' }
              ],
              def: 'md'
            },
            showIcon: {
              type: 'boolean',
              label: '显示图标',
              def: true
            },
            iconPosition: {
              type: 'select',
              label: '图标位置',
              choices: [
                { label: '右侧', value: 'right' },
                { label: '左侧', value: 'left' }
              ],
              def: 'right',
              if: {
                showIcon: true
              }
            }
          }
        }
      },
      textColor: {
        type: 'color',
        label: '文字颜色',
        def: '#ffffff',
        help: '自定义文字颜色（可选）'
      },
      titleSize: {
        type: 'select',
        label: '标题大小',
        choices: [
          { label: '小', value: 'sm' },
          { label: '中等', value: 'md' },
          { label: '大', value: 'lg' },
          { label: '超大', value: 'xl' }
        ],
        def: 'lg'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'description', 'features', 'button']
      },
      design: {
        label: '设计设置',
        fields: ['textColor', 'titleSize']
      }
    }
  }
};
