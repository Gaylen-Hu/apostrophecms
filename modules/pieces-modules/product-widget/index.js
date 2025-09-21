import areaConfig from '../../../lib/area.js';
import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '产品菜单',
    icon: 'list-icon',
    description: '在页面上显示产品菜单',
    previewImage: 'svg'
  },
  icons: {
    'list-icon': 'FormatListChecks'
  },
  fields: {
    add: {
      headingIntro: {
        type: 'area',
        label: '标题介绍',
        options: {
          widgets: areaConfig.richText
        }
      },
      style: {
        type: 'select',
        label: '布局样式',
        required: true,
        choices: [
          {
            label: '完整',
            value: 'full',
            def: true
          },
          {
            label: '分割',
            value: 'split'
          }
        ]
      },
      currencySybmol: {
        type: 'string',
        label: '货币符号',
        max: 1
      },
      _menuItems: {
        label: '菜单',
        type: 'relationship',
        withType: 'product',
        builders: {
          project: {
            type: 'product',
            title: 1,
            productName: 1,
            productDescription: 1,
            productImage: 1,
            _productType: 1,
            price: 1,
            inStock: 1,
            isFeatured: 1
          }
        }
      },
      ...aosSchema
    }
  }
};
