/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-16 18:44:37
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-09-16 18:44:39
 * @FilePath: \my-app\modules\@apostrophecms\page\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// This configures the @apostrophecms/pages module to add a "home" page type to the
// pages menu

export default {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: 'about-page',
        label: 'About'
      },
      {
        name: 'products-page',
        label: 'Products'
      },
      {
        name: 'news-page-page',
        label: '新闻列表页'
      },
      { 
        name: 'contact-page',
        label: 'Contact'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  }
};
