/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-10-12 18:36:48
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-10-12 18:36:49
 * @FilePath: \my-app\modules\deafte-page\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import areaConfig from '../../lib/area.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: '普通页面'
  },
  fields: {
    add: {
      // 头部背景图片
      headbackground: {
        type: 'attachment',
        label: '头部背景图片',
        fileGroup: 'images',
        help: '推荐尺寸：1920x600px'
      },
      // 头部标题
      headertitle: {
        type: 'string',
        label: '头部标题',
        help: '显示在页面顶部的主标题'
      },
      // 头部描述
      description: {
        type: 'string',
        label: '头部描述',
        textarea: true,
        max: 200,
        help: '显示在头部标题下方的描述文字'
      },
      // 副文本内容
      subtext: {
        type: 'area',
        label: '副文本内容',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'Bold', 'Italic', 'Link', 'Unlink',
                'BulletedList', 'NumberedList',
                'Blockquote', 'Heading'
              ]
            }
          }
        }
      },
      // 副图片
      subImg: {
        type: 'area',
        label: '副图片',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      // 主要内容区域
      main: {
        type: 'area',
        label: '主要内容',
        options: {
          expanded: true,
          groups: {
            ...areaConfig.fullExpandedGroup
          }
        }
      }
    },
    group: {
      header: {
        label: '头部设置',
        fields: [
          'headertitle',
          'description',
          'headbackground'
        ]
      },
      content: {
        label: '内容区域',
        fields: [
          'subtext',
          'subImg',
          'main'
        ]
      }
    }
  }
};
