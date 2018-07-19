function toggle(...actions){
  return function(...args){
    let action = actions.shift();
    actions.push(action);
    return action.apply(this, args);
  }
}

switcher.onclick = toggle(
  evt => evt.target.className = 'warn',
  evt => evt.target.className = 'off',
  evt => evt.target.className = 'on'
);