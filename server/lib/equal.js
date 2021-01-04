function equal(first, second) {
  const length = Math.max(first.length, second.length);

  for (let i = 0; i < length; i++) {
    if (first[i] !== second[i]) {
      return false;
    }
  }
  return true;
}

module.exports = equal;
