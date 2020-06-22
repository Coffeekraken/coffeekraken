export default function namespace(namespace, block) {
  let namespaceString = namespace;
  if (block.name) {
    namespaceString = namespace + '.' + block.name;
  }
  if (namespaceString) {
    return '<!-- @namespace: ' + namespaceString + ' -->\n';
  }
  return '';
}
