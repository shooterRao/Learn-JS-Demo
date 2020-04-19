// 观察者模式
// 一种一对多的依赖，当一个对象的状态发生改变时，所以依赖它的对象都将得到通知

// demo
class Observer {
  constructor() {
    this.subs = [];
  }

  subscribe(target, cb) {
    target.subs.push(cb);
  }

  publish() {
    this.subs.forEach(sub => sub());
  }
}

const ob1 = new Observer();
const ob2 = new Observer();
const ob3 = new Observer();

ob2.subscribe(ob1, function() {
  console.log('ob2 添加了对 ob1 的依赖，ob1 通知了我会响应');
});

ob3.subscribe(ob1, function() {
  console.log('ob3 添加了对 ob1 的依赖，ob1 通知了我会响应');
});

ob1.publish(); // ob1 发通知了

let target = null; // 指向 watcher

const dep = {
  subs: [], // 订阅者
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  },
  addSubs(watcher) {
    this.subs.push(watcher);
  },
  depend() {
    if (target) {
      target.addDep(this);
    }
  }
};

const watcher = {
  deps: [], // 发布者
  update() {
    console.log('updated');
  },
  addDep(dep) {
    this.deps.push(dep);
    dep.addSubs(this);
  }
};

target = watcher;
dep.depend();
dep.notify();

// 发布-订阅
// 发布-订阅 是观察者的升级版
// 发布-订阅 拥有一个调度中心
// 如果用 发布-订阅 ，上面 Observer 类的 subscribe 和 publish 方法都在 observer 对象(调度中心) 进行管理

const observer = {
  subs: Object.create(null),
  subscribe(type, cb) {
    (this.subs[type] || (this.subs[type] = [])).push(cb);
  },
  publish(type, ...args) {
    (this.subs[type] || []).forEach(cb => cb.apply(null, args));
  }
};

observer.subscribe('ob', function() {
  console.log('ob 事件被订阅了，可以发布');
});

observer.subscribe('obob', function() {
  console.log('obob 事件被订阅了，可以发布');
});

observer.publish('ob');
observer.publish('obob');
