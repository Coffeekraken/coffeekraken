module.exports = (path) => {
  let p = path.replace('<rootDir>', process.env.ROOT_DIR || '').replace('//','/');
  if (p.charAt(0) === '/') p = p.slice(1);
  return p;
}
