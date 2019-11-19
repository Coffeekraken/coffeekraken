export default function author(author) {
  let ret = `Author : ${author.name}`;
  if (author.email) {
    ret += ` [${author.email}](mailto:${author.email})`;
  }
  if (author.url) {
    ret += ` [${author.url}](${author.url})`;
  }
  return `${ret}\n`;
}
