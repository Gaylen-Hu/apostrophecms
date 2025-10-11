# 案例模块快速开始指南

## ⚡ 5分钟快速启动

### 第1步：启动应用

```bash
npm run dev
```

等待应用启动完成。

### 第2步：创建案例列表页

1. 访问 http://localhost:3000
2. 登录管理后台
3. 点击左侧菜单"**页面**" → "**新建**"
4. 在页面类型中选择"**案例列表页**"
5. 填写信息：
   - 标题：`案例中心`
   - Slug：`cases`
   - 父页面：选择首页或留空
   - 显示分类：选择"全部"
   - 优先显示推荐案例：✅ 勾选
6. 点击"**发布**"

### 第3步：创建第一个案例

1. 点击左侧菜单"**案例管理**"
2. 点击右上角"**新建**"
3. 填写案例信息：

#### 基本信息
```
标题：风电设备运输案例
英文标题：Transport-Wind-Turbine
主标题：风电设备怎么运？
副标题：专业大件物流解决方案
来源：运去哪
```

#### 内容
```
简要描述：
为风电行业提供专业的大件设备运输解决方案，
确保设备安全准时到达目的地。

展示图：上传一张图片
详细内容：使用富文本编辑器编写详细内容
```

#### 分类与标签
```
分类：运输案例
标签：新能源系列
展示渠道：✅ 官网
```

#### 发布信息
```
发布日期：选择今天
推荐案例：✅ 勾选
```

4. 点击"**发布**"

### 第4步：查看效果

访问：http://localhost:3000/cases

🎉 完成！您已经成功创建了案例系统！

---

## 📋 快速参考

### 管理后台位置

| 功能 | 位置 |
|------|------|
| 案例管理 | 左侧菜单 → 案例管理 |
| 创建案例页面 | 页面 → 新建 → 选择"案例列表页" |
| 编辑案例 | 案例管理 → 点击案例 → 编辑 |

### URL结构

| 页面类型 | URL示例 |
|---------|---------|
| 案例列表 | `/cases` |
| 案例详情 | `/cases/transport-wind-turbine` |
| 分类筛选 | `/cases?category=transport` |
| 推荐案例 | `/cases?isFeatured=true` |

### 分类值对照表

| 显示名称 | 值 |
|---------|-----|
| 运输案例 | transport |
| 仓储案例 | warehouse |
| 供应链案例 | supply-chain |
| 跨境物流 | cross-border |
| 其他 | other |

---

## 🎯 常见任务

### 创建推荐案例

1. 创建或编辑案例
2. 切换到"发布信息"标签页
3. 勾选"推荐案例"
4. 发布

推荐案例会：
- 在列表页优先显示
- 显示黄色⭐推荐标记
- 可以通过筛选器快速访问

### 按分类组织案例

1. 创建多个案例列表页
2. 为每个页面设置不同的"显示分类"
3. 设置不同的slug：
   - `/cases` - 全部案例
   - `/cases/transport` - 运输案例
   - `/cases/warehouse` - 仓储案例

### 添加案例到首页

在首页模板中添加：

```nunjucks
{# 获取推荐案例 #}
{% set featuredCases = apos.modules.case.find(apos.req, { isFeatured: true }).limit(3).toArray() %}

<section class="featured-cases">
  <h2>推荐案例</h2>
  <div class="cases-grid">
    {% for case in featuredCases %}
      <article>
        <h3>{{ case.mainTitle }}</h3>
        <p>{{ case.description }}</p>
        <a href="{{ case._url }}">查看详情</a>
      </article>
    {% endfor %}
  </div>
</section>
```

### 导入示例数据

创建文件 `scripts/import-cases.js`：

```javascript
import apostrophe from 'apostrophe';

const apos = await apostrophe({
  shortName: 'my-app',
  root: import.meta
});

const cases = [
  {
    title: '风电设备运输案例',
    titleDomain: 'Transport-Wind-Turbine',
    mainTitle: '风电设备怎么运？',
    category: 'transport',
    source: '运去哪',
    publishDate: '2023-08-16',
    articleTag: '新能源系列',
    isFeatured: true,
    description: '专业大件物流解决方案'
  }
  // ... 更多案例
];

for (const caseData of cases) {
  await apos.case.insert(apos.task.getReq(), caseData);
  console.log(`✅ 已导入: ${caseData.mainTitle}`);
}

await apos.destroy();
```

运行导入：
```bash
node scripts/import-cases.js
```

---

## 🎨 样式定制

### 修改案例卡片颜色

编辑 `modules/case-page/views/index.html`：

```html
{# 找到案例卡片的class，修改颜色 #}
<div class="bg-white ...">  <!-- 改为 bg-gray-50 -->
```

### 修改分类按钮样式

编辑 `modules/case-page/views/index.html`：

```html
{# 找到分类按钮，修改颜色 #}
<a class="... bg-blue-600 ...">  <!-- 改为其他颜色 -->
```

---

## 🔧 故障排查

### ❌ 管理后台看不到"案例管理"

**原因**：模块未注册或应用未重启

**解决**：
1. 检查 `app.js` 中是否有 `'case': {}`
2. 重启应用：`Ctrl+C` 然后 `npm run dev`

### ❌ 访问 /cases 显示404

**原因**：未创建案例列表页

**解决**：按照"第2步"创建案例列表页

### ❌ 案例详情页样式错乱

**原因**：Tailwind CSS未正确加载

**解决**：
1. 检查 `modules/asset/ui/src/index.scss` 是否导入了Tailwind
2. 运行 `npm run build` 重新构建资源

### ❌ 图片上传失败

**原因**：OSS配置问题

**解决**：参考 `OSS_QUICK_START.md` 配置OSS

---

## 📚 下一步

- 📖 阅读完整文档：[CASE_MODULE_GUIDE.md](./CASE_MODULE_GUIDE.md)
- 🎨 定制案例模板
- 🔍 添加搜索功能
- 📱 优化移动端体验
- 🌐 配置多语言支持

---

## 💡 小贴士

1. **使用英文标题作为URL标识**
   - 英文标题会自动转换为URL友好格式
   - 例如：`Transport-Wind-Turbine` → `/cases/transport-wind-turbine`

2. **善用标签组织案例**
   - 标签可以跨分类使用
   - 例如："新能源系列"可以包含运输和仓储案例

3. **定期检查生效时间**
   - 设置了结束日期的案例会自动过期
   - 可以通过管理后台筛选过期案例

4. **利用推荐功能**
   - 推荐案例会自动排在前面
   - 适合展示明星案例

5. **优化SEO**
   - 填写完整的描述信息
   - 使用有意义的英文标题
   - 上传高质量的展示图

---

**需要帮助？** 查看 [CASE_MODULE_GUIDE.md](./CASE_MODULE_GUIDE.md) 获取详细信息

**有问题？** 检查控制台错误信息或查看应用日志

