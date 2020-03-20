const __deepMerge = require('../object/deepMerge');

/**
 * @name                            replaceTags
 * @namespace                       sugar.node.html
 * @type                            Function
 *
 * Replace all the html tags that you specify by something else that you can fully choose.
 * Settings:
 * - stripOtherTags (true) {Boolean}: Specify if you want to strip all the tags not present in the "tags" object
 *
 * @param               {String}                 text                           The text in which replace all the tags
 * @param               {Object}                 tags                           An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content
 * @param               {Object}                 [settings={}]                  An object of settings described above
 * @return              {String}                                                The new text
 *
 * @example             js
 * const replaceTags = require('@coffeekraken/sugar/node/html/replaceTags');
 * replaceTags('<span>Hello</span> world', {
 *    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function replaceTags(text, tags, settings = {}) {

  settings = __deepMerge({
    stripOtherTags: true
  }, settings);

  let oneLineText = text.replace(/\r\n/g, '|rn|');
  oneLineText = oneLineText.replace(/\n/g, '|n|');
  oneLineText = oneLineText.replace(/\r/g, '|r|');

  // get the array of all the present html tags in the text
  const htmlTagsReg = /(<([^>]+)>)/ig;
  let presentTags = text.match(htmlTagsReg);
  presentTags = [...new Set(presentTags)].map(t => {
    t = t.replace(/^<\/?/, '').replace(/\/>$/, '').replace(/>$/, '');
    t = t.split(/\s+/);
    return t[0].trim();
  });
  presentTags = [...new Set(presentTags)];

  // loop on the tags
  presentTags.forEach((tagName) => {

    // create the match regex
    const reg = new RegExp(`<\s*${tagName}[^>]*>((.*?))<\\s*\/\\s*${tagName}>`, 'g');
    // const reg = new RegExp(`<\s*${tagName}[^>]*>(([\S\s]+)?)<\\s*\/\\s*${tagName}>`, 'g');
    const tagsArray = oneLineText.match(reg);

    const singleReg = new RegExp(`\\s?<${tagName}\\s?\/>\\s?`, 'g');
    const singleTagsArray = oneLineText.match(singleReg);

    if (tagsArray) {
      for (let i = 0; i < tagsArray.length; i++) {
        const t = tagsArray[i];
        const tagArgs = t.match(`<\\s*${tagName}[^>]*>((.*?))<\\s*\/\\s*${tagName}>`);
        if (!tagArgs) continue;
        const tagToReplace = tagArgs[0];
        const tagContent = tagArgs[1];

        // call the replacement function
        if (tags[tagName]) {
          oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
        } else {
          // if the tag is not present in the tags object, check if we need to strip it or not...
          if (settings.stripOtherTags) {
            oneLineText = oneLineText.replace(tagToReplace, tagContent);
          }
        }
      }
    }

    if (singleTagsArray) {
      for (let i = 0; i < singleTagsArray.length; i++) {
        const t = singleTagsArray[i];
        const tagArgs = t.match(`\\s?<${tagName}\\s?\/>\\s?`);
        if (!tagArgs) continue;
        const tagToReplace = tagArgs[0];
        const tagContent = '';

        // call the replacement function
        if (tags[tagName]) {
          oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
        } else {
          // check if we need to strip all the other tags
          if (settings.stripOtherTags) {
            oneLineText = oneLineText.replace(tagToReplace, tagContent);
          }
        }
      }
    }

  });

  oneLineText = oneLineText.replace(/\|rn\|/g, '\r\n');
  oneLineText = oneLineText.replace(/\|n\|/g, '\n');
  oneLineText = oneLineText.replace(/\|r\|/g, '\r');

  return oneLineText;

};
