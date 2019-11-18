export default function processExample(example) {
  // replace the \@ used in certain languages
  example = example.replace(/\\@/g, "@");
  // replace the \/ used in certain languages for docblocks inside examples
  example = example.replace(/\\\/\*/g, "/*").replace(/\*\\\//g, "*/");
  // trim
  example = example.trim();
  // return result
  return example;
}
