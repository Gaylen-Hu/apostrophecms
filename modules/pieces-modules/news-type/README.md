# 新闻类型模块

新闻类型模块用于管理新闻的分类和类型，类似于产品类型的功能。

## 功能特点

- 🏷️ 灵活的新闻分类管理
- 🎨 自定义图标和颜色
- 📱 首页显示控制
- 🔄 排序功能
- ✅ 启用/禁用状态
- 🔗 与新闻文章的关联关系

## 字段说明

### 基础信息
- **标题**: 新闻类型的标题
- **类型名称**: 显示名称（如：公司新闻、行业资讯等）
- **类型描述**: 详细的类型描述

### 外观设置
- **类型图标**: 从预设图标中选择
- **类型颜色**: 用于标签显示的颜色
- **背景颜色**: 用于标签背景的颜色

### 显示设置
- **显示在首页**: 是否在首页新闻区域显示
- **启用**: 是否启用此新闻类型
- **排序**: 数字越小排序越靠前

## 预设图标

- 📰 新闻 (fa-newspaper)
- 🏢 公司 (fa-building)
- 🏭 行业 (fa-industry)
- ⚙️ 技术 (fa-cogs)
- 📦 产品 (fa-box)
- 🤝 服务 (fa-handshake)
- 📅 活动 (fa-calendar)
- 📢 公告 (fa-bullhorn)
- 👥 招聘 (fa-users)
- 🤝 合作 (fa-handshake-o)

## 使用方法

### 1. 创建新闻类型

1. 登录管理后台
2. 导航到 "新闻类型" 模块
3. 点击 "新建新闻类型"
4. 填写类型名称和描述
5. 选择图标和颜色
6. 设置显示选项
7. 保存

### 2. 在新闻中使用

1. 创建或编辑新闻文章
2. 在 "新闻类型" 字段中选择对应的类型
3. 保存新闻

### 3. 在模板中使用

```html
<!-- 显示新闻类型标签 -->
{% if data.piece.newsType %}
  <span class="news-type-tag" 
        style="background-color: {{ data.piece.newsType.backgroundColor }}; color: {{ data.piece.newsType.color }};">
    <i class="fa-solid {{ data.piece.newsType.icon }}"></i>
    {{ data.piece.newsType.typeName }}
  </span>
{% endif %}
```

## API 方法

### 获取所有启用的新闻类型
```javascript
const newsTypes = await self.apos.modules['news-type'].getActiveTypes(req);
```

### 获取首页显示的新闻类型
```javascript
const homepageTypes = await self.apos.modules['news-type'].getHomepageTypes(req);
```

## 与新闻页面的关联

新闻类型与新闻文章通过 `relationship` 字段关联：

- 每个新闻文章必须选择一个新闻类型
- 新闻类型可以包含多个新闻文章
- 支持按新闻类型筛选新闻

## 管理界面

- **列表页**: 显示所有新闻类型的卡片视图
- **详情页**: 显示单个新闻类型的详细信息
- **编辑页**: 创建和编辑新闻类型
- **筛选**: 支持按状态筛选
- **排序**: 支持按排序字段排序

## 样式类名

- `.news-type-card`: 新闻类型卡片
- `.news-type-tag`: 新闻类型标签
- `.news-type-detail-page`: 详情页面容器

## 注意事项

1. 删除新闻类型前，请确保没有新闻文章使用该类型
2. 禁用新闻类型不会影响已发布的新闻文章
3. 排序字段支持负数，数字越小排序越靠前
4. 首页显示设置影响首页新闻区域的显示
