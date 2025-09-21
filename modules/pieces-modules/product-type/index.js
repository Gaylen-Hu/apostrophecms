export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '产品类型',
    pluralLabel: '产品类型',
    icon: 'tag-icon',
    openGraph: false,
    seoFields: false
  },
  icons: {
    'tag-icon': 'Tag'
  },
  fields: {
    add: {
      // 类型名称
      typeName: {
        type: 'string',
        label: '类型名称',
        required: true
      },
      
      // 类型描述
      description: {
        type: 'area',
        label: '类型描述',
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
      
      // 类型图标
      icon: {
        type: 'string',
        label: '图标类名',
        help: 'Font Awesome 图标类名，如 fa-solid fa-gear'
      },
      
      // 类型颜色
      color: {
        type: 'color',
        label: '类型颜色',
        def: '#2563eb'
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
        fields: ['title', 'typeName', 'description']
      },
      appearance: {
        label: '外观设置',
        fields: ['icon', 'color', 'sortOrder']
      }
    }
  }
};
