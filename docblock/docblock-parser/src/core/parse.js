import __fs from "fs";
import __path from "path";
import _size from "lodash/size";
import __processExample from "../utils/processExample";

/**
 * Parse the given string to extract the docblock in JSON format
 * @param 	{string}		stringToParse 		The string to extract the docblocks JSON from
 * @param 	{string}		[language=null] 	The language of the string to parse (js, scss, etc...)
 * @return 	{JSON}                 			The docblocks in JSON format
 * @example 	js
 * const docblockParser = require('coffeekraken-docblock-parser');
 * const jsonDocblocks = docblockParser({
 * 	// override some configs here
 * }).parse(myStringToParse);
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function parse(stringToParse, language = null) {
  try {
    let res = [];
    let data = {};
    let inBlock = false;
    let currentTag = null;
    let currentTagValue = [];
    let _analyzeNextLine = false;
    let lines = [];
    let _language = language || this._config.language || "js";

    // split string to into lines
    lines = stringToParse.split("\n");

    // loop through lines
    lines.forEach(line => {
      // if the line is the first line
      // after a docblock
      if (_analyzeNextLine) {
        if (
          this._config.nextLineAnalyzer &&
          this._config.nextLineAnalyzer[_language]
        ) {
          this._config.nextLineAnalyzer[_language](line, data);
        }
        _analyzeNextLine = false;
        return;
      }

      // if we have a new block
      if (line.trim() === "/**") {
        data = {};
        inBlock = true;
        return;
      } else if (line.trim() === "*/") {
        // if we have already a currentTag
        // mean that we have finished to process it
        // and need to add it into result json
        // before handle the next one
        if (currentTag) {
          // check if we have a currentTagValue
          // for the currentTag
          // to add it has a body
          if (currentTagValue.length) {
            if (typeof data[currentTag] === "object") {
              if (currentTag === "example") {
                // process example
                data[currentTag].body = __processExample(
                  currentTagValue.join("\n")
                );
              } else {
                data[currentTag].body = currentTagValue.join("\n");
              }
            } else if (!data.body && currentTagValue.join("\n").trim() !== "") {
              data.body = currentTagValue.join("\n");
            }
          }
          // set the current tag
          currentTagValue = [];
        }

        // we are at the end of the block
        // so we add the data to the res json
        // and reset some variables
        if (_size(data)) {
          res.push(data);
        }
        inBlock = false;
        currentTag = null;
        currentTagValue = [];
        // set that we can analyze the next line
        _analyzeNextLine = true;
        // stop here
        return;
      }

      // if we are not in a docblock
      // we do nothing....
      if (!inBlock) {
        return;
      }

      // replace the version inside the line
      if (line.match(/\{version\}/g)) {
        line = line.replace(/\{version\}/g, this._getVersion());
      }

      // process line
      const rawLine = line;
      line = line
        .trim()
        .substr(1)
        .trim()
        .replace(/\t+/g, "\t");

      // check if the line is a tag one
      if (line.substr(0, 1) === "@") {
        // if we have already a currentTag
        // mean that we have finished to process it
        // and need to add it into result json
        // before handle the next one
        if (currentTag && currentTagValue.length) {
          // check if we have a currentTagValue
          // for the currentTag
          // to add it has a body
          if (typeof data[currentTag] === "object") {
            if (currentTag === "example") {
              // process example
              data[currentTag].body = __processExample(
                currentTagValue.join("\n")
              );
            } else {
              data[currentTag].body = currentTagValue.join("\n");
            }
          } else if (!data.body && currentTagValue.join("\n").trim() !== "") {
            data.body = currentTagValue.join("\n");
          }
          // set the current tag
          currentTagValue = [];
        }

        // split the line by tabs
        const splits = line.split(/\t|[\s]{2,}/).map(item => {
          return item.trim();
        });
        // get the tag name
        let name = splits[0].trim().substr(1);
        // unshift the name of the splits
        splits.shift();
        // process the line
        if (this._config.tags[`@${name}`]) {
          this._config.tags[`@${name}`](name, splits, data, _language);
        } else {
          // just set that we have this tag
          if (splits.length === 1) {
            data[name] = splits[0];
          } else if (splits.length) {
            data[name] = splits;
          } else {
            data[name] = true;
          }
          // we do not handle this tag name
          return;
        }
        currentTag = name;
        return;
      } else {
        // the line is not a tag one
        currentTagValue.push(rawLine.trim().replace(/^\t*\*\s?/, ""));
        if (!currentTag) {
          currentTag = "description";
        }
      }
    });
    // return the result
    return res;
  } catch (e) {
    console.error("e", e);
  }
}
