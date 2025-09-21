import areaConfig from '../../lib/area.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: '默认页面'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          expanded: true,
          groups: {
            ...areaConfig.fullExpandedGroup
          }
        }
      },
      subtext: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
          }
        }
      },
      subImg: {
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      }
    }, 
    group: {
      basics: {
        label: '基础设置',
        fields: [
          'title',
          'main'
        ]
      }
    }
  }
};
