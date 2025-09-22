import linkSchema from '../../../lib/linkSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '带图片卡片',
    icon: 'product-card-icon',
    previewImage: 'preview.jpg'
  },
  fields: {
    add: {
      // 图片
      productImage: {
        // type: 'attachment',
        // label: '图片',
        // required: true,
        // fileGroup: 'images',
        // help: '建议使用4:3比例的图片'
        type: 'area',
        label: '图片',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      // 标题
      productTitle: {
        type: 'string',
        label: '标题',
        required: true,
        help: '名称或标题'
      },
      // 描述
      productDescription: {
        type: 'string',
        label: '描述',
        textarea: true,
        help: '的简要描述'
      },
      // 分类标签
      category: {
        type: 'string',
        label: '分类标签',
        help: '分类'
      },
      // 分类标签颜色
      categoryColor: {
        type: 'select',
        label: '标签颜色',
        choices: [
          { label: '蓝色', value: 'blue' },
          { label: '绿色', value: 'green' },
          { label: '红色', value: 'red' },
          { label: '黄色', value: 'yellow' },
          { label: '紫色', value: 'purple' },
          { label: '灰色', value: 'gray' }
        ],
        def: 'blue',
        if: {
          category: true
        }
      },
      // 详情链接
      detailLink: {
        label: '详情链接',
        type: 'object',
        fields: {
          add: {
            ...linkSchema,
            linkText: {
              label: '链接文本',
              type: 'string',
              def: '查看详情'
            }
          }
        }
      },
      // 悬停效果
      hoverEffect: {
        type: 'select',
        label: '悬停效果',
        choices: [
          { label: '图片缩放', value: 'scale' },
          { label: '阴影变化', value: 'shadow' },
          { label: '无效果', value: 'none' }
        ],
        def: 'scale'
      },
      // 卡片高度
      cardHeight: {
        type: 'select',
        label: '卡片高度',
        choices: [
          { label: '自适应', value: 'auto' },
          { label: '固定高度', value: 'fixed' }
        ],
        def: 'auto'
      }
    },
    group: {
      content: {
        label: '内容',
        fields: ['productImage', 'productTitle', 'productDescription', 'category', 'categoryColor']
      },
      link: {
        label: '链接',
        fields: ['detailLink']
      },
      style: {
        label: '样式',
        fields: ['hoverEffect', 'cardHeight']
      }
    }
  }
};
