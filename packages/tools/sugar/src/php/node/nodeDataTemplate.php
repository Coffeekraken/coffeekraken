<?php

namespace Sugar\node;

/**
 * @name            nodeDataTemplate
 * @namespace            php.node
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to print the `<template s-node="...">...</template>` template only if the $_ENV['S_NODES_DATA'] is setted to true.
 *
 * @param      {String}            $data              The data to print in the attribute. Can contain "values", "specs" and "source"
 * @return      {String}                                The `<template>` tag containing your data
 *
 * @snippet             \Sugar\node\nodeDataTemplate($1)
 *
 * @example         twig
 * \Sugar\node\nodeDataTemplate(data)
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

function nodeDataTemplate($specs, $data)
{
    // check if the $_ENV['S_NODES_DATA'] is set to true
    if (!isset($_ENV['S_NODES_DATA']) || $_ENV['S_NODES_DATA'] == false) {
        return '';
    }

    // clean context
    unset($data['frontspec']);
    unset($data['docmap']);
    unset($data['server']);
    unset($data['packageJson']);
    unset($data['config']);
    unset($data['configFiles']);
    unset($data['requestedConfig']);
    unset($data['menus']);
    unset($data['env']);
    unset($data['_sharedDataFilePath']);
    unset($data['shared']);
    unset($data['request']);
    unset($data['nodes']);
    unset($data['page']);
    unset($data['carpenter']);
    unset($data['finalId']);

    // handle the "$source" property
    $source = (object) [];
    if (isset($data['$source'])) {
        $source = $data['$source'];
        unset($data['$source']);
    }

    // uid
    $uid = null;
    if (isset($data['uid'])) {
        $uid = $data['uid'];
        unset($data['uid']);
    }

    if ($uid == null) {
        return '<!-- In order to print the s-node, you MUST pass a "uid".. -->';
    }

    // return ready to template JSON
    return '<template s-node="' .
        $uid .
        '" s-specs="' .
        $specs .
        '">{
        "uid": "' .
        $uid .
        '",
        "specs": "' .
        $specs .
        '",
        "source": ' .
        json_encode($source, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT) .
        ',
        "values": ' .
        json_encode(
            __sArrayFilterRecursive($data),
            JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT
        ) .
        '
    }</template>
    <template></template>';
}
