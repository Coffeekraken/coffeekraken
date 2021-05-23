// @ts-nocheck

import { SupportLanguage, Parser, Printer } from 'prettier';
import { print } from './print';
import { ASTNode } from './print/nodes';
import { embed } from './embed';
import { snipScriptAndStyleTagContent } from './lib/snipTagContent';
import { compile as __riotCompile } from '@riotjs/compiler';

function locStart(node: any) {
  return node.start;
}

function locEnd(node: any) {
  return node.end;
}

export const languages: Partial<SupportLanguage>[] = [
  {
    name: 'riot',
    parsers: ['riot'],
    extensions: ['.riot'],
    vscodeLanguageIds: ['riot']
  }
];

export const parsers: Record<string, Parser> = {
  riot: {
    parse: (text) => {
      try {
        const parsed = __riotCompile(text);
        console.log(parsed.meta.fragments);

        return <ASTNode>{
          // ...require(`svelte/compiler`).parse(text),
          __isRoot: true
        };
      } catch (err) {
        if (err.start != null && err.end != null) {
          // Prettier expects error objects to have loc.start and loc.end fields.
          // Svelte uses start and end directly on the error.
          err.loc = {
            start: err.start,
            end: err.end
          };
        }

        throw err;
      }
    },
    preprocess: (text, options) => {
      text = snipScriptAndStyleTagContent(text);
      text = text.trim();
      // Prettier sets the preprocessed text as the originalText in case
      // the Svelte formatter is called directly. In case it's called
      // as an embedded parser (for example when there's a Svelte code block
      // inside markdown), the originalText is not updated after preprocessing.
      // Therefore we do it ourselves here.
      options.originalText = text;
      return text;
    },
    locStart,
    locEnd,
    astFormat: 'riot-ast'
  }
};

export const printers: Record<string, Printer> = {
  'riot-ast': {
    print,
    embed
  }
};

export { options } from './options';
