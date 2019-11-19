let _titleLevel = 1;
export default function titleLevel(add = null) {
  if (add !== null) {
    _titleLevel += add;
  }
  if (_titleLevel < 1) _titleLevel = 1;
  // return level
  return _titleLevel;
}
