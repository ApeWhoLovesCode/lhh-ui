import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    output: 'dist',
    // 忽略这些文件的打包
    ignores: ['src/demo/**'],
  },
});
