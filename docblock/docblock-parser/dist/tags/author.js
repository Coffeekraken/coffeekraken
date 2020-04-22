"use strict";

/**
 * @name              author
 * @namespace         src.tags
 * @type              Function
 * 
 * Parse the author tag
 * 
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
module.exports = function author(data) {
  const authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(data.value);
  return {
    name: authorNfo[1],
    email: authorNfo[2],
    website: authorNfo[3]
  }; // parse the line
  // const authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(
  //   splits[0]
  // );
};