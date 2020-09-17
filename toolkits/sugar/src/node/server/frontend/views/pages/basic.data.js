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

const data = {
  tf: {
    class: __classname(__sugarConfig('typography.text-format-class'))
  },
  sections: {
    titles: {
      title: 'Titles',
      description: 'All the available titles in your project',
      samples: {}
    },
    paragraphs: {
      title: 'Paragraphs',
      description: 'All the available paragraphs in your project',
      samples: {}
    }
  }
};

const titlesObj = __sugarConfig('typography.titles');
Object.keys(titlesObj).forEach((name) => {
  data.sections.titles.samples[name] = {
    class: __classname(name),
    value: __lipsum.generateWords(5),
    code: `<${name} class="${__classname(`${name}`)}">${__lipsum.generateWords(
      5
    )}</${name}>`
  };
});

const paragraphsObj = __sugarConfig('typography.paragraphs');
Object.keys(paragraphsObj).forEach((name) => {
  data.sections.paragraphs.samples[name] = {
    class: __classname(name),
    value: __lipsum.generateParagraphs(1),
    code: `<p class="${__classname(
      `p--${name}`
    )}">${__lipsum.generateParagraphs(1)}</p>`
  };
});

module.exports = data;
