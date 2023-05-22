<?php

/**
 * @name                SDocmap
 * @namespace           php
 * @type                Class
 * @platform            php
 * @status              beta
 *
 * This class represent the ```docmap.json``` file and allows you to read it easily
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your docmap instance
 *
 * @setting         {Record<String, ISDocmapCustomMenuSettingFn>}       [customMenu={}]         Specify some custom menus you want to extract from the docmap.
 * @setting         {Record<String, ISDocmapTagProxyFn>}                [tagsProxy={}]          Specify some tags proxy to transform some tags values at BUILD process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         new SDocmap($1)
 * new SDocmap($1);
 *
 * @example             php
 * $docmap = new SDocmap();
 * $items = $docmap->read();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmap
{
    /**
     * @name        $settings
     * @type        SDocmapSettings
     * @private
     *
     * Store the passed settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private $settings;

    /**
     * @name           $_docmapJson
     * @type            Object
     * @private
     *
     * Store the readed docmap json
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private $_docmapJson;

    /**
     * Constructor
     */
    public function __construct($settings = [])
    {
        if ($settings instanceof SDocmapSettings) {
            $this->settings = $settings;
        } else {
            $this->settings = new SDocmapSettings($settings);
        }
    }

    /**
     * @name          read
     * @type          Function
     * @async
     *
     * This method allows you to search for docmap.json files and read them to get
     * back the content of them in one call.
     *
     * @todo      update documentation
     * @todo      integrate the "cache" feature
     *
     * @return      {Object}            An object containing the "map" with all the docmap items and the "menu" containing all the custom menu defined through the settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */

    public function read($params = [])
    {
        $finalParams = $params;
        if (!($params instanceof SDocmapReadParams)) {
            $finalParams = new SDocmapReadParams($params);
        }

        $docmapRootPath = dirname($finalParams->input);

        // init final docmap object
        $finalDocmapJson = (object) [
            'map' => (object) [],
            'menu' => (object) [],
        ];

        // if no file at all
        if (!file_exists($finalParams->input)) {
            return $finalDocmapJson;
        }

        $packageMonoRoot = \Sugar\fs\traverseUp($docmapRootPath, function (
            $path
        ) use ($docmapRootPath) {
            if (
                $path != $docmapRootPath &&
                file_exists($path . '/package.json')
            ) {
                return true;
            }
            return false;
        });

        $_loadJson = function ($packageNameOrPath, $type = 'npm') use (
            $docmapRootPath,
            $packageMonoRoot,
            $finalDocmapJson
        ) {
            $currentDocmapJsonPath;
            $packagesRootDir = $type == 'npm' ? 'node_modules' : 'vendor';
            $potentialPackageDocmapJsonPath =
                $docmapRootPath .
                '/' .
                $packagesRootDir .
                '/' .
                $packageNameOrPath .
                '/docmap.json';

            $potentialRootPackageDocmapJsonPath =
                $packageMonoRoot .
                '/' .
                $packagesRootDir .
                '/' .
                $packageNameOrPath .
                '/docmap.json';

            if (file_exists($potentialPackageDocmapJsonPath)) {
                $currentDocmapJsonPath = $potentialPackageDocmapJsonPath;
            } elseif (file_exists($packageNameOrPath . '/docmap.json')) {
                $currentDocmapJsonPath = $packageNameOrPath . '/docmap.json';
            } elseif (file_exists($potentialRootPackageDocmapJsonPath)) {
                $currentDocmapJsonPath = $potentialRootPackageDocmapJsonPath;
            } else {
                return;
            }

            $packageRootPath = str_replace(
                '/docmap.json',
                '',
                $currentDocmapJsonPath
            );

            // read the docmap file
            $docmapJson = json_decode(
                file_get_contents($currentDocmapJsonPath)
            );

            // get package metas
            $packageMetas = \Sugar\package\packageMetas($packageRootPath);
            foreach ($docmapJson->map as $item) {
                $item->package = $packageMetas;
            }
            if (isset($docmapJson->generated->map)) {
                foreach ($docmapJson->generated->map as $item) {
                    $item->package = $packageMetas;
                }
            }

            // add the readed docmap to the existing one
            $docmapJson->map = (object) array_merge(
                (array) $docmapJson->map,
                isset($docmapJson->generated->map)
                    ? (array) $docmapJson->generated->map
                    : []
            );

            unset($docmapJson->generated);

            // resolve the actual docmap path
            foreach ($docmapJson->map as $item) {
                $item->path = $packageRootPath . '/' . $item->relPath;
            }

            foreach ($docmapJson->map as $namespace => $item) {
                $blockId = $namespace;
                if (!isset($finalDocmapJson->map->$blockId)) {
                    $item->id = $blockId;
                    $finalDocmapJson->map->$blockId = $item;
                }
            }
        };

        // load package docmap
        $_loadJson($docmapRootPath);

        // load npm dependencies docmap
        $packageJsonPath = $docmapRootPath . '/package.json';
        if (file_exists($packageJsonPath)) {
            $packageJson = json_decode(file_get_contents($packageJsonPath));

            $packageDependencies = array_merge(
                isset($packageJson->dependencies)
                    ? (array) $packageJson->dependencies
                    : [],
                isset($packageJson->devDependencies)
                    ? (array) $packageJson->devDependencies
                    : []
            );

            foreach ($packageDependencies as $depName => $depVersion) {
                $_loadJson($depName, 'npm');
            }
        }

        // load composer dependencies docmap
        $composerJsonPath = $docmapRootPath . '/component.json';
        if (file_exists($composerJsonPath)) {
            $composerJson = json_decode(file_get_contents($composerJsonPath));

            $packageDependencies = array_merge(
                isset($composerJson->require)
                    ? (array) $composerJson->require
                    : [],
                isset($composerJson->requireDev)
                    ? (array) $composerJson->requireDev
                    : []
            );

            foreach ($packageDependencies as $depName => $depVersion) {
                $_loadJson($depName, 'composer');
            }
        }

        // store the docmap json
        $this->_docmapJson = $finalDocmapJson;

        // @TODO        extract the menu
        $finalDocmapJson->menu = $this->_extractMenu($finalDocmapJson);

        // @TODO        handle the $settings->sort|sortDeep properties

        return $finalDocmapJson;
    }

    /**
     * @name          extractMenu
     * @type          Function
     *
     * This method allows you to extract the docmap items that have a "menu" array property and
     * return all of these in a structured object
     *
     * @return        {Record<string: SFile>}       The structured menu tree with an SFile instance attached for each source file
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private function _extractMenu($docmapJson)
    {
        $docmapJsonMenuByPackage = (object) [];

        // split menus by packages
        foreach ($docmapJson->map as $namespace => $item) {
            if (!isset($item->menu)) {
                continue;
            }
            if (!isset($docmapJsonMenuByPackage->{$item->package->name})) {
                $docmapJsonMenuByPackage->{$item->package->name} = [];
            }
            array_push($docmapJsonMenuByPackage->{$item->package->name}, $item);
        }

        $finalMenu = (object) [
            'packages' => (object) [],
            'tree' => (object) [],
            'slug' => (object) [],
            'custom' => (object) [],
        ];

        $packageJsonPath = $this->settings->rootDir . '/package.json';
        $packageJson = (object) [];
        if (file_exists($packageJsonPath)) {
            $packageJson = json_decode(file_get_contents($packageJsonPath));
        }

        foreach ($docmapJsonMenuByPackage as $packageName => $items) {
            $menuObj = $this->_extractMenuFromDocmapJsonStack($items);

            if ($packageName == $packageJson->name) {
                $finalMenu = (object) array_merge(
                    (array) $finalMenu,
                    (array) $menuObj
                );
            } else {
                // $scopedSlugMenu = (object) [];
                // foreach ($menuObj->slug as $slug => $docItem) {
                //     $scopedSlugMenu->{'/package/' .
                //         $packageName .
                //         $slug} = clone $menuObj->slug->$slug-;
                //     $scopedSlugMenu->{'/package/' .
                //         $packageName .
                //         $slug}->slug = '/package/' . $packageName . $slug;
                // }

                // $finalMenu->packages->$packageName- = (object) [
                //     'name' => $packageName,
                //     'tree' => \Sugar\object\deepMap($menuObj->tree, function (
                //         $prop,
                //         $value,
                //         $object
                //     ) use ($packageName) {
                //         if ($prop == 'slug') {
                //             return '/package/' . $packageName . $value;
                //         }
                //         return $value;
                //     }),
                //     'slug' => $scopedSlugMenu,
                // ];
            }
        }

        foreach ($this->settings->customMenu as $menuName => $menuClosure) {
            if (!isset($finalMenu->custom->$menuName)) {
                $finalMenu->custom->$menuName = (object) [];
            }

            $closure = $this->settings->customMenu->$menuName;

            // tree
            $finalMenu->custom->$menuName->tree = \Sugar\object\deepFilter(
                $finalMenu->tree,
                $this->settings->customMenu->$menuName
            );

            // slug
            // $finalMenu->custom->$menuName->slug = \Sugar\object\deepMap(
            //     $finalMenu->slug,
            //     function ($prop, $value) use ($closure) {
            //         $res = $closure($prop, $value);
            //         if ($res == false) {
            //             return -1;
            //         }
            //         return $value;
            //     }
            // );

            // foreach ($finalMenu->packages as $packageName => $packageItem) {
            //     $packageFilteredTree = \Sugar\object\deepMap(
            //         $packageItem->tree,
            //         $closure
            //     );
            //     $finalMenu->custom->$menuName->tree = \Sugar\object\deepMerge(
            //         $finalMenu->custom->$menuName-,
            //         $packageFilteredTree
            //     );
            //     $packageFilteredSlug = \Sugar\object\deepMap(
            //         $packageItem->slug,
            //         $closure
            //     );
            //     $finalMenu->custom->$menuName->slug = \Sugar\object\deepMerge(
            //         $finalMenu->custom->$menuName-,
            //         $packageFilteredSlug
            //     );
            // }
        }

        return $finalMenu;
    }

    private function _extractMenuFromDocmapJsonStack($docmapJsonMap)
    {
        $menuObj = (object) [];
        $menuObjBySlug = (object) [];

        foreach ($docmapJsonMap as $namespace => $item) {
            if (!isset($item->menu)) {
                continue;
            }

            $dotPath = implode(
                '.',
                array_map(function ($tree) {
                    return strtolower($tree);
                }, $item->menu->tree)
            );

            $currentObj = $menuObj;

            foreach (explode('.', $dotPath) as $i => $part) {
                if (!isset($currentObj->$part)) {
                    $currentObj->$part = (object) [
                        'name' => $item->menu->tree[$i],
                    ];
                }

                if ($i >= count(explode('.', $dotPath)) - 1) {
                    $currentObj->$part->{$item->name} = (object) [
                        'name' => $item->name,
                        'as' => @$item->as,
                        'slug' => $item->menu->slug,
                        'tree' => $item->menu->tree,
                    ];
                    $menuObjBySlug->{$item->menu->slug} = (object) [
                        'name' => $item->name,
                        'as' => @$item->as,
                        'slug' => $item->menu->slug,
                        'tree' => $item->menu->tree,
                        'docmap' => $item,
                    ];
                }

                $currentObj = $currentObj->$part;
            }
        }

        return (object) [
            'tree' => $menuObj,
            'slug' => $menuObjBySlug,
        ];
    }
}
