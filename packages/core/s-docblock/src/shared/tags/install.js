function install(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  data = data.map((item) => {
    if (item.content && item.content[item.content.length - 1] === "") {
      item.content = item.content.slice(0, -1);
    }
    if (!item.content)
      return null;
    const parts = item.value.split(/\s{2,20000}/).map((l) => l.trim());
    const result = {
      language: parts[0],
      title: parts[1],
      description: parts[2],
      code: Array.isArray(item.content) ? item.content.join("\n").trim().replace(/\\@/, "@") : item.content.replace(/\\@/, "@")
    };
    if (result.title) {
      result.title = new String(result.title);
      result.title.render = true;
    }
    if (result.description) {
      result.description = new String(result.description);
      result.description.render = true;
    }
    return result;
  }).filter((item) => item !== null);
  return data;
}
var install_default = install;
export {
  install_default as default
};
