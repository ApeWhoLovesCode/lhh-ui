/** 经过多少次计算后，获取fps */
export const getScreenFps = (total: number = 60): Promise<number> => {
  return new Promise(resolve => {
    if(typeof requestAnimationFrame === 'undefined') {
      return resolve(60)
    }
    const begin = Date.now();
    let count = 0;
    (function run() {
      requestAnimationFrame(() => {
        if (++count >= total) {
          const fps = Math.ceil((count / (Date.now() - begin)) * 1000)
          return resolve(fps)
        }
        run()
      })
    })()
  })
}