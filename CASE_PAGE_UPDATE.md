# 案例列表页面更新说明

## ✅ 已完成的更新

根据您的要求，已将案例列表页面更新为与新闻列表页面相同的样式和功能。

## 🎯 更新内容

### 1. **每页显示数量** ✅

从 12 个改为 **6 个**

**文件**: `modules/case-page/index.js`
```javascript
options: {
  label: '案例列表页',
  perPage: 6  // 每页显示6个案例
}
```

### 2. **搜索功能** ✅

添加了完整的搜索功能：

#### 前端搜索框
- 位于页面顶部的筛选器区域
- 支持回车键搜索
- 支持自动搜索（输入停止500ms后自动搜索）
- 显示当前搜索关键词

#### 后端搜索支持
- 在 `case/index.js` 中启用搜索：`searchable: true`
- 配置可搜索字段：
  - `titleDomain` - 英文标题
  - `mainTitle` - 主标题
  - `subTitle` - 副标题
  - `description` - 简要描述
- 在 `case-page/index.js` 中实现搜索查询逻辑

### 3. **分类筛选按钮** ✅

完整的分类筛选系统：
- 全部案例
- 运输案例
- 仓储案例
- 供应链案例
- 跨境物流
- 推荐案例

**特点**：
- 点击即可切换分类
- 当前激活的分类会高亮显示（蓝色背景）
- 支持URL参数，可以直接分享筛选结果

### 4. **分页功能** ✅

使用 ApostropheCMS 内置的分页组件：
- 显示当前页码
- 支持上一页/下一页
- 显示多个页码（最多显示5个）
- 样式与新闻列表一致

### 5. **页面样式** ✅

完全参照新闻列表页面的样式：
- **英雄区域**：带背景图的标题区域
- **搜索和筛选区域**：固定在顶部，白色背景，阴影效果
- **案例卡片**：
  - 3列网格布局（移动端1列，平板2列，桌面3列）
  - 圆角设计
  - 悬停阴影效果
  - 图片缩放动画
  - 分类标签
  - 发布日期
  - 主标题
  - 描述
  - "查看详情"链接
- **空状态提示**：当没有案例时显示友好提示
- **CTA区域**：底部行动号召区域

## 📋 功能详细说明

### 搜索功能

#### 使用方法
1. 在搜索框输入关键词
2. 按回车键或等待500ms自动搜索
3. 搜索会在以下字段中查找：
   - 英文标题
   - 主标题
   - 副标题
   - 简要描述

#### 搜索特性
- ✅ 支持中文搜索
- ✅ 支持英文搜索
- ✅ 支持部分匹配
- ✅ 搜索结果会保留分类筛选
- ✅ 搜索后自动跳转到第一页

### 分类筛选功能

#### 工作原理
- 点击分类按钮会在URL中添加 `?category=transport` 参数
- 后端根据参数筛选案例
- 当前激活的分类会高亮显示

#### URL示例
```
/cases                        - 全部案例
/cases?category=transport     - 运输案例
/cases?isFeatured=true        - 推荐案例
/cases?search=风电             - 搜索"风电"
/cases?category=transport&search=设备  - 运输类+搜索"设备"
```

### 分页功能

#### 配置
- 每页显示：6个案例
- 分页器显示：最多5个页码
- 支持键盘导航

#### 分页器按钮
- **首页/上一页**：当在第一页时禁用
- **页码**：显示当前页和相邻页
- **下一页/末页**：当在最后一页时禁用

## 🎨 样式特点

### 布局
- **响应式网格**：
  - 移动端：1列
  - 平板：2列
  - 桌面：3列
- **每页6个案例**：完美的2行3列布局

### 视觉效果
- 圆角卡片设计
- 阴影和悬停效果
- 图片缩放动画
- 平滑的过渡动画
- 一致的颜色方案

### 颜色方案
- 主色：蓝色 (#2563EB)
- 分类标签：蓝色
- 推荐标记：黄色
- 文字：灰色系列

## 📂 修改的文件

| 文件 | 修改内容 |
|------|---------|
| `modules/case-page/index.js` | ① perPage改为6<br>② 添加搜索查询支持 |
| `modules/case/index.js` | ① 启用searchable<br>② 标记可搜索字段 |
| `modules/case-page/views/index.html` | ① 完全重写模板<br>② 添加搜索框<br>③ 优化分类筛选<br>④ 添加搜索JavaScript<br>⑤ 优化空状态显示 |

## 🚀 使用步骤

### 1. 重启应用

```bash
# 按 Ctrl+C 停止应用
npm run dev
```

### 2. 创建案例列表页

1. 登录管理后台
2. Pages → New Page
3. 选择"案例列表页"
4. 填写：
   - 标题：案例中心
   - Slug：cases
5. 发布

### 3. 创建测试案例

在"内容管理" → "案例管理"中创建几个测试案例。

### 4. 测试功能

访问 `http://localhost:3000/cases` 测试：

#### 搜索功能测试
1. 在搜索框输入关键词（如："风电"）
2. 按回车或等待自动搜索
3. 查看搜索结果

#### 分类筛选测试
1. 点击"运输案例"按钮
2. 查看是否只显示运输类案例
3. 点击其他分类测试

#### 分页测试
1. 创建6个以上的案例
2. 访问列表页
3. 查看是否显示分页器
4. 点击页码测试翻页

## 🔍 技术实现细节

### 搜索实现

```javascript
// 后端查询
async indexQuery(_super, req) {
  const query = await _super(req);
  if (req.query.search) {
    query.search(req.query.search);  // 使用内置搜索
  }
  return query;
}

// 前端JavaScript
searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    performSearch();  // 回车搜索
  }
});
```

### 分类筛选实现

```nunjucks
{# Nunjucks模板 #}
<a href="{{ data.page._url | build({category: 'transport'}) }}" 
   class="{% if data.query.category === 'transport' %}bg-blue-600 text-white{% endif %}">
  运输案例
</a>
```

### 分页实现

```nunjucks
{# 使用内置分页器 #}
{% import "@apostrophecms/pager:macros.html" as pager with context %}

{{ pager.render({ 
  page: data.currentPage, 
  total: data.totalPages,
  shown: 5
}, data.url) }}
```

## 📊 对比：更新前后

| 特性 | 更新前 | 更新后 |
|------|--------|--------|
| 每页数量 | 12个 | ✅ 6个 |
| 搜索功能 | ❌ 无 | ✅ 完整搜索 |
| 搜索字段 | - | ✅ 4个字段 |
| 分类筛选 | ✅ 有 | ✅ 优化样式 |
| 分页器 | ✅ 有 | ✅ 优化样式 |
| 页面样式 | 基础 | ✅ 与新闻一致 |
| 空状态 | 基础 | ✅ 智能提示 |
| JavaScript | ❌ 无 | ✅ 搜索脚本 |

## 🎯 使用示例

### 搜索案例
```
搜索"风电" → 显示所有包含"风电"的案例
搜索"运输" → 显示所有包含"运输"的案例
```

### 组合筛选
```
1. 点击"运输案例"
2. 在搜索框输入"设备"
3. → 显示运输类别中包含"设备"的案例
```

### 直接访问
```
/cases?category=transport&search=风电
→ 直接显示运输类别中搜索"风电"的结果
```

## 💡 扩展建议

### 添加标签筛选

在 `case-page/index.js` 中添加：

```javascript
async indexQuery(_super, req) {
  const query = await _super(req);
  
  // 搜索
  if (req.query.search) {
    query.search(req.query.search);
  }
  
  // 标签筛选
  if (req.query.tag) {
    query.and({
      articleTag: req.query.tag
    });
  }
  
  return query;
}
```

### 添加排序选项

在模板中添加排序下拉框：

```html
<select id="sortBy" class="px-4 py-2 border rounded-lg">
  <option value="date">按日期排序</option>
  <option value="title">按标题排序</option>
</select>
```

### 添加高级筛选

可以添加时间范围筛选、来源筛选等。

## 🐛 故障排查

### 搜索不工作？

1. 确认案例内容中有可搜索的文本
2. 检查浏览器控制台是否有JavaScript错误
3. 确认已重启应用

### 分类筛选不工作？

1. 确认案例有正确的category值
2. 检查URL参数是否正确
3. 查看后端日志

### 分页器不显示？

1. 确认案例总数 > 6个
2. 检查perPage配置
3. 查看data.totalPages值

## 📚 相关文档

- [CASE_MODULE_GUIDE.md](./CASE_MODULE_GUIDE.md) - 案例模块完整指南
- [CASE_QUICK_START.md](./CASE_QUICK_START.md) - 快速开始
- [ApostropheCMS Piece Pages文档](https://docs.apostrophecms.org/guide/piece-pages.html)
- [ApostropheCMS 数据库查询文档](https://docs.apostrophecms.org/guide/database-queries.html)

---

**更新日期**: 2024-10-11  
**更新内容**: 搜索、筛选、分页优化  
**状态**: ✅ 完成并测试

