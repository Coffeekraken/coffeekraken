<?php

namespace Sugar\css;

/**
 * @name            layoutCss
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes a layout definition like "1 2 _ 3 3" and generate the css that will handle this layout.
 * You can as well pass some informations the gap wanted, the alignement, etc...
 *
 * @param       {String}         $layout            The layout string defintion you want to generate the css for like "1 2 _ 3 3"
 * @param       {Array}         [$settings=[]]      Some settings to configure your layout generation
 * @return      {String}                         The resulting css
 *
 * @setting        {String}         [selector='#layout']       A css selector used to target the correct section/div...
 * @setting         {String}        [gap=null]                 A gap value to apply on your layout
 * @setting         {Boolean}       [gapBetween=true]           Specify if you want the gap only between the cells or all around
 * @setting         {String}        [align='stretch']           The "align-items" value for your grid layout
 * @setting         {String}        [justify='stretch']         The "justify-items" value for your grid layout
 * @setting         {String}        [media=null]                A media to pass to the \Sugar\css\buildMediaQuery function to scope the generated css in the correct media query
 * @setting         {Array}         [mediaSettings=[]]          Specify the \Sugar\css\buildMediaQuery $settings parameter if you specify a "media" setting
 * @setting         {Boolean}       [minify=true]             Minify the output css or not
 * @setting         {Array}         [$scope=['bare','lnf','gap','align','justify']]             The scope(s) you want to generate
 *
 * @example         php
 * \Sugar\css\layoutCss('1 2 _ 3 3', [
 *    'selector' => '.my-layout'
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function layoutCss($layout, $settings = [])
{
    $settings = (object) $settings;

    if (!isset($settings->mediaSettings)) {
        $frontspecJson = \Sugar\frontspec\readFrontspec();
        $settings->mediaSettings = $frontspecJson->media;
    }

    $finalParams = (object) array_merge(
        [
            'selector' => '#layout',
            'gap' => null,
            'gapBetween' => true,
            'align' => 'stretch',
            'justify' => 'stretch',
            'media' => null,
            'mediaSettings' => (object) [],
            'minify' => false,
            'scope' => ['bare', 'lnf', 'gap', 'align', 'justify'],
        ],
        (array) $settings
    );

    // handle array or object passed
    if (is_object($layout) or is_array($layout)) {
        $layout = (array) $layout;

        $finalCss = [];

        $sortedMedia = \Sugar\frontspec\sortMedia($finalParams->mediaSettings);

        $queries = (array) $sortedMedia->queries;
        $keys = array_keys($queries);

        $orderedLayouts = [];

        foreach ($keys as $media) {
            if (isset($layout[$media])) {
                $orderedLayouts[$media] = $layout[$media];
            }
        }

        if (isset($layout['default'])) {
            $orderedLayouts['default'] = $layout['default'];
        }

        foreach ($orderedLayouts as $media => $lay) {
            array_push(
                $finalCss,
                layoutCss(
                    $lay,
                    array_merge((array) $settings, [
                        'media' => $media,
                    ])
                )
            );
        }

        return implode("\n", $finalCss);
    }

    // make sure that if we pass the media as "default"
    // it is setted to null to avoid creating media query for it
    if ($finalParams->media == 'default') {
        $finalParams->media = null;
    } elseif (isset($finalParams->mediaSettings->defaultMedia)) {
        if ($finalParams->media == $finalParams->mediaSettings->defaultMedia) {
            $finalParams->media = null;
        }
    }

    $areas = [];

    $colsCountByArea = [];
    $rowsCountByArea = [];
    $areasCountedByLine = [];
    $areasCountedByCol = [];

    $colsStartByArea = [];
    $rowsStartByArea = [];
    $colsEndByArea = [];
    $rowsEndByArea = [];

    $rows = array_filter(
        array_map(function ($l) {
            return trim($l);
        }, preg_split('/(\\n|_)/', $layout)),
        function ($l) {
            return $l != '_' && $l != '';
        }
    );

    $rowsCount = count($rows);
    $colsCount = 0;

    foreach ($rows as $row) {
        $rowCols = array_map(function ($l) {
            return trim($l);
        }, explode(' ', $row));
        if (count($rowCols) > $colsCount) {
            $colsCount = count($rowCols);
        }
    }

    $currentCol = 0;
    $currentRow = 0;

    foreach ($rows as $row) {
        $currentRow++;
        $currentCol = 0;

        $rowCols = array_map(function ($l) {
            return trim($l);
        }, explode(' ', $row));

        foreach ($rowCols as $areaId) {
            $currentCol++;

            if (!in_array($areaId, $areas)) {
                array_push($areas, $areaId);
            }

            if (!isset($areasCountedByCol[$currentCol . '-' . $areaId])) {
                $areasCountedByCol[$currentCol . '-' . $areaId] = true;
                $current = isset($colsCountByArea[$areaId])
                    ? $colsCountByArea[$areaId]
                    : 0;
                $colsCountByArea[$areaId] = $current + 1;
            }

            if (!isset($areasCountedByLine[$currentRow . '-' . $areaId])) {
                $areasCountedByLine[$currentRow . '-' . $areaId] = true;
                $current = isset($rowsCountByArea[$areaId])
                    ? $rowsCountByArea[$areaId]
                    : 0;
                $rowsCountByArea[$areaId] = $current + 1;
            }
        }
    }

    $currentCol = 0;
    $currentRow = 0;

    foreach ($rows as $row) {
        $currentRow++;
        $currentCol = 0;

        $rowCols = array_map(function ($l) {
            return trim($l);
        }, explode(' ', $row));

        foreach ($rowCols as $areaId) {
            $currentCol++;

            if (!isset($colsStartByArea[$areaId])) {
                $colsStartByArea[$areaId] = $currentCol;
            }

            if (!isset($rowsStartByArea[$areaId])) {
                $rowsStartByArea[$areaId] = $currentRow;
            }

            $colsEndByArea[$areaId] = $currentCol;
            $rowsEndByArea[$areaId] = $currentRow;
        }
    }

    $colsStatement = [];
    $rowsStatement = [];

    for ($i = 0; $i < $colsCount; $i++) {
        if ($colsCount <= 1) {
            array_push($colsStatement, '100%');
        } else {
            array_push($colsStatement, '1fr');
        }
    }

    $vars = [$finalParams->selector . ' {'];

    if (in_array('bare', $finalParams->scope)) {
        array_push(
            $vars,
            'display: grid;
            grid-template-columns: ' .
                implode(' ', $colsStatement) .
                ';
            grid-template-rows: auto;'
        );
    }

    if (in_array('align', $finalParams->scope)) {
        array_push($vars, 'align-items: ' . $finalParams->align . ';');
    }

    if (in_array('justify', $finalParams->scope)) {
        array_push($vars, 'justify-items: ' . $finalParams->justify . ';');
    }

    if ($finalParams->gap && in_array('gap', $finalParams->scope)) {
        array_push($vars, 'gap: ' . $finalParams->gap . ';');
    }

    array_push($vars, '}');

    if (in_array('bare', $finalParams->scope)) {
        foreach ($areas as $areaId) {
            array_push(
                $vars,
                $finalParams->selector .
                    ' > *:nth-child(' .
                    $areaId .
                    ') {
                    grid-column-start: ' .
                    $colsStartByArea[$areaId] .
                    ';
                    grid-column-end: ' .
                    $colsEndByArea[$areaId] +
                    1 .
                    ';
                    grid-row-start: ' .
                    $rowsStartByArea[$areaId] .
                    ';
                    grid-row-end: ' .
                    $rowsEndByArea[$areaId] +
                    1 .
                    ';
                }'
            );
        }
    }

    if ($finalParams->media) {
        $query = buildMediaQuery(
            $finalParams->media,
            $finalParams->mediaSettings
        );
        array_unshift($vars, $query . ' {');
        array_push($vars, '}');
    }

    $css = implode($finalParams->minify ? ' ' : "\n", $vars);
    if ($finalParams->minify) {
        $css = preg_replace('/\n/', ' ', $css);
        $css = preg_replace('/\s{2,999}/', ' ', $css);
    }

    return $css;
}
