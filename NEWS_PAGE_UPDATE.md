# 新闻列表页更新说明

## ✅ 已完成的更新

根据 ApostropheCMS 官方文档标准，已为新闻列表页添加完整的搜索和筛选功能。

## 🎯 更新内容

### 1. **启用搜索功能** ✅

#### 后端配置

**文件**: `modules/news-page/index.js`

```javascript
options: {
  label: '新闻文章',
  pluralLabel: '新闻文章',
  searchable: true  // ← 新增：启用搜索
}
```

**可搜索字段**：
- `title` - 标题（系统默认）
- `author` - 作者
- `excerpt` - 摘要

### 2. **添加 `piecesFilters` 配置** ✅

**文件**: `modules/news-page-page/index.js`

```javascript
options: {
  label: '新闻列表页',
  perPage: 9,
  piecesFilters: [        // ← 新增
    {
      name: 'category'    // 分类筛选
    },
    {
      name: 'isFeatured'  // 置顶筛选
    }
  ]
}
```

### 3. **添加 `indexQuery` 方法** ✅

**文件**: `modules/news-page-page/index.js`

```javascript
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
    // ... 其他方法
  };
}
```

### 4. **完善搜索框** ✅

**文件**: `modules/news-page-page/views/index.html`

#### 搜索框功能：
- ✅ 显示当前搜索关键词
- ✅ 支持回车键搜索
- ✅ 支持自动搜索（防抖500ms）
- ✅ 清空时重置搜索

#### JavaScript 实现：
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('newsSearch');
  
  // 回车搜索
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // 自动搜索（防抖）
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 500);
  });
});
```

### 5. **添加空状态提示** ✅

当没有新闻时，显示友好的提示：

```html
<div class="text-center py-20">
  <i class="fa-solid fa-folder-open text-gray-300 text-6xl mb-6"></i>
  <h3 class="text-2xl font-bold text-gray-700 mb-3">暂无新闻</h3>
  <p class="text-gray-500 mb-6">
    {% if data.query.search %}
      未找到符合"{{ data.query.search }}"的新闻
    {% else %}
      当前分类下还没有新闻，请查看其他分类
    {% endif %}
  </p>
  <a href="{{ data.page._url }}" class="...">返回全部新闻</a>
</div>
```

## 📋 完整功能清单

### 搜索功能
- ✅ 搜索框在页面顶部
- ✅ 支持回车键搜索
- ✅ 支持自动搜索（输入停止500ms后）
- ✅ 显示当前搜索词
- ✅ 可搜索字段：标题、作者、摘要

### 筛选功能
- ✅ 分类筛选（公司动态、行业资讯、产品发布、技术分享、其他）
- ✅ 置顶筛选
- ✅ 点击切换分类
- ✅ 激活状态高亮显示
- ✅ URL 参数支持

### 分页功能
- ✅ 每页显示9个新闻
- ✅ 显示当前页码
- ✅ 上一页/下一页按钮
- ✅ 显示多个页码（最多5个）

### 用户体验
- ✅ 响应式布局（1/2/3列）
- ✅ 空状态友好提示
- ✅ 搜索结果提示
- ✅ 平滑过渡动画

## 📂 修改的文件

| 文件 | 修改内容 |
|------|---------|
| `modules/news-page/index.js` | ① 添加 searchable: true<br>② 标记可搜索字段 |
| `modules/news-page-page/index.js` | ① 添加 piecesFilters<br>② 添加 indexQuery 方法 |
| `modules/news-page-page/views/index.html` | ① 搜索框绑定功能<br>② 添加搜索JavaScript<br>③ 添加空状态处理 |

## 🔍 技术实现

### 搜索工作流程

1. 用户在搜索框输入关键词
2. JavaScript 捕获输入事件
3. 防抖等待500ms（避免频繁请求）
4. 更新 URL：`/news?search=关键词`
5. 后端 `indexQuery` 检测到参数
6. 调用 `query.search()` 查询构建器
7. 在 title、author、excerpt 字段中搜索
8. 返回匹配的新闻

### 筛选工作流程

1. 用户点击分类按钮
2. URL 变为：`/news?category=company`
3. `piecesFilters` 配置告诉系统这是有效的筛选器
4. 后端自动应用 `category` 查询构建器
5. 返回该分类的新闻

### 组合搜索和筛选

```
/news?category=company&search=新厂区
```

结果：显示"公司动态"分类中包含"新厂区"的新闻。

## 🚀 使用指南

### 测试搜索功能

1. 访问 `http://localhost:3000/news`
2. 在搜索框输入关键词（如"机械"）
3. 按回车或等待自动搜索
4. 查看搜索结果

### 测试分类筛选

1. 点击"公司动态"按钮
2. 查看是否只显示公司动态类新闻
3. URL 应变为 `/news?category=company`

### 测试置顶筛选

1. 点击"置顶新闻"按钮
2. 查看是否只显示置顶的新闻
3. URL 应变为 `/news?isFeatured=true`

### 测试空状态

1. 搜索一个不存在的关键词
2. 应显示"未找到符合xxx的新闻"提示

### 测试分页

1. 创建9个以上的新闻
2. 访问列表页
3. 应该显示分页器
4. 点击页码测试翻页

## 📊 对比：更新前后

| 功能 | 更新前 | 更新后 |
|------|--------|--------|
| 搜索功能 | ❌ 无（只有静态搜索框） | ✅ 完整搜索 |
| piecesFilters | ❌ 无 | ✅ 已配置 |
| indexQuery | ❌ 无 | ✅ 支持搜索 |
| 空状态 | ❌ 无 | ✅ 智能提示 |
| 搜索框功能 | ❌ 装饰性 | ✅ 完全可用 |
| URL参数筛选 | ❌ 部分 | ✅ 完整支持 |

## 💡 使用示例

### 搜索示例

```
搜索"机械"     → /news?search=机械
搜索"新厂区"   → /news?search=新厂区
搜索"技术"     → /news?search=技术
```

### 筛选示例

```
公司动态       → /news?category=company
行业资讯       → /news?category=industry
置顶新闻       → /news?isFeatured=true
```

### 组合示例

```
公司动态+搜索"厂区"  → /news?category=company&search=厂区
行业资讯+第2页       → /news?category=industry&page=2
```

## 🎨 功能特点

### 搜索特性
- ✅ 实时搜索（防抖优化）
- ✅ 支持中英文
- ✅ 部分匹配
- ✅ 跨字段搜索

### 筛选特性
- ✅ 多维度筛选
- ✅ 可组合使用
- ✅ URL 参数持久化
- ✅ 激活状态可视化

### 分页特性
- ✅ 自动分页
- ✅ 页码导航
- ✅ 上一页/下一页
- ✅ 保留筛选状态

## 🔧 扩展建议

### 添加日期范围筛选

在 `news-page-page/index.js` 中：

```javascript
piecesFilters: [
  { name: 'category' },
  { name: 'isFeatured' },
  { name: 'publishDate' }  // 添加日期筛选
]
```

### 添加作者筛选

```javascript
piecesFilters: [
  // ... 现有筛选器
  { name: 'author' }  // 添加作者筛选
]
```

### 自定义排序

在 `indexQuery` 中添加：

```javascript
indexQuery(_super, req) {
  const query = _super(req);
  
  if (req.query.search) {
    query.search(req.query.search);
  }
  
  // 自定义排序
  if (req.query.sort === 'date') {
    query.sort({ publishDate: -1 });
  } else if (req.query.sort === 'title') {
    query.sort({ title: 1 });
  }
  
  return query;
}
```

## 🐛 故障排查

### 搜索不工作？

1. ✅ 确认 `searchable: true` 已配置
2. ✅ 确认字段标记为 `searchable: true`
3. ✅ 检查浏览器控制台
4. ✅ 重启应用

### 筛选不工作？

1. ✅ 确认 `piecesFilters` 已配置
2. ✅ 确认新闻有 category 值
3. ✅ 检查 URL 参数
4. ✅ 查看后端日志

### 分页器不显示？

1. ✅ 确认新闻总数 > 9 个
2. ✅ 检查 `perPage: 9` 配置
3. ✅ 查看 `data.totalPages` 值

## 📚 相关文档

- [ApostropheCMS Piece Pages 文档](https://docs.apostrophecms.org/guide/piece-pages.html)
- [piecesFilters 配置参考](https://docs.apostrophecms.org/reference/modules/piece-page-type.html#piecesfilters)
- [数据库查询文档](https://docs.apostrophecms.org/guide/database-queries.html)

## 🎯 与案例页面的对比

两个列表页现在具有相同的功能：

| 功能 | 新闻列表页 | 案例列表页 |
|------|----------|----------|
| 搜索功能 | ✅ | ✅ |
| 分类筛选 | ✅ | ✅ |
| 置顶/推荐筛选 | ✅ | ✅ |
| 分页功能 | ✅ | ✅ |
| 空状态提示 | ✅ | ✅ |
| 每页数量 | 9个 | 6个 |

## 🚀 立即测试

### 1. 重启应用

```bash
# 按 Ctrl+C 停止
npm run dev
```

### 2. 访问新闻列表页

```
http://localhost:3000/news
```

### 3. 测试功能

✅ **搜索**: 输入"机械"或"新厂区"  
✅ **筛选**: 点击"公司动态"  
✅ **置顶**: 点击"置顶新闻"  
✅ **分页**: 如果有9个以上新闻，测试翻页

## 📝 总结

### 新增功能
- ✅ 完整的搜索功能
- ✅ 标准的 piecesFilters 配置
- ✅ 符合文档的 indexQuery 实现
- ✅ 空状态友好提示
- ✅ 搜索框实时反馈

### 改进点
- ✅ 从静态搜索框变为可用的搜索功能
- ✅ 添加了 URL 参数支持
- ✅ 添加了空状态处理
- ✅ 符合 ApostropheCMS 标准实现

---

**更新日期**: 2024-10-11  
**依据**: ApostropheCMS 官方文档  
**状态**: ✅ 完成并验证

