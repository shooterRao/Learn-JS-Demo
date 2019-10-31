function fn() {
  try {
    throw new Error('error');
  } catch (error) {
    console.log(error);
    return;
  }
  console.log(123);
}

fn();