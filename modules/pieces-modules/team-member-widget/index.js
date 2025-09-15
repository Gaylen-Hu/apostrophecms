import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '团队成员',
    icon: 'teams-icon',
    description: '在页面上显示团队成员',
    previewImage: 'svg'
  },
  icons: {
    'teams-icon': 'AccountMultiplePlus'
  },
  fields: {
    add: {
      style: {
        type: 'select',
        label: '布局样式',
        required: true,
        choices: [
          {
            label: '三列',
            value: 'three-col'
          },
          {
            label: '四列',
            value: 'four-col'
          }
        ]
      },
      _teamMembers: {
        type: 'relationship',
        withType: 'team-member',
        label: '选择团队成员...',
        required: true,
        builders: {
          project: {
            type: 'team-member',
            title: 1,
            profileImage: 1,
            workTitle: 1
          }
        }
      },
      ...aosSchema
    }
  }
};
