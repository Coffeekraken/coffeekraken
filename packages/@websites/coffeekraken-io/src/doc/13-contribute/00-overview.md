<!--
/**
 * @name            Overview
 * @namespace       doc.contribute
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Contribute           /doc/contribute/overview
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Contribute

Happy to see you here! This mean that you have the interest and motivation to help us making Coffeekraken even better!

## Where is Coffeekraken stored

Our toolchain is stored in a monorepository that you can find [HERE](https://github.com/coffeekraken/coffeekraken). The first step will be to fork it and clone your fork locally using this command:

```bash
git clone ...
```

> For more informations about how to work on Coffeekraken and send your code back to the main project, please [check this page](/doc/contribute/git).

## How is Coffeekraken structured

Now that you have the files, let's take a look at the folder structure:

```bash
| package.json
| src # monorepo sources
| packages
 ----
     | {category} # group packages into categories
      ----
          | {package} # each packages
           ----
               | package.json
               | docmap.json
               | sugar.json
               | .local # local files like cache, etc...
               | dist # same as the "src" but with builded files
               | src
                ----
                    | cli # optional
                    | config #optional
                    | css # optional
                    | doc # optional
                    | favicon # optional
                    | fonts # optional
                    | icons # optional
                    | img # optional
                    | js # browser js
                     ----
                         | exports.ts # entry point for your browser stuffs
                    | node # node js
                     ----
                         | exports.ts # entry point for your node struffs
                    | shared # shared node/browser stuffs
                     ----
                         | exports.ts # entry point for your shared struffs
                    | pages # optional
                    | views # optional
```

Each packages are stored inside a structure of 3 levels. **/packages/{category}/{package}**.
This allows us to manage theme easily and for example, publish them using our 1 like command `sugar mono.publish`.

> When working on Coffeekraken, make sure to respect this folder structure.

## Installing dependencies

In order to work in a monorepo, you will had to install the dependencies, but **NOT in each packages**... That would be very hard and this will not handle cross packages linking.

What we want is to work on any of our packages and that they reference themselves automatically.

Thanks **Yarn**! I know... NPM has some support for that as well but here, we will work with `yarn`.

First of all, make sure to have [yarn installed](https://yarnpkg.com/getting-started/install).

Then, simply run this command in the monorepo root directory:

```bash
yarn
```

Once that's done, you are pretty much ready to go...

## Link the development CLI

In order to have access to all of the Coffeekraken power for our development environment, we need to link the `/packages/core/cli/dist/pkg/esm/cli/sugar.cli.js` file in our `bin` directory.

Here's how on OSX:

```bash
# go into your bin folder
cd /usr/local/bin
# create a symlink to our development cli file
# make sure to replace %pathToMonorepoRoot with the according path
ln -s %pathToMonorepoRoot/packages/core/cli/dist/pkg/esm/cli/sugar.cli.js sugard
# you will be able to use our "sugard" CLI
sugard -h
```

## Typescript

You have maybe see that the majority (it it's not all) of the code is written in Typescript. This mean that we need some compilation process.

Don't worry. Our CLI is here to help! In the monorepo root folder, just run this command:

```bash
sugard mono.dev
```

This will start some processes to handle the Typescript compilation.

## Code formatting

As you maybe guessed, To maintain a coherent codebase, code formatting is more than required.

Guess what? That's already **OK**. The `sugard mono.dev` command handle that as well.

> Make sure to disable extensions related to code formatting in your editor when you work on Coffeekraken...

{{/layout-doc }}
