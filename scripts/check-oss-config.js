/*
 * 阿里云OSS配置检查脚本
 * 用于验证OSS配置是否正确
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载环境变量
dotenv.config({ path: join(__dirname, '..', '.env') });

console.log('\n🔍 阿里云OSS配置检查\n');
console.log('='.repeat(50));

// 必需的配置项
const requiredConfigs = {
  'APOS_S3_BUCKET': {
    value: process.env.APOS_S3_BUCKET,
    description: 'OSS Bucket名称',
    example: 'my-website-assets'
  },
  'APOS_S3_KEY': {
    value: process.env.APOS_S3_KEY,
    description: 'OSS AccessKey ID',
    example: 'LTAI5tAbCdEfGhIjKlMnO',
    masked: true
  },
  'APOS_S3_SECRET': {
    value: process.env.APOS_S3_SECRET,
    description: 'OSS AccessKey Secret',
    example: 'AbCdEfGhIjKlMnOpQrStUvWxYz1234567',
    masked: true
  },
  'APOS_S3_ENDPOINT': {
    value: process.env.APOS_S3_ENDPOINT,
    description: 'OSS Endpoint',
    example: 'https://oss-cn-hangzhou.aliyuncs.com'
  }
};

// 可选的配置项
const optionalConfigs = {
  'APOS_S3_REGION': {
    value: process.env.APOS_S3_REGION,
    description: 'OSS Region',
    example: 'oss-cn-hangzhou'
  },
  'APOS_CDN_URL': {
    value: process.env.APOS_CDN_URL,
    description: 'CDN URL',
    example: 'https://cdn.yourdomain.com'
  }
};

let hasErrors = false;
let warnings = 0;

// 检查必需配置
console.log('\n📋 必需配置检查:\n');

for (const [key, config] of Object.entries(requiredConfigs)) {
  const status = config.value ? '✅' : '❌';
  const displayValue = config.value 
    ? (config.masked ? maskString(config.value) : config.value)
    : '未设置';
  
  console.log(`${status} ${config.description} (${key})`);
  console.log(`   当前值: ${displayValue}`);
  
  if (!config.value) {
    console.log(`   ⚠️  需要设置，示例: ${config.example}`);
    hasErrors = true;
  }
  console.log();
}

// 检查可选配置
console.log('\n📋 可选配置检查:\n');

for (const [key, config] of Object.entries(optionalConfigs)) {
  const status = config.value ? '✅' : '⚪';
  const displayValue = config.value || '未设置（可选）';
  
  console.log(`${status} ${config.description} (${key})`);
  console.log(`   当前值: ${displayValue}`);
  
  if (!config.value) {
    console.log(`   💡 建议设置，示例: ${config.example}`);
    warnings++;
  }
  console.log();
}

// 配置验证
console.log('='.repeat(50));
console.log('\n🔍 配置验证:\n');

// 验证Endpoint格式
if (requiredConfigs.APOS_S3_ENDPOINT.value) {
  const endpoint = requiredConfigs.APOS_S3_ENDPOINT.value;
  if (!endpoint.startsWith('https://')) {
    console.log('⚠️  警告: Endpoint应该使用HTTPS协议');
    warnings++;
  }
  if (!endpoint.includes('aliyuncs.com')) {
    console.log('⚠️  警告: Endpoint似乎不是阿里云OSS的域名');
    warnings++;
  }
}

// 验证Region和Endpoint是否匹配
if (optionalConfigs.APOS_S3_REGION.value && requiredConfigs.APOS_S3_ENDPOINT.value) {
  const region = optionalConfigs.APOS_S3_REGION.value;
  const endpoint = requiredConfigs.APOS_S3_ENDPOINT.value;
  
  if (!endpoint.includes(region)) {
    console.log('⚠️  警告: Region与Endpoint可能不匹配');
    console.log(`   Region: ${region}`);
    console.log(`   Endpoint: ${endpoint}`);
    warnings++;
  }
}

// 检查.env文件是否存在
try {
  const fs = await import('fs');
  const envPath = join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.log('\n❌ .env文件不存在');
    console.log('   请创建.env文件并配置OSS参数');
    console.log('   参考: OSS_QUICK_START.md');
    hasErrors = true;
  }
} catch (error) {
  console.log('\n⚠️  无法检查.env文件:', error.message);
}

// 总结
console.log('\n' + '='.repeat(50));
console.log('\n📊 检查结果:\n');

if (hasErrors) {
  console.log('❌ 配置不完整，请补充必需的配置项');
  console.log('\n📚 配置指南:');
  console.log('   - 快速开始: OSS_QUICK_START.md');
  console.log('   - 详细说明: OSS_CONFIGURATION.md');
  console.log('\n');
  process.exit(1);
} else if (warnings > 0) {
  console.log(`✅ 必需配置已完成，但有 ${warnings} 个建议项`);
  console.log('   您可以继续使用，但建议补充可选配置以获得更好的体验');
  console.log('\n');
  process.exit(0);
} else {
  console.log('✅ 所有配置都已正确设置！');
  console.log('\n🚀 现在可以启动应用: npm run dev');
  console.log('\n');
  process.exit(0);
}

// 辅助函数：掩码显示敏感信息
function maskString(str) {
  if (!str || str.length < 8) {
    return '***';
  }
  const start = str.substring(0, 4);
  const end = str.substring(str.length - 4);
  const middle = '*'.repeat(Math.min(str.length - 8, 20));
  return `${start}${middle}${end}`;
}

