const __Lipsum = require('lorem-ipsum').LoremIpsum;
const __classname = require('../../../../css/classname');
const __sugarConfig = require('../../../../config/sugar');

const __lipsum = new __Lipsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

module.exports = {
  tf: {
    class: __classname(__sugarConfig('typography.text-format-scope-class'))
  },
  h1: {
    class: __classname('h1'),
    value: __lipsum.generateWords(5)
  },
  h2: {
    class: __classname('h1'),
    value: __lipsum.generateWords(5)
  },
  h3: {
    class: __classname('h1'),
    value: __lipsum.generateWords(5)
  },
  h4: {
    class: __classname('h1'),
    value: __lipsum.generateWords(5)
  },
  h5: {
    class: __classname('h1'),
    value: __lipsum.generateWords(5)
  },
  h6: {
    class: __classname('h1'),
    value: __lipsum.generateWords(5)
  }
};
