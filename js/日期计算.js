class Datee {
  constructor() {
    this.currentList = [];
    this.currentFirstDate = null;
    this.currentDate = new Date();
  }

  formatDate(nowDate) {
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let date = nowDate.getDate();
    let week = ['日', '一', '二', '三', '四', '五', '六'][nowDate.getDay()];
    return {
      week,
      showDate: date,
      listDate: `${month}月${date}日 ${week}`,
      sendDate: `${year}-${month}-${date}`,
      now: nowDate.toLocaleDateString() === new Date().toLocaleDateString()
    };
  }

  // 获取当周的第一天
  setCurrentFirstDate(date) {
    const week = date.getDay();
    // week * -1 是前面 n 天，也就是第0天（周日）
    // 获取前面 n 天的时间，week 为星期二就获取前面2天，即为星期日
    this.currentFirstDate = this.getDate(date, week * -1);
  }

  set currentDate(date) {
    this.setCurrentFirstDate(date);
    this.now();
  }

  // 获取某个日期
  getDate(date, n) {
    // 设置日期
    date.setDate(date.getDate() + n);
    return date;
  }

  now() {
    const now = this.getWeek();
    // 获取前面7天
    const pre = this.getLastWeek(1)
    // 获取后面7天
    const next = this.getNextWeek(1);
    this.currentList = [pre, now, next];
  }

  // 获取某一周的时间
  /**
   * @param {Date} date 这周的周日日期
   * @returns {Array} []
   */
  getWeek(date = new Date(this.currentFirstDate)) {
    const list = [];
    for (let i = 0; i < 7; i++) {
      list.push(
        this.formatDate(
          i === 0 ? this.getDate(date, 0) : this.getDate(date, 1)
        )
      );
    }
    return list;
  }

  // 获取上n周的日期
  getLastWeek(n) {
    const currentFirstDate = new Date(this.currentFirstDate);
    const lastWeekFirstDate = this.getDate(currentFirstDate, -7 * n);
    return this.getWeek(lastWeekFirstDate);
  }

  // 获取下n周的日期
  getNextWeek(n) {
    const currentFirstDate = new Date(this.currentFirstDate);
    const nextWeekFirstDate = this.getDate(currentFirstDate, 7 * n);
    return this.getWeek(nextWeekFirstDate);
  }

  setNowDate(nowDate) {
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let date = nowDate.getDate();
    return `${year}-${month}-${date}`;
  }
}

const date = new Datee()

// date.currentDate = new Date('2019/09/14')

console.log(date.currentFirstDate);

console.log(date.currentList);
