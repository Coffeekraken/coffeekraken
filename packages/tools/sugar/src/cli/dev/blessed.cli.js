const __SBlessedProcessOutput = require('../../node/process/output/blessed/SBlessedProcessOutput');
const __SPromise = require('../../node/promise/SPromise');
const __wait = require('../../node/time/wait');

module.exports = async (stringArgs = '') => {
  const promise = new __SPromise();
  const output = new __SBlessedProcessOutput(promise, {
    attach: true
  });

  promise.trigger('log', {
    value: 'Hello world'
  });

  promise.trigger(
    'log',
    '[--type group --title "hello world"] Daily daily day'
  );

  await __wait(1000);

  promise.trigger('log', {
    metas: {
      time: true,
      content: '<yellow>node</yellow>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<yellow>node</yellow>'
    },
    type: 'warning',
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });

  promise.trigger('log', {
    metas: {
      time: true,
      content: '<yellow>node</yellow>'
    },
    value: 'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf'
  });

  promise.trigger('log', {
    metas: {
      time: true,
      content: '<yellow>node</yellow>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });

  await __wait(1000);

  promise.trigger('log', {
    // clear: true,
    metas: {
      time: true,
      content: '<cyan>ts</cyan>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<yellow>node</yellow>'
    },
    type: 'error',
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<yellow>node</yellow>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<cyan>ts</cyan>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<cyan>ts</cyan>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<magenta>ts</magenta>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<magenta>ts</magenta>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<magenta>ts</magenta>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    metas: {
      time: true,
      content: '<magenta>ts</magenta>'
    },
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
  promise.trigger('log', {
    value:
      'FOIj wofij pwje fjw iofjwe ojf wijf owje pj wqjpf piwjpfeiowj epjf qw98ejf 0q9wiej fop qweifj oqpwjef poqjwie foijpw eofijq weofj qwopejfpwejhf iuqwje ifjh wqioejf iowje foijw efopj qweojf qopwjef oiwj'
  });
};
