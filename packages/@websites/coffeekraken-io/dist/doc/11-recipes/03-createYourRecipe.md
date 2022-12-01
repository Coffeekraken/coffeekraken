<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @website/coffeekraken-io

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![downloads](https://shields.io/npm/dm/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![license](https://shields.io/npm/l/@website/coffeekraken-io?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
The frontend toolkit that works for everyone. Experts, professionals and new-comers

<!-- install -->
### Install

```shell
npm i @website/coffeekraken-io

```

<!-- body -->

<!--
/**
* @name            Create your recipe
* @namespace       doc.recipes
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Recipes           /doc/recipes/create-your-recipe
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Create your own recipe

Recipes are what we use to drive a project. It is used to generate a new project, to launch the development environment, build your project, etc...

### Register a new recipe

To register a new recipe, you have to create a new file called `kitchen.config.ts` inside of the `.sugar` folder at your project root. Here's the content of this file:

```js
export default function (env, config) {
  return {
    recipes: {
      myCoolRecipe: {
        title: 'My cool recipe',
        description: 'A recipe that will beat the dark side of the force',
        defaultStack: 'dev',
        stacks: {},
      },
    },
  };
}

```

By doing this, we just registered a new recipe called `myCoolRecipe`.

We just need to tell the `@coffeekraken/cli` CLI that our project make use of our new `myCoolRecipe`. To do so, simply create a `sugar.json` file at your project root with this content:

```js
export default {
  recipe: 'myCoolRecipe',
};

```

We need to understand a little bit more what a recipe is made of...

### What is a recipe exactly?

**Recipes** are made of `stack(s)` and `action(s)`.

A stack is mainly like a "group" of actions that you will be able to execute separatly from each others.

If we take the `default` recipe, it expose `4` stacks which are:

1. `new`: Used to generate a new project
2. `dev`: Development stack
3. `build`: Build your project for production
4. `prod`: Display locally your project with production assets

**Actions** are processes that will be executed just like a command-line for example. They can be a node script as we will see bellow.

To stick with our `default` recipe as an example, the `dev` stack is made of `2` actions which are:

1. `frontendServer`: The frontend server from the `@coffeekraken/s-frontend-server` package to serve views like `blade.php`, `twig`, etc...
2. `vite`: The [ViteJs](https://vitejs.dev/) development server to serve assets like `js/ts` and `css`.

### Register a new `stack`

Back to our recipe. Here's how to register a new `dev` stack into our recipe:

```js
export default function (env, config) {
  return {
    recipes: {
      myCoolRecipe: {
        title: 'My cool recipe',
        description: 'A recipe that will beat the dark side of the force',
        defaultStack: 'dev',
        stacks: {
          dev: {
            title: 'Development stack',
            description: 'Start our development environment',
            runInParallel: false,
            sharedParams: {},
            actions: {},
          },
        },
      },
    },
  };
}

```

### Register a new action

**Actions** are the smaller piece of our recipe. Actions can be things like:

-   Command line
-   Nodejs process represented by a `.js` file that exports a function to execute

Back to our recipe. We will integrate `2` actions which will be a simple command line one, and a node process one which will be detailed bellow.

```js
export default function (env, config) {
  return {
    recipes: {
      myCoolRecipe: {
        title: 'My cool recipe',
        description: 'A recipe that will beat the dark side of the force',
        defaultStack: 'dev',
        stacks: {
          dev: {
            title: 'Development stack',
            description: 'Start our development environment',
            runInParallel: false,
            sharedParams: {},
            actions: {
              installDeps: {
                title: 'Install dependencies',
                description: 'Install our node dependencies using npm',
                command: 'npm install',
              },
              customProcess: {
                title: 'Custom process',
                description: 'My cool custom process',
                process: '/absolute/path/to/myProcess.js',
                params: {
                  something: 'cool',
                },
              },
            },
          },
        },
      },
    },
  };
}

```

### Testing your stack

To test our new recipe `dev` stack, simply type in your cmd

> Make sure you have create the `sugar.json` file as described above before testing your recipe...

```shell
sugar dev

```

At this point, your recipe `dev` stack has to run and throw an error because we don't have created our node process action file...

### Node process file

A node process file is a simply nodejs file that exports a function that will be called when our action is runned.

```js
export default function (params) {
  return new Promise((resolve, reject) => {
    console.log('Hello world');
    console.log(params); // { something: 'cool' }
    // do something...
    resolve();
  });
}

```

This function **MUST** return a `Promise`. Inside it, you can do whatever you need.

> We encourage you to make use of our [@coffeekraken/s-promise](/@coffeekraken/s-promise/doc/readme) extended promise package to make use of his `emit` capabilities in order to log your messages with more control...

```js
import __SPromise from '@coffeekraken/s-promise';

export default function (params) {
  return new __SPromise(({ resolve, reject, emit }) => {
    emit('log', {
      value: 'Hello world',
    });
    // do something...
    resolve();
  });
}

```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
