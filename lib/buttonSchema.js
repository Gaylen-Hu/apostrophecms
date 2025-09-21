/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-20 22:13:02
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-09-20 22:13:03
 * @FilePath: \my-app\lib\buttonSchema.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import linkSchema from './linkSchema.js';

const button = {
  ...linkSchema,
  style: {
    type: 'select',
    label: '按钮样式',
    required: true,
    choices: [
      {
        label: '实心主色调',
        value: 'solid-primary'
      },
      {
        label: '空心按钮',
        value: 'outline'
      },
      {
        label: '次要样式',
        value: 'secondary'
      },
      {
        label: '信息样式',
        value: 'info'
      },
      {
        label: '警告样式',
        value: 'warning'
      },
      {
        label: '危险样式',
        value: 'danger'
      }
    ]
  },
  size: {
    type: 'select',
    label: 'Size',
    required: true,
    choices: [
      {
        label: 'Regular',
        value: ''
      },
      {
        label: 'Small',
        value: 'sm'
      },
      {
        label: 'Large',
        value: 'lg'
      }
    ]
  },
  plain: {
    type: 'boolean',
    label: 'Plain',
    def: false
  },
  disabled: {
    type: 'boolean',
    label: 'Disabled',
    def: false
  }
};

export default { button };
