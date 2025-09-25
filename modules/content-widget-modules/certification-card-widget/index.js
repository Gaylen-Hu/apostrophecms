/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-25 14:54:05
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-09-25 15:27:30
 * @FilePath: \my-app\modules\content-widget-modules\certification-card-widget\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '资质认证卡片',
    icon: 'certificate',
    previewImage: 'jpg'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '认证标题',
        required: true
      },
      image: {
        type: 'attachment',
        label: '认证图片',
        fileGroup: 'images',
        required: true
      },
      description: {
        type: 'string',
        label: '认证描述',
        textarea: true
      },
      linkUrl: {
        type: 'url',
        label: '详情链接'
      },
      linkText: {
        type: 'string',
        label: '链接文字',
        def: '了解更多'
      },
      style: {
        type: 'select',
        label: '卡片样式',
        choices: [
          { label: '默认样式', value: 'default' },
          { label: '简约样式', value: 'minimal' },
          { label: '突出样式', value: 'highlight' }
        ],
        def: 'default'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'image', 'description']
      },
      link: {
        label: '链接设置',
        fields: ['linkUrl', 'linkText']
      },
      design: {
        label: '样式设置',
        fields: ['style']
      }
    }
  }
};
