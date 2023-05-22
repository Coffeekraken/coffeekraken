<?php

namespace Sugar\package;

/**
 * @name          packageMetas
 * @namespace            php.package
 * @type          Function
 * @platform        php
 * @status          beta
 *
 * This function take a package root path and returns the metas informations from one of these sources:
 * - package.json
 * - composer.json
 *
 * @param     {String}      [path=$_SERVER['DOCUMENT_ROOT']]      The path of the package to search metas for
 * @return    {Object}          The metas object information containing these data: name, description, version, author and license
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         \Sugar\package\packageMetas($1)
 *
 * @example     php
 * $metas = \Sugar\package\packageMetas();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

function packageMetas($path = null, $settings = [])
{
    if (!$path) {
        $path = $_SERVER['DOCUMENT_ROOT'];
    }
    $settings = (object) $settings;

    if (!isset($settings->sources)) {
        $settings->sources = ['package.json', 'composer.json'];
    }
    if (!isset($settings->fields)) {
        $settings->fields = [
            'name',
            'description',
            'version',
            'author',
            'license',
        ];
    }

    $foundFieldsCount = 0;
    $finalMetas = (object) [];

    foreach ($settings->sources as $source) {
        if ($foundFieldsCount >= count($settings->fields)) {
            break;
        }

        if (file_exists($path . '/' . $source)) {
            $json = json_decode(file_get_contents($path . '/' . $source));

            foreach ($settings->fields as $field) {
                if (!isset($finalMetas->{$field}) && isset($json->{$field})) {
                    $finalMetas->{$field} = $json->{$field};
                    $foundFieldsCount++;
                }
            }
        }
    }

    return $finalMetas;
}
