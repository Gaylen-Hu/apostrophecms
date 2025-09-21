import apostrophe from 'apostrophe';
import dotenv from 'dotenv';

dotenv.config();

const apos = apostrophe({
  root: import.meta,
  shortName: 'my-app',
  baseUrl: process.env.APOS_BASE_URL || 'http://localhost:3000',
  nestedModuleSubdirs: true,
  modules: {
    '@apostrophecms/global': {}
  }
});

async function checkGlobalData() {
  try {
    await apos.init();
    
    console.log('🔍 检查全局数据...');
    
    // 获取全局数据
    const globalData = await apos.doc.find({ type: '@apostrophecms/global' }).toObject();
    
    if (!globalData) {
      console.log('❌ 没有找到全局数据');
      return;
    }
    
    console.log('✅ 找到全局数据');
    console.log('📊 全局数据详情:');
    console.log('- 网站标题:', globalData.title || '未设置');
    console.log('- 头部导航项目数量:', globalData.headerNav ? globalData.headerNav.length : 0);
    
    if (globalData.headerNav && globalData.headerNav.length > 0) {
      console.log('\n📋 头部导航项目:');
      globalData.headerNav.forEach((nav, index) => {
        console.log(`  ${index + 1}. ${nav.linkText || '未设置文本'}`);
        console.log(`     类型: ${nav.linkType || '未设置'}`);
        console.log(`     链接: ${getNavUrl(nav)}`);
        console.log(`     子菜单: ${nav.hasSubmenu ? '是' : '否'}`);
        if (nav.badge) {
          console.log(`     徽章: ${nav.badge}`);
        }
        console.log('');
      });
    } else {
      console.log('⚠️  没有配置头部导航项目');
      console.log('💡 请登录管理界面，进入"全局设置" → "导航"标签，添加导航项目');
    }
    
    await apos.destroy();
    
  } catch (error) {
    console.error('❌ 检查全局数据时出错:', error);
  }
}

function getNavUrl(nav) {
  if (nav.linkType === 'page' && nav._linkPage && nav._linkPage[0]) {
    return nav._linkPage[0]._url;
  } else if (nav.linkType === 'custom' && nav.linkUrl) {
    return nav.linkUrl;
  } else if (nav.linkType === 'file' && nav._linkFile && nav._linkFile[0]) {
    return nav._linkFile[0]._url;
  }
  return '未设置';
}

checkGlobalData();
