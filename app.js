const { ApostropheCms } = require('apostrophe');

require('apostrophe')({
  shortName: 'apostrophecms-site',
  
  // MongoDB configuration
  // Make sure MongoDB is running on localhost:27017
  // or configure the APOS_MONGODB_URI environment variable
  
  // Basic modules configuration
  modules: {
    // Essential modules for a basic site
    '@apostrophecms/express': {},
    '@apostrophecms/page': {},
    '@apostrophecms/home-page': {},
    '@apostrophecms/user': {},
    '@apostrophecms/login': {},
    '@apostrophecms/admin-bar': {},
    
    // Asset management
    '@apostrophecms/asset': {},
    
    // Basic piece types for content management
    'article': {
      extend: '@apostrophecms/piece-type',
      options: {
        label: 'Article',
        pluralLabel: 'Articles'
      },
      fields: {
        add: {
          body: {
            type: 'area',
            label: 'Body',
            options: {
              widgets: {
                '@apostrophecms/rich-text': {},
                '@apostrophecms/image': {}
              }
            }
          }
        },
        group: {
          basics: {
            label: 'Basics',
            fields: ['title', 'body']
          }
        }
      }
    },
    
    // Article pages for displaying articles
    'article-page': {
      extend: '@apostrophecms/piece-page-type',
      options: {
        label: 'Article Page',
        pieceModuleName: 'article'
      }
    }
  }
});