<?php

/**
 * @name            nodeDataTemplate
 * @namespace            php.twig.functions.nodes
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to print the `<template s-node="...">...</template>` template only if the $_ENV['S_NODES_DATA'] is setted to true.
 *
 * @param      {String}            $data              The data to print in the attribute. Can contain "values", "specs" and "source"
 * @return      {String}                                The `<template>` tag containing your data
 *
 * @snippet             __nodeDataTemplate($1)
 *
 * @example         twig
 * {{ __nodeDataTemplate(_context) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__nodeDataTemplate', function ($specs, $data) {
    return \Sugar\node\nodeDataTemplate($specs, $data);
});
