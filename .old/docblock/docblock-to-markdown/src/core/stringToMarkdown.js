import _merge from "lodash/merge";
import __docblockParser from "@coffeekraken/docblock-parser";
import __docblockJsonToMarkdown from "@coffeekraken/docblock-json-to-markdown";
export default function stringToMarkdown(stringToTransform, language = "js") {
  // parse the string
  const json = __docblockParser(
    _merge(
      {
        language
      },
      this._config.docblockParser
    )
  ).parse(stringToTransform);

  // transform to markdown
  const markdown = __docblockJsonToMarkdown(
    _merge(
      {
        language
      },
      this._config.docblockJsonToMarkdown
    )
  ).jsonToMarkdown(json);
  // return the markdown
  return markdown;
}
