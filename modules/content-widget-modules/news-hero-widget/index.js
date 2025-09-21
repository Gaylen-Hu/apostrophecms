/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-21 15:00:00
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-09-21 15:00:00
 * @FilePath: \my-app\modules\content-widget-modules\news-hero-widget\index.js
 * @Description: 新闻页面首屏小部件
 */
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '新闻首屏',
    icon: 'newspaper-icon',
    previewImage: 'preview.jpg'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        required: true,
        def: '新闻资讯'
      },
      subtitle: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '了解公司最新动态和行业资讯'
      },
      backgroundImage: {
        type: 'attachment',
        label: '背景图片',
        fileGroup: 'images'
      },
      backgroundImageUrl: {
        type: 'url',
        label: '背景图片URL',
        help: '如果上传了背景图片，此字段将被忽略'
      },
      overlayOpacity: {
        type: 'range',
        label: '遮罩透明度',
        min: 0,
        max: 100,
        step: 5,
        def: 90,
        help: '背景图片上的遮罩层透明度（百分比）'
      },
      backgroundColor: {
        type: 'color',
        label: '背景颜色',
        def: '#1e3a8a'
      },
      textColor: {
        type: 'color',
        label: '文字颜色',
        def: '#ffffff'
      },
      subtitleColor: {
        type: 'color',
        label: '副标题颜色',
        def: '#dbeafe'
      },
      paddingSize: {
        type: 'select',
        label: '内边距大小',
        choices: [
          { label: '小', value: 'py-12' },
          { label: '中', value: 'py-16' },
          { label: '大', value: 'py-20' },
          { label: '超大', value: 'py-24' }
        ],
        def: 'py-20'
      },
      titleSize: {
        type: 'select',
        label: '标题大小',
        choices: [
          { label: '小', value: 'text-3xl md:text-4xl' },
          { label: '中', value: 'text-4xl md:text-5xl' },
          { label: '大', value: 'text-5xl md:text-6xl' },
          { label: '超大', value: 'text-6xl md:text-7xl' }
        ],
        def: 'text-4xl md:text-5xl'
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
      },
      parallaxEffect: {
        type: 'boolean',
        label: '视差效果',
        def: false,
        help: '启用背景图片的视差滚动效果'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'subtitle']
      },
      background: {
        label: '背景设置',
        fields: ['backgroundImage', 'backgroundImageUrl', 'overlayOpacity', 'backgroundColor']
      },
      design: {
        label: '设计设置',
        fields: ['textColor', 'subtitleColor', 'paddingSize', 'titleSize', 'animation', 'parallaxEffect']
      }
    }
  }
};
