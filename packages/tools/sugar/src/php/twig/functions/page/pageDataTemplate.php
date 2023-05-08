<?php

/**
 * @name            pageDataTemplate
 * @namespace            php.twig.functions.nodes
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to print the `<template s-page="...">...</template>` template only if the $_ENV['S_NODES_DATA'] is setted to true.
 *
 * @param      {String}            $data              The data to print in the attribute. Can contain "name", "scope", "slug" and "layout"
 * @return      {String}                                The `<template>` tag containing your data
 *
 * @snippet             __pageDataTemplate($1)
 *
 * @example         twig
 * {{ __pageDataTemplate(_context) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

if (!function_exists('__sArrayFilterRecursive')) {
    function __sArrayFilterRecursive($input)
    {
        foreach ($input as &$value) {
            if (is_array($value)) {
                $value = __sArrayFilterRecursive($value);
            }
        }

        return array_filter($input);
    }
}

return new \Twig\TwigFunction('__pageDataTemplate', function ($data) {
    // check if the $_ENV['S_NODES_DATA'] is set to true
    if (!isset($_ENV['S_NODES_DATA']) || $_ENV['S_NODES_DATA'] == false) {
        return '';
    }

    // uid
    $uid = null;
    if (isset($data['uid'])) {
        $uid = $data['uid'];
    }

    // name
    $name = null;
    if (isset($data['name'])) {
        $name = $data['name'];
    }

    // scope
    $scope = null;
    if (isset($data['scope'])) {
        $scope = $data['scope'];
    }

    // slug
    $slug = null;
    if (isset($data['slug'])) {
        if (is_array($data['slug'])) {
            $slug = json_encode($data['slug']);
        } else {
            $slug = '[' . $data['slug'] . ']';
        }
    }

    if ($uid == null) {
        return '<!-- In order to print the s-page, you MUST pass a "uid".. -->';
    }

    // return ready to template JSON
    return '<template s-page="' .
        $uid .
        '">{
        "uid": "' .
        $uid .
        '",
        "scope": "' .
        $scope .
        '",
        "name": "' .
        $name .
        '",
        "slug": ' .
        $slug .
        '
    }</template>';
});
