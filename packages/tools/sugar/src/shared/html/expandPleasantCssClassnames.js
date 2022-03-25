import __expandPleasantCssClassname from "./expandPleasantCssClassname";
function expandPleasantCssClassnames(html) {
  const reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;
  const matches = html.match(reg);
  if (!matches)
    return html;
  matches.forEach((match) => {
    const classesStr = match.trim().replace('class="', "").replace('"', "");
    const newClassesStr = __expandPleasantCssClassname(classesStr);
    html = html.replace(match, `class="${newClassesStr}"`);
  });
  const escapedReg = /class=".*\\:.*/gm;
  const escapedMatches = html.match(escapedReg);
  if (escapedMatches && escapedMatches.length) {
    escapedMatches.forEach((match) => {
      const newClass = match.replace("\\:", ":");
      html = html.replace(match, newClass);
    });
  }
  return html;
}
export {
  expandPleasantCssClassnames as default
};
