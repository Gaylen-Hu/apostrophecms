import aosSchema from '../../../lib/aosSchema.js';
import NodeGeocoder from 'node-geocoder';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    // geocoder options can be include inside the main map-widget reference
    // located in the /modules/content-widget-modules/modules.js file
    label: '地图',
    icon: 'map-icon',
    description: '在页面上添加地图',
    previewImage: 'jpg'
  },
  icons: {
    'map-icon': 'Map'
  },
  fields: {
    add: {
      address: {
        type: 'string',
        label: '地址',
        required: true
      },
      mapZoomLevel: {
        type: 'integer',
        label: '地图缩放级别',
        min: 1,
        max: 14,
        def: 14
      },
      ...aosSchema
    }
  },
  components(self) {
    return {
      async map(req, data) {

        const body = {};
        try {
          if (!self.options.geocoderSettings.apiKey) {
            body.message = 'No geocoder api key found, please set in the widget options';
          }
          // View node-geocoder npm package for full list of options and providers - https://www.npmjs.com/package/node-geocoder
          const options = {
            ...self.options.geocoderSettings
          };
          const geocoder = NodeGeocoder(options);
          const geocoderAddress = await geocoder.geocode(data.widget.address);

          if (!geocoderAddress.length) {
            throw new Error('No results found for entered street address, please check address is valid and update the field');
          }

          data.widget.latitude = geocoderAddress[0].latitude;
          data.widget.longitude = geocoderAddress[0].longitude;
        } catch (error) {
          body.message = error.message;
        }

        return {
          response: body,
          widget: data.widget
        };
      }
    };
  }
};
