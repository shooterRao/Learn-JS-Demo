// 检查app是否打开
function checkOpen(cb) {
  const clickTime = +(new Date());
  function check(elsTime) {
      if (elsTime > 3000 || document.hidden || document.webkitHidden) {
          cb(true);
      } else {
          cb(false);
      }
  }
  // 启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
  let count = 0;
  let intHandle = null;
  intHandle = setInterval(() => {
      count++;
      const elsTime = +(new Date()) - clickTime;
      if (count >= 100 || elsTime > 3000) {
          clearInterval(intHandle);
          check(elsTime);
      }
  }, 20);
}
/**
* 唤起app
* @param {any} uri  app schema
* @param {any} fallback  唤起失败回调
*/
function openApp(uri, fallback) {
  const ifr = document.createElement('iframe');
  ifr.src = uri;
  ifr.style.display = 'none';
  if (fallback) {
      checkOpen((opened) => {
          if (!opened) {
              fallback();
          }
      });
  }
  document.body.appendChild(ifr);
  setTimeout(() => {
      document.body.removeChild(ifr);
  }, 2000);
}