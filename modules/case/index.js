export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '案例',
    pluralLabel: '案例管理',
    i18n: {
      browser: true
    },
    // 配置在管理菜单中的位置
    quickCreate: true,
    autopublish: false,
    // 配置搜索字段
    searchable: true
  },
  fields: {
    add: {
      // 英文标题/域名标题
      titleDomain: {
        type: 'string',
        label: '英文标题',
        required: true,
        help: '用于URL和SEO的英文标题',
        searchable: true
      },
      // 主标题
      mainTitle: {
        type: 'string',
        label: '主标题',
        required: true,
        searchable: true
      },
      // 副标题
      subTitle: {
        type: 'string',
        label: '副标题',
        searchable: true
      },
      // 来源
      source: {
        type: 'string',
        label: '来源',
        def: '运去哪'
      },
      // 简要描述
      description: {
        type: 'string',
        label: '简要描述',
        textarea: true,
        max: 500,
        help: '案例简要描述，用于列表页显示',
        searchable: true
      },
      // 展示图
      featuredImage: {
        type: 'area',
        label: '展示图',
        max: 1,
        required: true,
        options: {
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      // 详细内容
      content: {
        type: 'area',
        label: '详细内容',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'Bold', 'Italic', 'Link', 'Unlink', 
                'BulletedList', 'NumberedList', 
                'Blockquote', 'Heading'
              ]
            },
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      },
      // 分类
      category: {
        type: 'select',
        label: '分类',
        required: true,
        choices: [
          {
            label: '运输案例',
            value: 'transport'
          },
          {
            label: '仓储案例',
            value: 'warehouse'
          },
          {
            label: '供应链案例',
            value: 'supply-chain'
          },
          {
            label: '跨境物流',
            value: 'cross-border'
          },
          {
            label: '其他',
            value: 'other'
          }
        ]
      },
      // 文章标签
      articleTag: {
        type: 'string',
        label: '标签',
        help: '例如：新能源系列、大件运输等'
      },
      // 渠道
      channel: {
        type: 'checkboxes',
        label: '展示渠道',
        choices: [
          {
            label: '官网',
            value: 'website'
          },
          {
            label: '移动端',
            value: 'mobile'
          },
          {
            label: '微信',
            value: 'wechat'
          }
        ],
        def: ['website']
      },
      // 是否推荐
      isFeatured: {
        type: 'boolean',
        label: '推荐案例',
        def: false,
        help: '推荐的案例会在首页和列表页优先显示'
      },
      // 发布日期
      publishDate: {
        type: 'date',
        label: '发布日期',
        required: true
      },
      // 生效时间范围
      validFrom: {
        type: 'date',
        label: '生效开始日期',
        help: '案例展示的开始日期'
      },
      validTo: {
        type: 'date',
        label: '生效结束日期',
        help: '案例展示的结束日期，留空表示永久有效'
      }
    },
    group: {
      basics: {
        label: '基本信息',
        fields: ['title', 'titleDomain', 'mainTitle', 'subTitle', 'source']
      },
      content: {
        label: '内容',
        fields: ['description', 'featuredImage', 'content']
      },
      taxonomy: {
        label: '分类与标签',
        fields: ['category', 'articleTag', 'channel']
      },
      meta: {
        label: '发布信息',
        fields: ['publishDate', 'validFrom', 'validTo', 'isFeatured']
      }
    }
  },
  filters: {
    add: {
      isFeatured: {
        label: '推荐案例'
      },
      category: {
        label: '分类'
      },
      articleTag: {
        label: '标签'
      }
    }
  },
  columns: {
    add: {
      mainTitle: {
        label: '主标题',
        component: 'AposCellBasic'
      },
      category: {
        label: '分类',
        component: 'AposCellBasic'
      },
      articleTag: {
        label: '标签',
        component: 'AposCellBasic'
      },
      publishDate: {
        label: '发布日期',
        component: 'AposCellDate'
      },
      isFeatured: {
        label: '推荐',
        component: 'AposCellBoolean'
      }
    }
  }
};
