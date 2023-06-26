import { defineConfig } from 'dumi';

export default defineConfig({
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
    atomDirs: [
      {type: 'components', dir: './src'},
      {type: 'hooks', dir: './src/hooks'},
    ]
  },
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'lhh-ui',
    logo: '/logo.png', // 读取public文件夹
    nav: [
      { title: '文档', link: '/guide' },
      { title: '组件', link: '/components/slider-puzzle' },
      { title: 'Hooks', link: '/hooks/use-keep-interval' },
    ],
    socialLinks: {
      github: 'https://github.com/ApeWhoLovesCode/lhh-ui'
    }
  },
});
