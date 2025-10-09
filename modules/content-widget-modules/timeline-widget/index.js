/**
 * Timeline Widget - 时间线小部件
 * 用于展示时间线事件的响应式小部件，支持多种布局样式和动画效果
 */
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '时间线',
    icon: 'timeline-text-outline',
    // 预览图片设置
    previewImage: 'jpg',
    // 启用占位符内容
    placeholder: false,
    // 启用实时预览
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        help: '时间条的标题（可选）'
      },
      timelineItems: {
        type: 'array',
        label: '时间线项目',
        help: '添加时间线项目（最多20个）',
        max: 20,
        // 设置标题字段，在列表中显示
        titleField: 'title',
        fields: {
          add: {
            year: {
              type: 'string',
              label: '年份/日期',
              required: true,
              help: '例如：2013年、2023-01、2024.05.20',
              max: 50
            },
            title: {
              type: 'string',
              label: '事件标题',
              required: true,
              help: '事件的主要标题',
              max: 100
            },
            description: {
              type: 'string',
              label: '事件描述',
              textarea: true,
              help: '事件的详细描述（可选）',
              max: 500
            },
            icon: {
              type: 'select',
              label: '图标',
              help: '选择要显示在节点中的图标',
              choices: [
                { label: '✓ 对勾', value: 'check' },
                { label: '★ 星号', value: 'star' },
                { label: '🏆 奖杯', value: 'trophy' },
                { label: '⚙ 齿轮', value: 'gear' },
                { label: '👤 用户', value: 'user' },
                { label: '🏢 建筑', value: 'building' },
                { label: '🚀 火箭', value: 'rocket' },
                { label: '❤ 心形', value: 'heart' },
                { label: '💡 灯泡', value: 'lightbulb' },
                { label: '📅 日历', value: 'calendar' },
                { label: '🎯 目标', value: 'bullseye' },
                { label: '🎓 毕业帽', value: 'graduation-cap' }
              ],
              def: 'check'
            },
            color: {
              type: 'select',
              label: '节点颜色',
              help: '选择节点的背景颜色',
              choices: [
                { label: '🔵 蓝色', value: 'blue' },
                { label: '🟢 绿色', value: 'green' },
                { label: '🔴 红色', value: 'red' },
                { label: '🟣 紫色', value: 'purple' },
                { label: '🟠 橙色', value: 'orange' },
                { label: '⚫ 灰色', value: 'gray' },
                { label: '🟡 黄色', value: 'yellow' },
                { label: '🔷 青色', value: 'cyan' }
              ],
              def: 'blue'
            },
            highlighted: {
              type: 'boolean',
              label: '高亮显示',
              help: '将此项目标记为重点事件',
              def: false
            }
          }
        }
      },
      layoutStyle: {
        type: 'select',
        label: '布局样式',
        choices: [
          { label: '标准交替布局', value: 'alternating' },
          { label: '左对齐布局', value: 'left' },
          { label: '右对齐布局', value: 'right' }
        ],
        def: 'alternating'
      },
     
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'timelineItems']
      },
      style: {
        label: '样式设置',
        fields: ['layoutStyle']
      }
    }
  }
};
