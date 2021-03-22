function sub(a, b) {
    return a - b;
}


test('adds 1 - 2 to equal -1', () => {
  expect(sub(1, 2)).toBe(-1);
});