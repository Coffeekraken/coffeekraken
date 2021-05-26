// @ts-nocheck

import { SupportOption } from 'prettier';

declare module 'prettier' {
  interface RequiredOptions extends PluginOptions {}
}

export interface PluginOptions {}

function makeChoice(choice: string) {
  return { value: choice, description: choice };
}

export const options: Record<keyof PluginOptions, SupportOption> = {
  svelteSortOrder: {
    since: '0.6.0',
    category: 'Svelte',
    type: 'choice',
    default: 'options-scripts-markup-styles',
    description: 'Sort order for scripts, markup, and styles',
    choices: [
      makeChoice('scripts-markup-styles'),
      makeChoice('scripts-styles-markup'),
      makeChoice('styles-markup-scripts'),
      makeChoice('styles-scripts-markup'),
      makeChoice('markup-styles-scripts'),
      makeChoice('markup-scripts-styles')
    ]
  }
};

export type SortOrder =
  | 'scripts-markup-styles'
  | 'scripts-styles-markup'
  | 'markup-styles-scripts'
  | 'markup-scripts-styles'
  | 'styles-markup-scripts'
  | 'styles-scripts-markup';

export type SortOrderPart = 'scripts' | 'markup' | 'styles';

const sortOrderSeparator = '-';

export function parseSortOrder(sortOrder: SortOrder): SortOrderPart[] {
  const order = sortOrder.split(sortOrderSeparator) as SortOrderPart[];
  return order;
}
