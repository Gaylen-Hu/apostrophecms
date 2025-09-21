import linkSchema from '../../../lib/linkSchema.js';
import buttonSchema from '../../../lib/buttonSchema.js';

export default {
  helpers(self) {
    return {
      linkPath(item) {
        if (!item) return '#';
        
        if (item.linkType === 'page' && item._linkPage && item._linkPage[0]) {
          return item._linkPage[0]._url;
        } else if (item.linkType === 'file' && item._linkFile && item._linkFile[0]) {
          return item._linkFile[0]._url;
        } else if (item.linkType === 'custom' && item.linkUrl) {
          return item.linkUrl;
        }
        
        return '#';
      }
    };
  },
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
      // 邮箱
      email: {
        type: 'string',
        label: '邮箱',
        required: true
      },
      // 电话
      phone: {
        type: 'string',
        label: '电话',
        required: true
      },
      // 地址
      address: {
        type: 'string',
        label: '地址',
        required: true
      },
      // 版权
      copyright: {
        type: 'string',
        label: '版权',
        required: true
      },
      // 备案号
     备案号: {
        type: 'string',
        label: '备案号',
        required: true
      },
      // 备案号
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
        limit: 8,
        fields: {
          add: {
            ...linkSchema,
            hasSubmenu: {
              label: '有子菜单',
              type: 'boolean',
              def: false
            },
            submenuItems: {
              label: '子菜单项目',
              type: 'array',
              titleField: 'linkText',
              fields: {
                add: {
                  ...linkSchema
                }
              },
              if: {
                hasSubmenu: true
              }
            },
            badge: {
              label: '徽章文本',
              type: 'string',
              help: '可选徽章文本，显示在链接旁边'
            }
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
