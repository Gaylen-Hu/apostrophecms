/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-20 17:25:54
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-09-21 14:58:44
 * @FilePath: \my-app\modules\content-widget-modules\modules.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  // Widgets
  'accordion-widget': {},
  'button-widget': {},
  'button-strip-widget': {},
  'call-to-action-widget': {},
  'columns-widget': {},
  'custom-form-widget': {},
  'image-gallery-widget': {},
  'map-widget': {
    options: {
      geocoderSettings: {
        // For a full list of the node-geocoder npm package options please view the modules documentation - https://www.npmjs.com/package/node-geocoder
        // Requred
        provider: 'mapbox',

        // Optional depending on the providers
        apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
        formatter: null, // 'gpx', 'string', ...
        minConfidence: 0.5,
        limit: 1
      }
    }
  },
  'pricing-widget': {},
  'side-by-side-widget': {},
  'image-widget': {},
  'rich-text-widget': {},
  'homePageFirst-widget': {},
  'basiclayout-widget': {},
  'advantage-card-widget': {},
  'news-hero-widget': {},
  'product-card-widget': {},
  'carousel-widget': {},
  'side-layout-widget': {},
  'side-content-widget': {},
  'certification-card-widget': {},
};
