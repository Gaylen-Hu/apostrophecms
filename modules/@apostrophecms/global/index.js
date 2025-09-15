import linkSchema from '../../../lib/linkSchema.js';
import buttonSchema from '../../../lib/buttonSchema.js';

export default {
  fields: {
    add: {
      logo: {
        label: '标志',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      title: {
        type: 'string',
        label: '网站标题',
        required: true
      },
      headerBtns: {
        label: '头部按钮',
        type: 'array',
        titleField: 'linkText',
        limit: 1,
        fields: {
          add: {
            ...buttonSchema.button
          }
        }
      },
      headerNav: {
        label: '头部导航项目',
        type: 'array',
        titleField: 'linkText',
        limit: 5,
        fields: {
          add: {
            ...linkSchema
          }
        }
      },
      footerNav: {
        label: '底部导航项目',
        type: 'array',
        titleField: 'linkText',
        limit: 5,
        fields: {
          add: {
            ...linkSchema
          }
        }
      },
      social: {
        label: '社交媒体账户',
        type: 'array',
        limit: 5,
        inline: true,
        fields: {
          add: {
            link: {
              type: 'url',
              label: '社交媒体链接',
              required: true
            },
            icon: {
              label: '图标',
              type: 'select',
              required: true,
              choices: [
                {
                  label: 'Instagram',
                  value: 'instagram'
                },
                {
                  label: 'Facebook',
                  value: 'facebook'
                },
                {
                  label: 'Twitter',
                  value: 'twitter'
                },
                {
                  label: 'LinkedIn',
                  value: 'linkedin'
                }
              ]
            }
          }
        }
      }
    },
    group: {
      brand: {
        label: '品牌',
        fields: [ 'title', 'logo', 'social' ]
      },
      navigations: {
        label: '导航',
        fields: [ 'headerNav', 'footerNav', 'headerBtns' ]
      }
    }
  }
};
