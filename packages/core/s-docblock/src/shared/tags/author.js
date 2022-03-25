function author(data, blockSettings) {
  const authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(data.value);
  if (!authorNfo)
    return null;
  return {
    name: authorNfo[1],
    email: authorNfo[2],
    url: authorNfo[3]
  };
}
var author_default = author;
export {
  author_default as default
};
