# ApostropheCMS i18n 静态配置指南

## 配置完成情况

✅ **i18n模块配置** - 已修复语法错误并配置了中文和英文语言
✅ **i18n-static模块配置** - 已在app.js中配置，包含排除命名空间和自动发布选项
✅ **语言资源文件** - 已创建locales/zh.json和locales/en.json文件
✅ **示例模板** - 已创建views/fragments/i18n-example.html展示使用方法

## 配置详情

### 1. i18n模块配置 (modules/@apostrophecms/i18n/index.js)
```javascript
module.exports = {
  options: {
    defaultLocale: 'zh',
    locales: {
      zh: { 
        label: '中文' 
      },
      en: {
        label: 'English',
        prefix: '/en'
      }
    }
  }
};
```

### 2. i18n-static模块配置 (app.js)
```javascript
'@apostrophecms/i18n-static': {
  options: {
    // 排除不需要的命名空间
    excludeNamespaces: ['aposEvent', 'aposForm'],
    // 自动发布设置为true，新创建的pieces将直接发布
    autopublish: true
  }
}
```

### 3. 语言资源文件
- `locales/zh.json` - 中文翻译
- `locales/en.json` - 英文翻译

## 使用方法

### 在模板中使用翻译
```html
<!-- 使用__()函数进行翻译 -->
<h1>{{ __("welcome") }}</h1>
<a href="/">{{ __("home") }}</a>
<button>{{ __("get_started") }}</button>
```

### 在管理界面中编辑翻译
1. 启动应用：`npm run dev`
2. 访问管理界面：`http://localhost:3000/login`
3. 在管理栏中找到"i18n Static Phrases"选项
4. 编辑静态文本的翻译

### 添加新的翻译键
1. 在语言资源文件中添加新的键值对
2. 或者在管理界面中直接添加新的翻译条目
3. 在模板中使用`{{ __("new_key") }}`调用

## 可用的翻译键

当前配置的翻译键包括：
- welcome (欢迎/Welcome)
- home (首页/Home)
- about (关于我们/About Us)
- contact (联系我们/Contact)
- services (服务/Services)
- products (产品/Products)
- news (新闻/News)
- read_more (阅读更多/Read More)
- learn_more (了解更多/Learn More)
- get_started (开始使用/Get Started)
- submit (提交/Submit)
- cancel (取消/Cancel)
- save (保存/Save)
- edit (编辑/Edit)
- delete (删除/Delete)
- search (搜索/Search)
- loading (加载中.../Loading...)
- error (错误/Error)
- success (成功/Success)
- warning (警告/Warning)
- info (信息/Information)

## 注意事项

1. 只有管理员用户才能访问i18n静态模块
2. 新创建的翻译条目会自动发布（autopublish: true）
3. 可以通过excludeNamespaces配置排除不需要的命名空间
4. 支持导入/导出功能（需要额外安装相关模块）

## 下一步

1. 启动开发服务器：`npm run dev`
2. 访问管理界面测试配置
3. 在模板中使用翻译函数
4. 根据需要添加更多翻译键
