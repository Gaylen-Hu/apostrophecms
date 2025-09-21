import areaConfig from '../../lib/area.js';
import aosSchema from '../../lib/aosSchema.js';
import buttonSchema from '../../lib/buttonSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '首页首屏',
    icon: 'home-icon',
    description: '创建引人注目的首页首屏区域，包含标题、副标题、背景图片和行动号召按钮',
    previewImage: 'jpg'
  },
  icons: {
    'home-icon': 'Home'
  },
  fields: {
    add: {
      // 主要内容
      title: {
        type: 'area',
        label: '主标题',
        options: {
          widgets: {
            'rich-text': {},
          }
        }
      },
      subtitle: { 
        type: 'area',
        label: '副标题',
        options: {
          widgets:{
            'rich-text': {
              toolbar: [
                'styles',
                '|',
                'bold',
                'italic',
                'strike',
                'underline',
                'subscript',
                'superscript',
                'blockquote',
                '|',
                'alignLeft',
                'alignCenter',
                'alignRight',
                'image',
                'horizontalRule',
                'link',
                'anchor',
                'bulletList',
                'orderedList',
                'color'
              ], },
          }
        }
      },
      
      // 背景图片
      backgroundImage: {
        type: 'area',
        label: '背景图片',
        required: true,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      
      // 布局样式
      layout: {
        type: 'select',
        label: '布局样式',
        def: 'centered',
        choices: [
          {
            label: '居中布局',
            value: 'centered'
          },
          {
            label: '左对齐布局',
            value: 'left-aligned'
          },
          {
            label: '右对齐布局',
            value: 'right-aligned'
          }
        ]
      },
      
      // 内容对齐
      contentAlignment: {
        type: 'select',
        label: '内容对齐',
        def: 'center',
        choices: [
          {
            label: '居中',
            value: 'center'
          },
          {
            label: '左对齐',
            value: 'left'
          },
          {
            label: '右对齐',
            value: 'right'
          }
        ]
      },
      
      // 按钮区域
   
      buttons: {
        type: 'array',
        label: '按钮组',
        titleField: 'linkText',
        fields: {
          add: {
            ...buttonSchema.button
          }
        }
      },
      
      // 显示滚动指示器
      showScrollIndicator: {
        type: 'boolean',
        label: '显示滚动指示器',
        def: true
      },
      
      // 背景覆盖层
      overlayOpacity: {
        type: 'range',
        label: '背景覆盖层透明度',
        min: 0,
        max: 100,
        step: 10,
        def: 70,
        help: '控制背景图片上的深色覆盖层透明度'
      },
      
      // 高度设置
      height: {
        type: 'select',
        label: '区域高度',
        def: 'full-screen',
        choices: [
          {
            label: '全屏高度',
            value: 'full-screen'
          },
          {
            label: '75% 屏幕高度',
            value: 'three-quarters'
          },
          {
            label: '50% 屏幕高度',
            value: 'half-screen'
          },
          {
            label: '自适应内容',
            value: 'auto'
          }
        ]
      },
      
      // 动画效果
      ...aosSchema
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'subtitle', 'buttons']
      },
      appearance: {
        label: '外观设置',
        fields: ['backgroundImage', 'layout', 'contentAlignment', 'overlayOpacity', 'height', 'showScrollIndicator']
      },
      animation: {
        label: '动画效果',
        fields: ['animationEffects']
      }
    }
  }
};