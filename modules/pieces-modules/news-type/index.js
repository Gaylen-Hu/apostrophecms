/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-01-20 12:10:00
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-10-04 14:14:44
 * @FilePath: \my-app\modules\pieces-modules\news-type\index.js
 * @Description: 新闻类型模块 - 用于管理新闻的分类和类型
 */

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '新闻类型',
    pluralLabel: '新闻类型',
    i18n: {
      browser: true
    }
  },
  fields: {
    add: {
      // 类型名称
      typeName: {
        type: 'string',
        label: '类型名称',
        required: true,
        help: '显示名称（如：公司新闻、行业资讯等）'
      },
      // 类型描述
      description: {
        type: 'string',
        label: '类型描述',
        textarea: true,
        help: '详细的类型描述'
      },
      // 类型图标
      icon: {
        type: 'select',
        label: '类型图标',
        choices: [
          { label: '📰 新闻', value: 'fa-newspaper' },
          { label: '🏢 公司', value: 'fa-building' },
          { label: '🏭 行业', value: 'fa-industry' },
          { label: '⚙️ 技术', value: 'fa-cogs' },
          { label: '📦 产品', value: 'fa-box' },
          { label: '🤝 服务', value: 'fa-handshake' },
          { label: '📅 活动', value: 'fa-calendar' },
          { label: '📢 公告', value: 'fa-bullhorn' },
          { label: '👥 招聘', value: 'fa-users' },
          { label: '🤝 合作', value: 'fa-handshake-o' }
        ]
      },
      // 类型颜色
      color: {
        type: 'color',
        label: '类型颜色',
        help: '用于标签显示的颜色'
      },
      // 背景颜色
      backgroundColor: {
        type: 'color',
        label: '背景颜色',
        help: '用于标签背景的颜色'
      },
      // 显示在首页
      showOnHomepage: {
        type: 'boolean',
        label: '显示在首页',
        def: false,
        help: '是否在首页新闻区域显示'
      },
      // 启用状态
      enabled: {
        type: 'boolean',
        label: '启用',
        def: true,
        help: '是否启用此新闻类型'
      },
      // 排序
      sortOrder: {
        type: 'integer',
        label: '排序',
        def: 0,
        help: '数字越小排序越靠前'
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: ['typeName', 'description']
      },
      appearance: {
        label: '外观设置',
        fields: ['icon', 'color', 'backgroundColor']
      },
      settings: {
        label: '显示设置',
        fields: ['showOnHomepage', 'enabled', 'sortOrder']
      }
    }
  },
  methods(self) {
    return {
      // 获取所有启用的新闻类型
      async getActiveTypes(req) {
        return await self.find(req, {
          enabled: true
        }).sort({ sortOrder: 1 }).toArray();
      },
      
      // 获取首页显示的新闻类型
      async getHomepageTypes(req) {
        return await self.find(req, {
          enabled: true,
          showOnHomepage: true
        }).sort({ sortOrder: 1 }).toArray();
      }
    };
  }
};
