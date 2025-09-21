export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '产品',
    pluralLabel: '产品',
    icon: 'product-icon',
    openGraph: false,
    seoFields: false
  },
  icons: {
    'product-icon': 'Package'
  },
  fields: {
    add: {
      // 产品图片
      productImage: {
        type: 'area',
        label: '产品图片',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      
      // 产品类型
      _productType: {
        type: 'relationship',
        label: '产品类型',
        withType: 'product-type',
        builders: {
          project: {
            type: 'product-type',
            title: 1,
            typeName: 1,
            icon: 1,
            color: 1
          }
        }
      },
      
      // 产品名称
      productName: {
        type: 'string',
        label: '产品名称',
        required: true
      },
      
      // 产品介绍
      productDescription: {
        type: 'string',
        label: '产品介绍',
      
      },
      
      // 产品价格（保留原有字段）
      price: {
        type: 'float',
        label: '商品价格',
        min: 0.01,
        def: 0.00,
        required: true
      },
      
      // 产品规格
      specifications: {
        type: 'array',
        label: '产品规格',
        titleField: 'name',
        fields: {
          add: {
            name: {
              type: 'string',
              label: '规格名称',
              required: true
            },
            value: {
              type: 'string',
              label: '规格值',
              required: true
            }
          }
        }
      },
      
      // 库存状态
      inStock: {
        type: 'boolean',
        label: '有库存',
        def: true
      },
      
      // 特色产品
      isFeatured: {
        type: 'boolean',
        label: '特色产品',
        def: false
      },
      
      // 排序
      sortOrder: {
        type: 'integer',
        label: '排序',
        def: 0,
        help: '数字越小排序越靠前'
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: ['productName', '_productType', 'productDescription']
      },
      media: {
        label: '媒体',
        fields: ['productImage']
      },
      pricing: {
        label: '价格信息',
        fields: ['price', 'inStock']
      },
      details: {
        label: '详细信息',
        fields: ['specifications', 'isFeatured', 'sortOrder']
      }
    }
  }
};
