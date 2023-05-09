<?php

/**
 * @name            SMedia
 * @namespace       php
 * @type            Class
 * @platform        php
 * @status          beta
 *
 * A simple class to handle the media (queries) like methods like buildQuery, layoutCss, etc... All of this on top of the @specimen/types ISMedia type and the @coffeekraken/s-frontspec package
 *
 * @param       {String|Object}             [$media='frontspec']                      Either an ISMedia object, or 'frontspec' if you want them to be loaded from your frontspec.json file
 * @param       {Object|Array}              [$settings=[]]              Some settings to configure your SMedia instance
 *
 * @example         php
 * $media = new SMedia();
 * $query = $media->buildQuery('desktop');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMedia
{
    /**
     * @name        $settings
     * @type        Object
     * @private
     *
     * Store the passed settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private $settings;

    private $media;

    /**
     * Constructor
     */
    public function __construct($media = 'frontspec', $settings = [])
    {
        // extends settings
        $this->settings = (object) array_merge_recursive([], (array) $settings);

        // handle the $media parameter
        if ($media === 'frontspec') {
            $frontspec = new SFrontspec();
            $frontspecJson = (object) $frontspec->read();
            $this->media = $frontspecJson->media;
        } elseif ($media != null) {
            $this->media = $media;
        } else {
            $this->media = (object) [
                'defaultAction' => '<=',
                'defaultMedia' => 'desktop',
                'method' => 'media',
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
        }
        $this->media = $this->sortQueries($this->media);
    }

    /**
     * @name            layoutCss
     * @type            Function
     *
     * This function takes a layout definition like "1 2 _ 3 3" and generate the css that will handle this layout.
     * You can as well pass some informations the gap wanted, the alignement, etc...
     *
     * @param       {String|Array}         $layout            The layout string defintion you want to generate the css for like "1 2 _ 3 3". It can also be an associative array like ["desktop" => "1 2", "mobile" => "1 _ 2"]
     * @param       {Array}         [$settings=[]]      Some settings to configure your layout generation
     * @return      {String}                         The resulting css
     *
     * @setting         {String}        [method='container']        The method to use. By default, it will use the @container query over the @media one cause it offers more possibilities like resizing the ".s-viewport" element
     * @setting         {String}        [containerName='viewport']    The container name on which the @container query will refer to.
     * @setting         {String}        [selector='#layout']       A css selector used to target the correct section/div...
     * @setting         {String}        [gap=null]                 A gap value to apply on your layout
     * @setting         {Boolean}       [gapBetween=true]           Specify if you want the gap only between the cells or all around
     * @setting         {String}        [align='stretch']           The "align-items" value for your grid layout
     * @setting         {String}        [justify='stretch']         The "justify-items" value for your grid layout
     * @setting         {Boolean}       [minify=true]             Minify the output css or not
     * @setting         {Array}         [$scope=['bare','lnf','gap','align','justify']]             The scope(s) you want to generate
     *
     * @example         php
     * $media = new SMedia();
     * $media->layoutCss('1 2 _ 3 3', [
     *    'selector' => '.my-layout'
     * ]);
     *
     * $media->layoutCss(['desktop' => '1 2 3', 'mobile' => '1 2 _ 3 3'], [
     *    'selector' => '.my-layout'
     * ]);
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public function layoutCss($layout, $settings = [])
    {
        $finalSettings = (object) array_merge(
            [
                'method' => 'container',
                'containerName' => 'viewport',
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

            $defaultAction = '<=';
            if (isset($this->media->defaultAction)) {
                $defaultAction = $this->media->defaultAction;
            }

            $queries = (array) $this->media->queries;
            $keys = array_keys($queries);

            $orderedLayouts = [];

            foreach ($keys as $media) {
                if (isset($layout[$media])) {
                    $lay = $layout[$media];
                    if (is_array($lay) || is_object($lay)) {
                        $lay = ((array) $lay)['layout'];
                    }
                    $orderedLayouts[$media] = $lay;
                }
            }

            $areas = [];

            $i = 0;
            foreach ($orderedLayouts as $media => $lay) {
                if ($defaultAction == '>=' && $i >= count($keys) - 1) {
                    $media = null;
                } elseif ($defaultAction == '<=' && $i == 0) {
                    $media = null;
                }
                $i++;

                $layoutRes = $this->layoutCss(
                    $lay,
                    array_merge((array) $finalSettings, [
                        'media' => $media,
                    ])
                );
                $areas = $layoutRes->areas;

                array_push($finalCss, $layoutRes->css);
            }

            return (object) [
                'css' => implode("\n", $finalCss),
                'areas' => $areas,
            ];
        }

        // make sure that if we pass the media as "default"
        // it is setted to null to avoid creating media query for it
        if ($finalSettings->media == 'default') {
            $finalSettings->media = null;
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

        $vars = [$finalSettings->selector . ' {'];

        if (in_array('bare', $finalSettings->scope)) {
            array_push(
                $vars,
                'display: grid;
            grid-template-columns: ' .
                    implode(' ', $colsStatement) .
                    ';
            grid-template-rows: auto;'
            );
        }

        if (in_array('align', $finalSettings->scope)) {
            array_push($vars, 'align-items: ' . $finalSettings->align . ';');
        }

        if (in_array('justify', $finalSettings->scope)) {
            array_push(
                $vars,
                'justify-items: ' . $finalSettings->justify . ';'
            );
        }

        if ($finalSettings->gap && in_array('gap', $finalSettings->scope)) {
            array_push($vars, 'gap: ' . $finalSettings->gap . ';');
        }

        array_push($vars, '}');

        if (in_array('bare', $finalSettings->scope)) {
            foreach ($areas as $i => $areaId) {
                if ($areaId == 'x' || $areaId == '-') {
                } else {
                    array_push(
                        $vars,
                        $finalSettings->selector .
                            ' > .s-layout_area-' .
                            $areaId .
                            ' { ' .
                            'grid-column-start: ' .
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
                            ';' .
                            '
                    }'
                    );
                }
            }
        }

        if ($finalSettings->media) {
            $query = $this->buildQuery(
                $finalSettings->media,
                $finalSettings->mediaSettings
            );
            array_unshift($vars, $query . ' {');
            array_push($vars, '}');
        }

        $css = implode($finalSettings->minify ? ' ' : "\n", $vars);
        if ($finalSettings->minify) {
            $css = preg_replace('/\n/', ' ', $css);
            $css = preg_replace('/\s{2,999}/', ' ', $css);
        }

        return (object) [
            'css' => $css,
            'areas' => $areas,
        ];
    }

    /**
     * @name            buildQuery
     * @type            Function
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
     * @example         php
     * $media = new SMedia();
     * $media->buildQuery('desktop');
     * $media->buildQuery('>desktop');
     * $media->buildQuery('<tablet');
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public function buildQuery($media)
    {
        // check if the requested media exists.
        // otherwise, return the passedmedia
        if (!isset($this->media->queries->$media)) {
            return $media;
        }

        // sort the media
        $sortedMedias = array_keys(get_object_vars($this->media->queries));

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

            $action = $this->media->defaultAction;
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
            } elseif (
                $firstChar == '<' ||
                $firstChar == '>' ||
                $firstChar == '='
            ) {
                $mediaName = substr($mediaName, 1);
                $action = $firstChar;
            }

            $mediaQueryConfig = $this->media->queries->$mediaName;

            if (!$mediaQueryConfig) {
                throw new \Exception(
                    '[buildQuery] Sorry but the requested media "' .
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

        // if ($finalSettings->method == 'container') {
        //     return '@container ' .
        //         $finalSettings->containerName .
        //         ' ' .
        //         implode(' ', $fullQueriesList);
        // } else {
        return '@media ' . implode(' ', $fullQueriesList);
        // }
    }

    /**
     * @name            sortQueries
     * @type            Function
     *
     * This function take as input the "media" property of the `frontspec.json` file and return
     * a new object mostly the same but with the "queries" object|array sorted depending on the
     * "defaultAction" property.
     *
     * @param     {Object}      $media                      The frontspec "media" object
     * @return    {Object}                                  The same object with the "queries" sorted correctly
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public function sortQueries($media = null)
    {
        if ($media == null) {
            $media = $this->media;
        }

        $media = \Sugar\convert\toObject($media);

        if (!isset($media->defaultAction)) {
            return $media;
        }

        // get the default media string
        $defaultMedia = $media->defaultMedia;

        $queries = \Sugar\object\sort($media->queries, function ($a, $b) use (
            $media
        ) {
            $a = (object) $a;
            $b = (object) $b;
            if ($media->defaultAction == '<=') {
                return $a->value->minWidth < $b->value->minWidth ? 1 : -1;
            } elseif ($media->defaultAction == '>=') {
                return $a->value->minWidth > $b->value->minWidth ? 1 : -1;
            }
            return 0;
        });

        // create new queries object
        $sortedQueries = (object) [];

        // add the "defaultMedia" first if exists
        // if (isset($queries->$defaultMedia)) {
        //     $sortedQueries->$defaultMedia = $queries->$defaultMedia;
        // }

        // add all the others queries next
        foreach ((array) $queries as $m => $query) {
            // if ($m == $defaultMedia) {
            //     continue;
            // }
            $sortedQueries->$m = $query;
        }

        // override original queries
        $media->queries = $sortedQueries;

        // return new media object
        return $media;
    }
}
