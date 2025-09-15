import areaConfig from '../../../lib/area.js';
import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '列布局',
    icon: 'pillar',
    description: '为内容创建灵活的布局。',
    previewImage: 'svg'
  },
  icons: {
    'view-column-icon': 'ViewColumn'
  },
  fields: {
    add: {
      style: {
        type: 'select',
        label: '布局样式',
        required: true,
        choices: [
          {
            label: '全宽',
            value: 'full',
            def: true
          },
          {
            label: '容器宽度',
            value: 'contained'
          }
        ]
      },
      cols: {
        type: 'select',
        label: '列配置',
        required: true,
        choices: [
          {
            label: '单列',
            value: 'single',
            def: true
          },
          {
            label: '50% / 50%',
            value: 'double'
          },
          {
            label: '33% / 33% / 33%',
            value: 'triple'
          },
          {
            label: '25% / 25% / 25% / 25%',
            value: 'quadruple'
          }
        ]
      },
      one: {
        type: 'area',
        contextual: true,
        options: {
          expanded: true,
          groups: {
            ...areaConfig.columnExpandedGroup
          }
        }
      },
      two: {
        type: 'area',
        contextual: true,
        options: {
          expanded: true,
          groups: {
            ...areaConfig.columnExpandedGroup
          }
        },
        if: {
          $or: [
            { cols: 'double' },
            { cols: 'triple' },
            { cols: 'quadruple' }
          ]
        }
      },
      three: {
        type: 'area',
        contextual: true,
        if: {
          $or: [
            { cols: 'quadruple' },
            { cols: 'triple' }
          ]
        },
        options: {
          expanded: true,
          groups: {
            ...areaConfig.columnExpandedGroup
          }
        }
      },
      four: {
        type: 'area',
        contextual: true,
        if: {
          cols: 'quadruple'
        },
        options: {
          expanded: true,
          groups: {
            ...areaConfig.columnExpandedGroup
          }
        }
      },
      ...aosSchema
    }
  }
};
