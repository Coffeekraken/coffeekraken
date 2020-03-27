const __fs = require("fs");

const __SLayout = require('@coffeekraken/sugar/node/terminal/SLayout');
const __SFiltrableList = require('@coffeekraken/sugar/node/terminal/SFiltrableList');

/**
 * @name                                DefaultPage
 * @namespace                           cli.node.pages
 * @type                                Class
 *
 * Provide a default page layout to display a project informations
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class DefaultLayout extends __SLayout {

  constructor(data) {
    super();

    const list = new __SFiltrableList({
      input: {
        focused: true
      },
      onSelect: selected => {
        console.log(selected);
      },
      // items: [
      //   'hello',
      //   'world',
      //   'coco',
      //   'fwefwef wef we fwe f',
      //   'fwefewfwefwef',
      //   'wefwef',
      //   'eee',
      //   'ijoi jqioj oijqwdioj qwoidj qowdijpqiwdj o iqpjwdoj qpowdj qioj doiqj wdoqj widoj qoiwdj qoiwjd ioqjwdoiqj wdoiqjwoidjwq',
      //   'ewfwefqiuhjwefiuwheifuhew ifhuweif',
      //   'wqfiuhjw fiuhw uihf '
      // ]
      items: {
        hello: {
          _sFiltrableListValue: true,
          world: 'Comment ça va ?',
          coco: 'Integer mauris metus, efficitur eget gravida id, dignissim ut felis.',
          yop: 'Integer mauris metus, efficitur eget gravida id, dignissim ut felis.'
        },
        family: {
          olivier: 'iwjf oiwej fiowfweifjwoei',
          sébastien: 'Integer mauris metus, efficitur eget gravida id, dignissim ut felis.',
          gisele: 'qwoidjfwe oifjwioefj owej foiwejf',
          fanny: 'wfiojweifj woefj iwoejf '
        },
        world: {
          monique: 'wefiwj efoijw oeifjwoefjiwojefoiwejf',
          bernard: 'weifojw eifj woief oweijf',
          camille: 'wfiwjefoiwejfoiwef',
          valentin: 'wefwoijefwoiejfoiwjefowe'
        }
      }
    });

    this.append(list);

  }

};