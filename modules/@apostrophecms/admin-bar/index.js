/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-10-11 16:14:38
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-10-11 16:49:47
 * @FilePath: \my-app\modules\@apostrophecms\admin-bar\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  options: {
    groups: [
      {
        name: 'content',
        label: '内容管理',
        items: [
          'news-page',        // 新闻文章
          'news-type',        // 新闻类型
          'case',             // 案例
          'product',          // 产品
          'product-type',     // 产品类型
          'team-member'       // 团队成员
        ]
      },
      {
        name: 'forms',
        label: '表单管理',
        items: [
          '@apostrophecms/form'
        ]
      },
      {
        name: 'media',
        label: '媒体管理',
        items: [
          '@apostrophecms/image',
          '@apostrophecms/file',
          '@apostrophecms/image-tag',
          '@apostrophecms/file-tag'
        ]
      },
      {
        name: 'admin',
        label: '系统管理',
        items: [
          '@apostrophecms/user'
        ]
      }
    ]
  }
};
