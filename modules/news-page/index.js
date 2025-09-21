export default {
  // extending a core module creates a new instance of that module type
  // with a new name, but all the same functions
  extend: '@apostrophecms/piece-type',
  options: {
    label: '新闻文章',
    pluralLabel: '新闻文章',
    i18n: {
      browser: true
    }
  },
  fields: {
    add: {
      // 作者字段
      author: {
        type: 'string',
        label: '作者',
        required: true
      },
      // 摘要字段
      excerpt: {
        type: 'string',
        label: '摘要',
        textarea: true,
        help: '新闻摘要，用于列表页显示'
      },
      // 展示图字段
      featuredImage: {
        type: 'area',
        label: '展示图',
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      // 详情内容字段
      content: {
        type: 'area',
        label: '详情内容',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: ['Bold', 'Italic', 'Link', 'Unlink', 'BulletedList', 'NumberedList', 'Blockquote']
            },
            '@apostrophecms/image': {}
          }
        }
      },
      // 分类字段
      category: {
        type: 'select',
        label: '分类',
        required: true,
        choices: [
          {
            label: '公司动态',
            value: 'company'
          },
          {
            label: '行业资讯',
            value: 'industry'
          },
          {
            label: '产品发布',
            value: 'product'
          },
          {
            label: '技术分享',
            value: 'tech'
          },
          {
            label: '其他',
            value: 'other'
          }
        ]
      },
      // 是否置顶
      isFeatured: {
        type: 'boolean',
        label: '置顶显示',
        def: false
      },
      // 发布日期
      publishDate: {
        type: 'date',
        label: '发布日期',
        required: true
      }
    },
    group: {
      content: {
        label: '内容',
        fields: [ 'title', 'author', 'excerpt', 'featuredImage', 'content' ]
      },
      meta: {
        label: '元信息',
        fields: [ 'category', 'publishDate', 'isFeatured' ]
      }
    }
  },
  filters: {
    add: {
      isFeatured: {
        label: '置顶'
      },
      category: {
        label: '分类'
      }
    }
  },
  columns: {
    add: {
      category: {
        label: '分类'
      },
      author: {
        label: '作者'
      },
      publishDate: {
        label: '发布日期'
      }
    }
  }
};
