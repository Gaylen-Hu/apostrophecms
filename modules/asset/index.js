export default {
  build: {
    vite: {
      extensions: {
        buildSizeWarning: {
          // https://vite.dev/config/build-options.html#build-chunksizewarninglimit
          build: {
            chunkSizeWarningLimit: 650
          }
        }
      }
    }
  },
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production');
        }
      }
    };
  }
};
