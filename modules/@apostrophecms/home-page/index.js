import areaConfig from '../../../lib/area.js';

export default {
  options: {
    label: '首页'
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
