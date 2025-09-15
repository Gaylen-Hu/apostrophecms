export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '团队成员',
    openGraph: false,
    seoFields: false
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '姓名',
        required: true
      },
      profileImage: {
        label: '头像',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      workTitle: {
        type: 'string',
        label: '职位'
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: [ 'title', 'profileImage', 'workTitle' ]
      }
    }
  }
};
