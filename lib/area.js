const apostropheWidgets = {
  '@apostrophecms/image': {
    className: 'img-fluid'
  },
  '@apostrophecms/video': {},
  '@apostrophecms/rich-text': {}
};

const area = {
  all: {
    columns: {},
    'call-to-action': {},
    'custom-form': {},
    'image-gallery': {},
    'carousel': {},
    'product-card': {},
    'basiclayout': {},
    'advantage-card': {},
    product: {},
    'side-by-side': {},
    'rich-text': {},
    image: {},
    map: {},
    'homePageFirst': {},
    

    // Marketing widgets
    accordion: {},
    pricing: {},
    'team-member': {},
    'side-content': {},
    'side-layout': {},
  },
  columnExpandedGroup: {
    basic: {
      label: '基础工具',
      widgets: {
        image: {},
        'rich-text': {}
      },
      columns: 2
    },
    layout: {
      label: 'Layout Tools',
      widgets: {
        accordion: {},
        'call-to-action': {},
        'side-by-side': {}
      },
      columns: 2
    },
    general: {
      label: '主题组件',
      widgets: {
        'custom-form': {},
        'image-gallery': {},
        'carousel': {},
        'product-card': {},
        'basiclayout': {},
        map: {},
        pricing: {},
        product: {},  
        'team-member': {},
        'homePageFirst': {},
        'advantage-card': {},
        'product-card': {},
      },
      columns: 3
    }
  },
  apos: {
    ...apostropheWidgets
  },
  richText: {
    '@apostrophecms/rich-text': {}
  },
  fullExpandedGroup: {
    layout: {
      label: '布局工具',
      widgets: {
        columns: {},
        'side-by-side': {},
        "basiclayout": {},
        'side-layout': {},
      },
      columns: 2
    },
    media: {
      label: '媒体组件',
      widgets: {
        image: {},
        '@apostrophecms/video': {},
        'image-gallery': {}
      },
      columns: 2
    },
    general: {
      label: '内容组件',
      widgets: {
        'rich-text': {},
        accordion: {},
        'call-to-action': {},
        'custom-form': {},
        map: {},
        pricing: {},
        product: {},
        'team-member': {},
        'homePageFirst': {},
        'homepageAbout': {},
        'advantage-card': {},
        'product-card': {},
        'carousel': {},
        'side-content': {},
      },
      columns: 3
    }
  }
};

export default area;
