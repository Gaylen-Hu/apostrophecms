export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '案例列表页',
    perPage: 6,
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
        choices: [
          {
            label: '全部',
            value: 'all'
          },
          {
            label: '运输案例',
            value: 'transport'
          },
          {
            label: '仓储案例',
            value: 'warehouse'
          },
          {
            label: '供应链案例',
            value: 'supply-chain'
          },
          {
            label: '跨境物流',
            value: 'cross-border'
          },
          {
            label: '其他',
            value: 'other'
          }
        ],
        def: 'all'
      },
      showFeaturedFirst: {
        type: 'boolean',
        label: '优先显示推荐案例',
        def: true,
        help: '开启后，推荐案例会显示在列表顶部'
      }
    },
    group: {
      basics: {
        label: '基础设置',
        fields: ['displayCategory', 'showFeaturedFirst']
      }
    }
  },
  extendMethods(self) {
    return {
      indexQuery(_super, req) {
        // 获取基础查询对象并链式调用构建器
        const query = _super(req);
        
        // 如果有搜索参数，添加搜索
        if (req.query.search) {
          return query.search(req.query.search);
        }
        
        return query;
      },
      filterByIndexPage(_super, query, page) {
        // 如果页面有分类筛选，添加到查询中
        // 如果页面分类是 'all'，不修改查询，返回所有案例
        if (page.displayCategory && page.displayCategory !== 'all') {
          query.category(page.displayCategory);
        }
        
        // 如果开启了优先显示推荐案例
        if (page.showFeaturedFirst) {
          query.sort({ isFeatured: -1, publishDate: -1 });
        } else {
          query.sort({ publishDate: -1 });
        }
        
        return query;
      },
      chooseParentPage(_super, pages, piece) {
        // 如果案例有分类且有多个页面，分配正确的页面
        if (piece.category && pages.length > 1) {
          const pieceCategory = typeof piece.category === 'string' ? piece.category : 'all';
          return pages.find((page) => page.displayCategory === pieceCategory) || _super(pages, piece);
        }
        return _super(pages, piece);
      }
    };
  }
};

