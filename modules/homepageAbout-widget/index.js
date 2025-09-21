import aosSchema from '../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '首页关于我们',
    icon: 'info-icon',
    description: '创建首页关于我们区域，包含公司简介、图片和统计信息',
    previewImage: 'preview.jpg'
  },
  icons: {
    'info-icon': 'Info'
  },
  fields: {
    add: {
      // 主标题
   
      
      // 公司图片
      companyImage: {
        type: 'area',
        label: '公司图片',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      
  
      
      // 公司简介内容
      companyDescription: {
        type: 'area',
        label: '公司简介内容',
        options: {
          widgets: {
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
              ]
            }
          }
        }
      },
      
      // 统计信息
      statistics: {
        type: 'array',
        label: '统计信息',
        titleField: 'title',
        fields: {
          add: {
            icon: {
              type: 'string',
              label: '图标类名',
              help: 'Font Awesome 图标类名，如 fa-solid fa-calendar-check'
            },
            title: {
              type: 'string',
              label: '统计标题',
              required: true
            },
            value: {
              type: 'string',
              label: '统计数值',
              required: true
            }
          }
        }
      },
      
      // 了解更多链接
      learnMoreLink: {
        type: 'object',
        label: '了解更多链接',
        fields: {
          add: {
            text: {
              type: 'string',
              label: '链接文字',
              def: '了解更多公司信息'
            },
            url: {
              type: 'url',
              label: '链接地址'
            }
          }
        }
      },
      
      // 背景颜色
      backgroundColor: {
        type: 'color',
        label: '背景颜色',
        def: '#ffffff'
      },
      
      // 主题颜色
      primaryColor: {
        type: 'color',
        label: '主题颜色',
        def: '#2563eb'
      },
      
      // 动画效果
      ...aosSchema
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'description', 'companyTitle', 'companyDescription', 'statistics', 'learnMoreLink']
      },
      media: {
        label: '媒体设置',
        fields: ['companyImage']
      },
      appearance: {
        label: '外观设置',
        fields: ['backgroundColor', 'primaryColor']
      },
      animation: {
        label: '动画效果',
        fields: ['animationEffects']
      }
    }
  }
};