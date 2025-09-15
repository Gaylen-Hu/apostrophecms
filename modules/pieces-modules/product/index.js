export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '产品',
    openGraph: false,
    seoFields: false
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题'
      },
      description: {
        type: 'string',
        label: '描述'
      },
      price: {
        type: 'float',
        label: '商品价格',
        min: 0.01,
        def: 0.00,
        required: true
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: [ 'title', 'description', 'price' ]
      }
    }
  }
};
