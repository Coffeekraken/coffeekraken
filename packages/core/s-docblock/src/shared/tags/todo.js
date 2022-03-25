function todo(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = [];
  data.forEach((todo2) => {
    var _a, _b;
    if (!todo2.value)
      return;
    const parts = todo2.value.split(/\s{2,20000}/).map((l) => l.trim());
    const priority = (_a = parts[1]) != null ? _a : "normal", description = new String((_b = parts[0]) != null ? _b : "");
    description.render = true;
    res.push({
      priority,
      description
    });
  });
  return res;
}
var todo_default = todo;
export {
  todo_default as default
};
