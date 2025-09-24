/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-23 17:05:00
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-09-23 17:05:00
 * @FilePath: \my-app\modules\content-widget-modules\carousel-widget\index.js
 * @Description: 轮播图小部件配置
 */
import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '轮播图',
    description: '现代化的轮播图组件，支持多种内容和样式',
    icon: 'carousel-icon',
    previewImage: 'jpg'
  },
  icons: {
    'carousel-icon': 'Slideshow'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '轮播图标题',
        help: '可选的轮播图标题'
      },
      description: {
        type: 'string',
        label: '轮播图描述',
        textarea: true,
        help: '可选的轮播图描述文字'
      },
      slides: {
        type: 'array',
        label: '轮播图幻灯片',
        required: true,
        max: 10,
        fields: {
          add: {
            title: {
              type: 'string',
              label: '幻灯片标题',
              required: true
            },
            description: {
              type: 'string',
              label: '幻灯片描述',
              textarea: true
            },
            _image: {
              type: 'relationship',
              withType: '@apostrophecms/image',
              label: '背景图片',
              required: true,
              max: 1,
              min: 1
            },
            buttonText: {
              type: 'string',
              label: '按钮文字',
              help: '可选的行动号召按钮'
            },
            buttonUrl: {
              type: 'url',
              label: '按钮链接',
              help: '按钮点击后的跳转链接'
            },
            textPosition: {
              type: 'select',
              label: '文字位置',
              choices: [
                { label: '左侧', value: 'left' },
                { label: '居中', value: 'center' },
                { label: '右侧', value: 'right' }
              ],
              def: 'center'
            },
            textColor: {
              type: 'color',
              label: '文字颜色',
              def: '#ffffff'
            },
            overlayOpacity: {
              type: 'range',
              label: '遮罩透明度',
              min: 0,
              max: 100,
              step: 10,
              def: 50,
              help: '背景图片上的遮罩透明度'
            }
          }
        }
      },
      autoplay: {
        type: 'boolean',
        label: '自动播放',
        def: true
      },
      autoplaySpeed: {
        type: 'integer',
        label: '自动播放速度（秒）',
        def: 5,
        min: 2,
        max: 10,
        if: {
          autoplay: true
        }
      },
      showDots: {
        type: 'boolean',
        label: '显示指示点',
        def: true
      },
      showArrows: {
        type: 'boolean',
        label: '显示导航箭头',
        def: true
      },
      height: {
        type: 'select',
        label: '轮播图高度',
        choices: [
          { label: '小 (400px)', value: 'small' },
          { label: '中 (500px)', value: 'medium' },
          { label: '大 (600px)', value: 'large' },
          { label: '超大 (700px)', value: 'xlarge' },
          { label: '全屏', value: 'fullscreen' }
        ],
        def: 'large'
      },
      transition: {
        type: 'select',
        label: '切换动画',
        choices: [
          { label: '滑动', value: 'slide' },
          { label: '淡入淡出', value: 'fade' },
          { label: '缩放', value: 'zoom' }
        ],
        def: 'slide'
      },
      pauseOnHover: {
        type: 'boolean',
        label: '悬停时暂停',
        def: true
      },
      ...aosSchema
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'description', 'slides']
      },
      display: {
        label: '显示设置',
        fields: ['height', 'transition', 'textPosition', 'textColor', 'overlayOpacity']
      },
      behavior: {
        label: '行为设置',
        fields: ['autoplay', 'autoplaySpeed', 'showDots', 'showArrows', 'pauseOnHover']
      }
    }
  }
};
