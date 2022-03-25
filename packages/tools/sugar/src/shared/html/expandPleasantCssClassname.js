function expandPleasantCssClassname(classesStr) {
  const classesArray = [];
  const classNames = classesStr.split(/\s+/);
  let currentMedia = "";
  classNames.forEach((className) => {
    if (className.slice(0, 1) == "@") {
      currentMedia = className.replace("@", "___");
      return;
    }
    const parts = className.split(":");
    if (parts.length === 1) {
      let name = className;
      if (currentMedia !== "")
        name = className + currentMedia;
      classesArray.push(name);
    } else {
      const firstClass = parts[0];
      let name = firstClass;
      if (currentMedia !== "")
        name = firstClass + currentMedia;
      classesArray.push(name);
      parts.forEach((part, i) => {
        if (i > 0) {
          name = firstClass + "--" + part;
          if (currentMedia !== "")
            name = name + currentMedia;
          classesArray.push(name);
        }
      });
    }
  });
  return classesArray.join(" ");
}
export {
  expandPleasantCssClassname as default
};
