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
* @name            Git
* @namespace       doc.contribute
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Contribute           /doc/contribute/git
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Git

Our git workflow is very simple and normally well known by developers around the world because it's simply based on [git-flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Gitflow%20is%20a%20legacy%20Git,software%20development%20and%20DevOps%20practices.).

![Git flow](https://wac-cdn.atlassian.com/dam/jcr:cc0b526e-adb7-4d45-874e-9bcea9898b4a/04%20Hotfix%20branches.svg?cdnVersion=470)

## Branches

Here's the branches schema that has to be followed:

-   `master`: Master branch that represent the published packages.
-   `hotfix/...`: Branches that handle hotfix and will be merged into `master` and `develop`
-   `develop`: Main development branch where features, fixes, etc... will be merged.
-   `feature/...`: Feature branches on which maintainers and developers has to work.

Why no `release` branch?

For now, we are going to use the `tags` to mark releases on the `master` branch. This may change in futur but for now, it's the way it is...

## Pull request

To send you code back to the main repository, please make use of the pull request feature on Github. This will act as a "security" layer and ensure that all we merge in the project is well tested, works perfectly as intended, etc... Nothing against you guys! :)

Mainly, you will work on **new features** and **fixes**. This will be materialised in your git with `feature/...` and `hotfix/...` branches that you will propose as pull request once you are ready. Your code will be checked just to be sure all works properly and that your proposition is line with the project trajectory.

Once all is ok, your code will be merged, released if it's a fix and scheduled in the next release if it's a new feature.

Then, and **ONLY** then, you will be pleased to drink a nice and fresh bier. (if you have enough chance, it will even be offered by the Coffeekraken community!).


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
