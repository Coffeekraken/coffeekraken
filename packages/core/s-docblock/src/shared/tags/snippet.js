function snippet(data, blockSettings) {
  if (data.content && data.content[data.content.length - 1] === "") {
    data.content = data.content.slice(0, -1);
  }
  return {
    language: typeof data.value === "string" ? data.value.toLowerCase() : data.value,
    code: Array.isArray(data.content) ? data.content.join("\n") : data.content
  };
}
var snippet_default = snippet;
export {
  snippet_default as default
};
