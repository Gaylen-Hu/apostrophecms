/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-15 18:13:41
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-09-20 23:15:27
 * @FilePath: \my-app\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import apostrophe from 'apostrophe';
import dotenv from 'dotenv';

dotenv.config();
apostrophe({
  root: import.meta,
  shortName: 'my-app',
  baseUrl: process.env.APOS_BASE_URL || 'http://localhost:3000',
  nestedModuleSubdirs: true,
  bundles: [ '@apostrophecms/blog' ],
  modules: {
    // Apostrophe module configuration
    // *******************************
    //
    // NOTE: most configuration occurs in the respective modules' directories.
    // See modules/@apostrophecms/page/index.js for an example.
    //
    // Any modules that are not present by default in Apostrophe must at least
    // have a minimal configuration here to turn them on: `moduleName: {}`
    // ***********************************************************************
    // `className` options set custom CSS classes for Apostrophe core widgets.

    '@apostrophecms/blog': {},
    '@apostrophecms/blog-page': {},
    '@apostrophecms/rich-text-widget': {
      options: {}
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'img-fluid'
      }
    },
    '@apostrophecms/video-widget': {
      options: {}
    },

    // The main form module
    '@apostrophecms/form': {
      options: {
        shortcut: 'a,f'
      }
    },
    // The form widget module, allowing editors to add forms to content areas
    '@apostrophecms/form-widget': {},
    // Form field widgets, used by the main form module to build forms.
    '@apostrophecms/form-text-field-widget': {},
    '@apostrophecms/form-textarea-field-widget': {},
    '@apostrophecms/form-select-field-widget': {},
    '@apostrophecms/form-radio-field-widget': {},
    '@apostrophecms/form-file-field-widget': {},
    '@apostrophecms/form-checkboxes-field-widget': {},
    '@apostrophecms/form-boolean-field-widget': {},
    '@apostrophecms/form-conditional-widget': {},
    '@apostrophecms/i18n-static': {
      options: {
        // 排除不需要的命名空间
        excludeNamespaces: ['aposEvent', 'aposForm'],
        // 自动发布设置为true，新创建的pieces将直接发布
        autopublish: true
      }
    },

    '@apostrophecms/sitemap': {
      options: {
        excludeTypes: [ 'team-member', 'product' ]
      }
    },
    '@apostrophecms/seo': {},
    '@apostrophecms/open-graph': {},

    // `asset` supports the project's webpack build for client-side assets.
    helper: {},
    asset: {},
    settings: {},

    // The project's first custom page type.
    'default-page': {},
    'about-page': {},
    'products-page': {},
    'news-page': {},
    'news-page-page': {},
    'contact-page': {},
    'home-page': {},
    'homePageFirst-widget': {},
    'homepageAbout-widget': {},
    'content-widget-modules': {
      options: {
        ignoreNoCodeWarning: true
      }
    },
    'pieces-modules': {
      options: {
        ignoreNoCodeWarning: true
      }
    },
    // Use Vite bundling for the project
    '@apostrophecms/vite': {}
  }
});
