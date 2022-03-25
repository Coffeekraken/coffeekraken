function description(data, blockSettings) {
  if (Array.isArray(data))
    data = data[0];
  if (data.content && data.content[data.content.length - 1] === "") {
    data.content = data.content.slice(0, -1);
  }
  if (!data.content)
    return "";
  const description2 = new String(data.content.map((c) => c.trim()).join("\n").trim());
  description2.render = true;
  return description2;
}
var description_default = description;
export {
  description_default as default
};
