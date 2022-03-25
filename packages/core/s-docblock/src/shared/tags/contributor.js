function contributor(data, blockSettings) {
  data = Array.from(data);
  const contributors = [];
  data.forEach((d) => {
    const contributorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(d.value);
    if (!contributorNfo)
      return null;
    contributors.push({
      name: contributorNfo[1],
      email: contributorNfo[2],
      url: contributorNfo[3]
    });
  });
  return contributors;
}
var contributor_default = contributor;
export {
  contributor_default as default
};
