export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '新闻列表页',
    perPage: 9,
    piecesFilters: [
      {
        name: 'category'
      },
      {
        name: 'isFeatured'
      }
    ]
  },
  fields: {
    add: {
      displayCategory: {
        type: 'select',
        label: '显示分类',
        choices: 'addCategoryChoices()'
      }
    },
    group: {
      basics: {
        label: '基础设置',
        fields: [ 'displayCategory' ]
      }
    }
  },
  methods(self) {
    return {
      async addCategoryChoices(req) {
        const allNews = await self.apos.modules['news-page'].find(req)
          .project({
            category: 1
          })
          .toArray();
        const uniqueCategories = [ ...new Set(allNews.map(news => news.category)) ];
        return [
          {
            label: '全部',
            value: 'all'
          },
          ...uniqueCategories.map(category => ({
            label: category.charAt(0).toUpperCase() + category.slice(1),
            value: category
          }))
        ];
      }
    };
  },
  extendMethods(self) {
    return {
      indexQuery(_super, req) {
        const query = _super(req);
        
        // 处理搜索参数
        if (req.query.search) {
          return query.search(req.query.search);
        }
        
        return query;
      },
      filterByIndexPage(_super, query, page) {
        // 如果页面有分类，添加到查询中
        // 如果页面分类是 'all'，不修改查询，返回所有文章
        if (page.displayCategory && page.displayCategory !== 'all') {
          query.category(page.displayCategory);
        }
        // 返回查询
        return query;
      },
      chooseParentPage(_super, pages, piece) {
        // 如果文章有分类且有多个页面，分配正确的页面
        if (piece.category && pages.length > 1) {
          // 获取文章分类并分配给变量
          // 如果不是字符串则设置为 'all'
          const pieceCategory = typeof piece.category === 'string' ? piece.category : 'all';
          // 找到具有正确分类的页面
          // 如果没有找到具有正确分类的页面
          // 使用父模块的 'chooseParentPage' 方法
          // 分配回退页面
          return pages.find((page) => page.displayCategory === pieceCategory) || _super(pages, piece);
        }
        // 如果只有一个页面，使用默认行为
        return _super(pages, piece);
      }
    };
  }
};
