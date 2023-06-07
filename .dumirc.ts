import { defineConfig } from 'dumi';

export default defineConfig({
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/slider-puzzle/index.tsx',
  },
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'lhh-ui',
  },
});
