<?php

namespace Sugar\css;

/**
 * @name            buildMediaQuery
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes a media query definition like "mobile", ">mobile", "=tablet", etc... and
 * returns you the corresponding css media query string.
 * This is based on the passed settings that you can pass as a second parameter.
 *
 * Here's the default medias availables:
 * - mobile: 0-639px
 * - tablet: 640px-1279px
 * - desktop: 1280px-2047px
 * - wide: 2048px-...
 * You can as well override these in the $settings parameter.
 *
 * @param       {String}        $media          The media query definition you want like "mobile", ">mobile", etc...
 * @param       {Array}         [$settings=[]]      Some settings to configure your media query css generation
 *
 * @setting         {String}        [method='container']        The method to use. By default, it will use the @container query over the @media one cause it offers more possibilities like resizing the ".s-viewport" element
 * @setting         {String}        [containerName='viewport']    The container name on which the @container query will refer to.
 * @setting         {String}        [defaultAction='>=']        Specify the default action you want when none is passed in the $media parameter. Can be "<", ">", "=", "<=" or ">=".
 * @setting         {Array}         [queries=['mobile'=>[],'tablet'=>[],'desktop'=>[],'wide'=>[],'dwarf'=>[]]]      All the available queries you want to support with for each the "min-width|height" and "max-width|height" values in integer (used as px)
 *
 * @snippet         \Sugar\css\buildMediaQuery($1);
 *
 * @example         php
 * \Sugar\css\buildMediaQuery('desktop');
 * \Sugar\css\buildMediaQuery('>desktop');
 * \Sugar\css\buildMediaQuery('<tablet');
 * \Sugar\css\buildMediaQuery('desktop', [
 *   'queries' => [
 *      'desktop' => [
 *          'minWidth': 1000,
 *          'maxWidth': null
 *      ]
 *   ]
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function buildMediaQuery($media, $frontspecMedia = [])
{
    $defaultParams = (object) [
        'defaultAction' => '<=',
        'method' => 'container',
        'containerName' => 'viewport',
        'queries' => [
            'mobile' => [
                'minWidth' => 0,
                'maxWidth' => 639,
            ],
            'tablet' => [
                'minWidth' => 640,
                'maxWidth' => 1279,
            ],
            'desktop' => [
                'minWidth' => 1280,
                'maxWidth' => 2047,
            ],
            'wide' => [
                'minWidth' => 2048,
                'maxWidth' => null,
            ],
        ],
    ];

    $finalParams = (object) \Sugar\object\deepMerge(
        $defaultParams,
        $frontspecMedia
    );
    $finalParams = (object) \Sugar\convert\toArray($finalParams);

    // sort the media
    $finalParams = \Sugar\frontspec\sortMedia($finalParams);
    $sortedMedias = array_keys(get_object_vars($finalParams->queries));

    $queries = [];

    $qs = explode(',', trim($media));
    foreach ($qs as $query) {
        array_push($queries, trim($query));
    }

    $fullQueriesList = [];

    foreach ($queries as $queryKey => $query) {
        $currentQueryList = [];

        if ($query == 'and' || $query == 'or') {
            array_push($currentQueryList, $query);
            continue;
        }

        $firstChar = substr($query, 0, 1);
        $firstTwoChar = substr($query, 0, 2);
        $lastChar = substr($query, -1);

        $action = $finalParams->defaultAction;
        $mediaName = $query;

        if ($lastChar == '-' || $lastChar == '|') {
            $mediaName = substr($mediaName, 0, -1);
        }

        if (
            $firstTwoChar == '>=' ||
            $firstTwoChar == '<=' ||
            $firstTwoChar == '=='
        ) {
            $mediaName = substr($mediaName, 2);
            $action = $firstTwoChar;
        } elseif ($firstChar == '<' || $firstChar == '>' || $firstChar == '=') {
            $mediaName = substr($mediaName, 1);
            $action = $firstChar;
        }

        $mediaQueryConfig = $finalParams->queries->$mediaName;

        if (!$mediaQueryConfig) {
            throw new \Exception(
                '[buildMediaQuery] Sorry but the requested media "' .
                    $mediaName .
                    '" does not exists in the config'
            );
        }

        $queryList = [];
        foreach (array_keys((array) $mediaQueryConfig) as $key => $prop) {
            $value = $mediaQueryConfig->$prop;

            if ($value == null) {
                if ($prop == 'minWidth') {
                    $value = 0;
                } elseif ($prop == 'maxWidth') {
                    $value = 99999;
                }
            }

            $camelToDashMap = [
                'minWidth' => 'min-width',
                'maxWidth' => 'max-width',
            ];

            if (in_array($prop, ['minWidth', 'maxWidth'])) {
                if ($action == '>') {
                    if ($prop == 'maxWidth') {
                        $argName = 'min-width';
                        array_push(
                            $queryList,
                            '(' . $argName . ': ' . ($value + 1) . 'px)'
                        );
                    }
                } elseif ($action == '<') {
                    if ($prop == 'minWidth') {
                        $argName = 'max-width';
                        array_push(
                            $queryList,
                            '(' . $argName . ': ' . $value . 'px)'
                        );
                    }
                } elseif ($action == '=') {
                    array_push(
                        $queryList,
                        '(' . $camelToDashMap[$prop] . ': ' . $value . 'px)'
                    );
                } elseif ($action == '>=') {
                    if (end($sortedMedias) == $media) {
                        continue;
                    }

                    if ($prop == 'minWidth') {
                        $argName = 'min-width';
                        array_push(
                            $queryList,
                            '(' . $argName . ': ' . $value . 'px)'
                        );
                    }
                } elseif ($action == '<=') {
                    if ($sortedMedias[0] == $media) {
                        continue;
                    }

                    if ($prop == 'maxWidth') {
                        $argName = 'max-width';
                        array_push(
                            $queryList,
                            '(' . $argName . ': ' . $value . 'px)'
                        );
                    }
                }
            } else {
                array_push(
                    $queryList,
                    '(' . $camelToDashMap[$prop] . ': ' . $value . 'px)'
                );
            }
        }

        if ($lastChar == '-') {
            array_push($queryList, '(orientation: landscape)');
        } elseif ($lastChar == '|') {
            array_push($queryList, '(orientation: portrait)');
        }

        array_push($currentQueryList, implode(' and ', $queryList));

        array_push($fullQueriesList, implode(' ', $currentQueryList));
    }

    $fullQueriesList = array_filter($fullQueriesList, function ($l) {
        return trim($l) !== '';
    });

    if ($finalParams->method == 'container') {
        return '@container ' .
            $finalParams->containerName .
            ' ' .
            implode(' ', $fullQueriesList);
    } else {
        return '@media ' . implode(' ', $fullQueriesList);
    }
}
