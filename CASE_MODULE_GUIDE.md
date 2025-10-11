# 案例模块使用指南

## 📋 模块概述

本项目已成功创建了完整的案例管理系统，包括：
- **案例内容类型（Case Piece）**：用于创建和管理案例
- **案例列表页（Case Page）**：用于展示案例列表和详情

## 🗂️ 文件结构

```
modules/
├── case/                          # 案例Piece模块
│   ├── index.js                  # 模块配置
│   └── views/
│       └── show.html            # 案例详情模板
└── case-page/                    # 案例列表页模块
    ├── index.js                  # 模块配置
    └── views/
        ├── index.html           # 案例列表模板
        └── show.html            # 案例详情页模板
```

## 🎯 功能特性

### 案例字段

根据您提供的数据结构，案例包含以下字段：

| 字段名 | 类型 | 说明 | 必填 |
|-------|------|------|------|
| title | 字符串 | 标题（系统字段） | ✅ |
| titleDomain | 字符串 | 英文标题/URL标识 | ✅ |
| mainTitle | 字符串 | 主标题 | ✅ |
| subTitle | 字符串 | 副标题 | ❌ |
| source | 字符串 | 来源（默认：运去哪） | ❌ |
| description | 文本区域 | 简要描述 | ❌ |
| featuredImage | 图片区域 | 展示图 | ✅ |
| content | 内容区域 | 详细内容 | ❌ |
| category | 选择 | 分类 | ✅ |
| articleTag | 字符串 | 标签 | ❌ |
| channel | 多选框 | 展示渠道 | ❌ |
| isFeatured | 布尔值 | 是否推荐 | ❌ |
| publishDate | 日期 | 发布日期 | ✅ |
| validFrom | 日期 | 生效开始日期 | ❌ |
| validTo | 日期 | 生效结束日期 | ❌ |

### 分类选项

- 运输案例 (transport)
- 仓储案例 (warehouse)
- 供应链案例 (supply-chain)
- 跨境物流 (cross-border)
- 其他 (other)

### 展示渠道

- 官网 (website)
- 移动端 (mobile)
- 微信 (wechat)

## 🚀 使用步骤

### 1. 启动应用

```bash
npm run dev
```

### 2. 访问管理后台

访问 `http://localhost:3000` 并登录管理后台。

### 3. 创建案例列表页

1. 在管理后台，点击"页面" → "新建页面"
2. 选择页面类型：**案例列表页**
3. 填写页面信息：
   - 标题：案例中心
   - Slug：cases（URL路径）
   - 显示分类：选择要展示的分类（默认：全部）
   - 优先显示推荐案例：开启/关闭
4. 点击"发布"

### 4. 创建案例内容

1. 在管理后台侧边栏，找到"案例管理"
2. 点击"新建案例"
3. 填写案例信息：

#### 基本信息标签页
- **标题**：内部标识用（例如：风电设备运输案例）
- **英文标题**：Transport-Wind-Turbine
- **主标题**：风电设备怎么运？
- **副标题**：（可选）专业大件物流解决方案
- **来源**：运去哪

#### 内容标签页
- **简要描述**：填写案例简介，用于列表页展示
- **展示图**：上传案例主图
- **详细内容**：使用富文本编辑器编写案例详情

#### 分类与标签标签页
- **分类**：选择运输案例
- **标签**：新能源系列
- **展示渠道**：选择官网、移动端等

#### 发布信息标签页
- **发布日期**：选择发布日期
- **生效开始日期**：（可选）案例展示的开始时间
- **生效结束日期**：（可选）案例展示的结束时间
- **推荐案例**：勾选后会在列表页优先显示

5. 点击"发布"

### 5. 查看前台效果

访问 `http://localhost:3000/cases` 查看案例列表页。

## 🎨 前台功能

### 案例列表页功能

1. **分类筛选**：
   - 全部案例
   - 运输案例
   - 仓储案例
   - 供应链案例
   - 跨境物流
   - 推荐案例

2. **案例卡片显示**：
   - 展示图
   - 分类标签
   - 推荐标记（如果是推荐案例）
   - 主标题和副标题
   - 案例描述
   - 来源和发布日期
   - 查看详情按钮

3. **分页**：每页显示12个案例

4. **空状态**：当没有案例时显示友好提示

### 案例详情页功能

1. **面包屑导航**：首页 / 案例中心 / 案例标题

2. **案例头部**：
   - 分类、标签、推荐标记
   - 主标题和副标题
   - 元信息卡片（来源、发布时间、案例编号）
   - 案例概述

3. **案例内容**：
   - 展示图
   - 详细内容（富文本）

4. **案例底部**：
   - 完整案例信息
   - 展示渠道
   - 操作按钮（返回列表、打印、分享）

5. **CTA区域**：引导用户联系或查看更多案例

## 📊 管理功能

### 案例列表视图

在管理后台的"案例管理"页面，可以：
- 查看所有案例列表
- 按分类、标签、推荐状态筛选
- 查看主标题、分类、标签、发布日期、推荐状态等列
- 编辑、删除案例
- 批量操作

### 快速创建

配置了 `quickCreate: true`，可以在管理后台快速创建新案例。

## 🔧 自定义配置

### 修改每页显示数量

编辑 `modules/case-page/index.js`：

```javascript
options: {
  label: '案例列表页',
  perPage: 12  // 修改为需要的数量
}
```

### 添加新分类

编辑 `modules/case/index.js`，在 `category` 字段的 `choices` 中添加：

```javascript
category: {
  type: 'select',
  label: '分类',
  required: true,
  choices: [
    // ... 现有选项
    {
      label: '新分类名称',
      value: 'new-category'
    }
  ]
}
```

同时需要在 `modules/case-page/index.js` 中同步更新。

### 修改排序规则

编辑 `modules/case-page/index.js` 的 `filterByIndexPage` 方法：

```javascript
if (page.showFeaturedFirst) {
  query.sort({ isFeatured: -1, publishDate: -1 });  // 推荐优先，按日期倒序
} else {
  query.sort({ publishDate: -1 });  // 仅按日期倒序
}
```

### 添加搜索功能

在模块中添加搜索方法：

```javascript
queries(self, query) {
  return {
    builders: {
      searchTerm: {
        def: null,
        async finalize() {
          const term = query.get('searchTerm');
          if (term) {
            query.and({
              $or: [
                { title: new RegExp(term, 'i') },
                { mainTitle: new RegExp(term, 'i') },
                { description: new RegExp(term, 'i') }
              ]
            });
          }
        }
      }
    }
  };
}
```

## 🌐 国际化

模块已配置国际化支持：

```javascript
options: {
  i18n: {
    browser: true
  }
}
```

可以在 `modules/case/i18n/` 目录下创建翻译文件：
- `en.json` - 英文翻译
- `zh.json` - 中文翻译

## 📱 响应式设计

所有模板已使用 Tailwind CSS 实现响应式设计：
- 移动端：1列
- 平板：2列
- 桌面：3列

## 🎯 SEO优化

每个案例自动生成：
- 唯一的URL（基于titleDomain）
- 页面标题和描述
- 结构化数据（可扩展）

## 🔍 查询案例数据

在其他模块中查询案例：

```javascript
// 获取所有推荐案例
const featuredCases = await self.apos.modules.case
  .find(req, { isFeatured: true })
  .sort({ publishDate: -1 })
  .limit(3)
  .toArray();

// 按分类查询
const transportCases = await self.apos.modules.case
  .find(req, { category: 'transport' })
  .toArray();

// 获取最新案例
const latestCases = await self.apos.modules.case
  .find(req)
  .sort({ publishDate: -1 })
  .limit(5)
  .toArray();
```

## 📝 数据迁移

如果您有现有的案例数据，可以创建迁移脚本：

```javascript
// migrations/add-cases.js
export default {
  async up(db) {
    const cases = [
      {
        title: '风电设备运输案例',
        titleDomain: 'Transport-Wind-Turbine',
        mainTitle: '风电设备怎么运？',
        category: 'transport',
        source: '运去哪',
        publishDate: '2023-08-16',
        articleTag: '新能源系列',
        // ... 其他字段
      }
    ];
    
    for (const caseData of cases) {
      await self.apos.modules.case.insert(req, caseData);
    }
  }
};
```

## 🎨 样式定制

所有模板使用 Tailwind CSS，可以通过修改类名来定制样式。

主要颜色方案：
- 主色：蓝色 (blue-600)
- 成功：绿色 (green-600)
- 推荐：黄色 (yellow-500)

## 🚨 常见问题

### Q: 案例列表页显示404
**A**: 确保在管理后台创建了"案例列表页"类型的页面，并设置了正确的slug（如：cases）

### Q: 管理后台看不到"案例管理"
**A**: 检查 `app.js` 中是否正确注册了 `case` 模块，重启应用

### Q: 图片上传失败
**A**: 检查OSS配置是否正确，参考 `OSS_CONFIGURATION.md`

### Q: 如何批量导入案例？
**A**: 可以使用迁移脚本或通过API批量导入

## 📚 相关文档

- [ApostropheCMS Pieces文档](https://docs.apostrophecms.org/guide/pieces.html)
- [ApostropheCMS Page Types文档](https://docs.apostrophecms.org/guide/pages.html)
- [字段类型参考](https://docs.apostrophecms.org/reference/field-types/)

---

**创建日期**: 2024-10-11  
**最后更新**: 2024-10-11  
**版本**: 1.0.0

