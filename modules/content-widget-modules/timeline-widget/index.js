/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-10-05 11:51:53
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-10-05 14:47:47
 * @FilePath: \my-app\modules\content-widget-modules\timeline-widget\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '时间条小部件',
    icon: 'timeline-icon',
    previewImage: 'jpg'
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
        help: '添加时间线项目',
        max: 20,
        fields: {
          add: {
            year: {
              type: 'string',
              label: '年份',
              required: true,
              help: '例如：2013年'
            },
            title: {
              type: 'string',
              label: '事件标题',
              required: true,
              help: '事件的主要标题'
            },
            description: {
              type: 'string',
              label: '事件描述',
              textarea: true,
              help: '事件的详细描述'
            },
            icon: {
              type: 'select',
              label: '图标',
              choices: [
                { label: '对勾', value: 'check' },
                { label: '星号', value: 'star' },
                { label: '奖杯', value: 'trophy' },
                { label: '齿轮', value: 'gear' },
                { label: '用户', value: 'user' },
                { label: '建筑', value: 'building' },
                { label: '火箭', value: 'rocket' },
                { label: '心形', value: 'heart' }
              ],
              def: 'check'
            },
            color: {
              type: 'select',
              label: '节点颜色',
              choices: [
                { label: '蓝色', value: 'blue' },
                { label: '绿色', value: 'green' },
                { label: '红色', value: 'red' },
                { label: '紫色', value: 'purple' },
                { label: '橙色', value: 'orange' },
                { label: '灰色', value: 'gray' }
              ],
              def: 'blue'
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
      animationEnabled: {
        type: 'boolean',
        label: '启用动画',
        help: '是否启用滚动动画效果',
        def: true
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'timelineItems']
      },
      style: {
        label: '样式设置',
        fields: ['layoutStyle', 'animationEnabled']
      }
    }
  }
};
