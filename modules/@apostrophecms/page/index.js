/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-16 18:44:37
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-10-12 18:37:04
 * @FilePath: \my-app\modules\@apostrophecms\page\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// This configures the @apostrophecms/pages module to add a "home" page type to the
// pages menu

export default {
  options: {
    cache: {
      page: {
        // Specified in seconds
        maxAge: 6000
      },
      api: {
        // Specified in seconds
        maxAge: 3000
      }
    },
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      
      {
        name: 'products-page',
        label: 'Products'
      },
      {
        name: 'case-page',
        label: '案例列表页'
      },
      {
        name: 'news-page-page',
        label: '新闻列表页'
      },
      {
        name: 'deafte-page',
        label: '普通页面'
      },
     
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  }
};
