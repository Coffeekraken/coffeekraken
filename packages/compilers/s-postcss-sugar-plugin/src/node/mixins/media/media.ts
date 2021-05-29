import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

class postcssSugarPluginMediaMixinInterface extends __SInterface {
  static definition = {
    query1: {
      type: 'String',
      required: true
    },
    query2: {
      type: 'String'
    },
    query3: {
      type: 'String'
    },
    query4: {
      type: 'String'
    },
    query5: {
      type: 'String'
    },
    query6: {
      type: 'String'
    },
    query7: {
      type: 'String'
    },
    query8: {
      type: 'String'
    },
    query9: {
      type: 'String'
    },
    query10: {
      type: 'String'
    }
  };
}
export { postcssSugarPluginMediaMixinInterface as interface };

/**
 * @name           media
 * @namespace      mixins
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.media >=desktop {
 *      // ...
 * }
 * \@sugar.media tablet {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
  params,
  atRule,
  processNested
}: {
  params: any;
  atRule: any;
  processNested: Function;
}) {
  const mediaConfig = __SugarConfig.get('media');

  return;

  const mediasArray: string[] = [];
  Object.keys(params).forEach((argName) => {
    mediasArray.push(params[argName]);
  });

  const fullQueriesList: string[] = [];

  mediasArray.forEach((query) => {
    const firstChar = query.slice(0, 1);
    const firstTwoChar = query.slice(0, 2);
    const lastChar = query.slice(-1);
    let action = mediaConfig.defaultAction;
    let mediaName = query;

    if (lastChar === '-' || lastChar === '|')
      mediaName = mediaName.slice(0, -1);

    if (
      firstTwoChar === '>=' ||
      firstTwoChar === '<=' ||
      firstTwoChar === '=='
    ) {
      mediaName = mediaName.slice(2);
      action = firstTwoChar;
    } else if (firstChar === '<' || firstChar === '>' || firstChar === '=') {
      mediaName = mediaName.slice(1);
      action = firstChar;
    }

    const mediaQueryConfig = mediaConfig.queries[mediaName];
    if (!mediaQueryConfig)
      throw new Error(
        `<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(
          mediaConfig.queries
        )
          .map((l) => `<green>${l}</green>`)
          .join(',')}`
      );

    const queryList: string[] = [mediaConfig.defaultQuery];

    Object.keys(mediaQueryConfig).forEach((prop) => {
      let value = mediaQueryConfig[prop];
      if (!value) return;

      if (typeof value === 'number') value = `${value}px`;

      if (
        [
          'min-width',
          'max-width',
          'min-device-width',
          'max-device-width'
        ].indexOf(prop) !== -1
      ) {
        if (action === '>') {
          if (prop === 'max-width' || prop === 'max-device-width') {
            let argName = 'min-width';
            if (prop.includes('-device')) argName = 'min-device-width';
            queryList.push(`(${argName}: ${value + 1})`);
          }
        } else if (action === '<') {
          if (prop === 'min-width' || prop === 'min-device-width') {
            let argName = 'max-width';
            if (prop.includes('-device')) argName = 'max-device-width';
            queryList.push(`(${argName}: ${value})`);
          }
        } else if (action === '=') {
          queryList.push(`(${prop}: ${value})`);
        } else if (action === '>=') {
          if (prop === 'min-width' || prop === 'min-device-width') {
            queryList.push(`(${prop}: ${value})`);
          }
        } else if (action === '<=') {
          if (prop === 'max-width' || prop === 'max-device-width') {
            queryList.push(`(${prop}: ${value})`);
          }
        } else {
          queryList.push(`(${prop}: ${value})`);
        }
      } else {
        queryList.push(`(${prop}: ${value})`);
      }
    });

    if (lastChar === '-') {
      queryList.push('(orientation: landscape)');
    } else if (lastChar === '|') {
      queryList.push('(orientation: portrait)');
    }

    fullQueriesList.push(queryList.join(' and '));
  });

  const AST = processNested(`@media ${fullQueriesList.join(',')} {}`);

  // @ts-ignore
  AST.nodes[0].nodes = atRule.nodes;

  atRule.replaceWith(AST);
}
