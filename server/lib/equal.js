function equal(first, second) {
  const firstLength = first.length;
  const secondLength = second.length;
  let length = 0;
  if (firstLength > secondLength) {
    length = firstLength;
  } else if (secondLength > firstLength) {
    length = secondLength;
  } else if (firstLength === secondLength) {
    length = firstLength;
  }
  for (let i = 0; i < length; i++) {
    console.log('first', first[i]);
    console.log('second', second[i]);
    if (first[i] !== second[i]) {
      console.log('first !== second', false);
      return false;
    }
  }
  return true;
}

module.exports = equal;
