/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-21 14:57:08
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-09-21 14:57:09
 * @FilePath: \my-app\modules\content-widget-modules\advantage-card-widget\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '优势卡片',
    icon: 'card-icon',
    previewImage: 'preview.jpg'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        required: true
      },
      description: {
        type: 'string',
        label: '描述',
        textarea: true,
        required: true
      },
      icon: {
        type: 'select',
        label: '图标',
        choices: [
          { label: '工业设备', value: 'fa-industry' },
          { label: '技术', value: 'fa-cogs' },
          { label: '质量', value: 'fa-award' },
          { label: '创新', value: 'fa-lightbulb' },
          { label: '服务', value: 'fa-handshake' },
          { label: '团队', value: 'fa-users' },
          { label: '时间', value: 'fa-clock' },
          { label: '安全', value: 'fa-shield-alt' },
          { label: '环保', value: 'fa-leaf' },
          { label: '效率', value: 'fa-rocket' }
        ],
        def: 'fa-industry'
      },
      iconColor: {
        type: 'color',
        label: '图标颜色',
        def: '#3b82f6'
      },
      backgroundColor: {
        type: 'color',
        label: '背景颜色',
        def: '#f9fafb'
      },
      cardStyle: {
        type: 'select',
        label: '卡片样式',
        choices: [
          { label: '默认', value: 'default' },
          { label: '边框', value: 'bordered' },
          { label: '阴影', value: 'shadow' },
          { label: '渐变', value: 'gradient' }
        ],
        def: 'shadow'
      },
      hoverEffect: {
        type: 'boolean',
        label: '悬停效果',
        def: true
      },
      animation: {
        type: 'select',
        label: '动画效果',
        choices: [
          { label: '无', value: 'none' },
          { label: '淡入', value: 'fade' },
          { label: '滑入', value: 'slide' },
          { label: '缩放', value: 'scale' }
        ],
        def: 'fade'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'description', 'icon']
      },
      design: {
        label: '设计设置',
        fields: ['iconColor', 'backgroundColor', 'cardStyle', 'hoverEffect', 'animation']
      }
    }
  }
};
