export default function renderBlock(block) {
  // mark the block as done
  if (block._done) return;
  block._done = true;
  // update the title level
  this._titleLevel(+1);
  // loop on each tags in the block
  const ret = [];
  for (let key in block) {
    const value = block[key];
    const tagRendered = this._renderTag(key, value);
    if (!tagRendered) continue;
    if (key === "name") {
      ret.unshift(tagRendered);
    } else {
      ret.push(tagRendered);
    }
  }
  // decrease title level
  this._titleLevel(-1);
  // return rendered blocks
  return ret.join("\n");
}
