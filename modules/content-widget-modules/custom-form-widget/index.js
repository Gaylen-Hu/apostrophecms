import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '自定义表单',
    icon: 'form-icon',
    description: '在页面上显示交互式表单',
    previewImage: 'svg'
  },
  icons: {
    'form-icon': 'FormDropdown'
  },
  fields: {
    add: {
      layout: {
        type: 'select',
        def: 'background',
        choices: [
          {
            label: '背景',
            value: 'background'
          },
          {
            label: '两列',
            value: 'column'
          }
        ]
      },
      backgroundStyle: {
        type: 'select',
        label: '背景样式',
        def: 'image',
        choices: [
          {
            label: '图片',
            value: 'image'
          },
          {
            label: '颜色',
            value: 'color'
          }
        ],
        if: {
          layout: 'background'
        }
      },
      _backgroundImage: {
        type: 'relationship',
        withType: '@apostrophecms/image',
        label: '选择图片',
        max: 1,
        if: {
          $or: [
            { backgroundStyle: 'image' },
            { layout: 'column' }
          ]

        }
      },
      backgroundColor: {
        type: 'color',
        label: '选择背景颜色',
        if: {
          backgroundStyle: 'color'
        }
      },
      fontColor: {
        type: 'select',
        label: '更改字体颜色',
        choices: [
          {
            label: '主要',
            value: 'primary'
          },
          {
            label: '次要',
            value: 'secondary'
          },
          {
            label: '第三',
            value: 'tertiary'
          },
          {
            label: '黑色',
            value: 'black'
          },
          {
            label: '白色',
            value: 'white'
          }
        ]
      },
      form: {
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/form': {}
          }
        }
      },
      ...aosSchema
    }
  }
};
