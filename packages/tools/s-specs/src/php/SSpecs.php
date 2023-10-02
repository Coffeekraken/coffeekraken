<?php

/**
 * @name            SSpecs
 * @namespace       php
 * @type            Class
 * @platform        php
 * @status          beta
 *
 * This class allows you to access with ease some specification file(s) that supports internal and external references to other files, etc...
 * This is usefull to build specification files in json format that make share some parts through common files, etc...
 * You will also have easy access to your files through "namespaces" that represent different folders on your system. This will simplify
 * the way you read your files by prefixing your dotpath (simple fs "/" replacement) with the namespace you want to look in.
 *
 * @param       {Object|Array}          [$settings=[]]              Some settings to configure your instance
 *
 * @setting         {Object|Array}            [namespaces=[]]             An array|object of namespace like "my.namespace" property with a simple array of folders where to search for specs files when using this namespace
 * @setting         {Object|Array}            [sFrontspecSettings=[]]           Some settings to pass to the SFrontspec class in order to read the `frontspec.json` content
 * @setting         {Function}               [previewUrl=null]            A function called only when a .preview.png file exists alongside the .spec.json file that will take an object with "path", "name", "specs" and "specsObj" as input and that has to return the web accessible preview url. If not specified, no "preview" field will exists in the output spec json
 * @setting         {Boolean}           [read.metas=true]           Specify if you want to get the metas back for each spec
 * @setting         {Boolean}           [read.models=true]          Specigy if you want to get back the ".model.json" files that are alongside of the .spec.json file if exists
 *
 * @snippet         new SSpecs($1);
 * $specs = new SSpecs($1);
 * $spec = $specs->read('sugar.views.components.card');
 *
 * @example         php
 * $spec = new SSpecs([
 *   'namespaces' => [
 *      'myNamespace' => [
 *          '/my/absolute/path/to/my/specs/directory'
 *      ]
 *   ]
 * ]);
 *
 * // read a spec file
 * $viewSpec = $spec->read('myNamespace.views.mySpecFile');
 *
 * // read a spec file and specify an internal property to get
 * $title = $spec->read('myNamespace.views.mySpecFile:title);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSpecs
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

    /**
     * Constructor
     */
    public function __construct($settings = [])
    {
        $defaultSettings = (object) [
            'namespaces' => [],
            'sFrontspecSettings' => [],
            'read' => [
                'metas' => true,
                'models' => true,
            ],
            'previewUrl' => null,
        ];
        $this->settings = \Sugar\object\deepMerge($defaultSettings, $settings);

        $frontspec = new \SFrontspec($this->settings->sFrontspecSettings);
        $frontspecJson = $frontspec->read();

        if (isset($frontspecJson->specs->namespaces)) {
            foreach ($frontspecJson->specs->namespaces as $ns => $paths) {
                if (!isset($this->settings->namespaces[$ns])) {
                    $this->settings->namespaces[$ns] = [];
                }
                $this->settings->namespaces[$ns] = array_unique(
                    array_merge($this->settings->namespaces[$ns], $paths)
                );
            }
        }

        if (!isset($this->settings->namespaces)) {
            throw new Exception(
                '[SSpecs] You MUST at least specify some "namespaces" folders to search specs files in...'
            );
        }

        // format namespaces paths
        foreach ((array) $this->settings->namespaces as $namespace => $paths) {
            if (!isset($this->settings->namespaces[$namespace])) {
                $this->settings->namespaces[$namespace] = [];
            }

            $this->settings->namespaces[$namespace] = array_unique(
                array_map(function ($value) {
                    if (str_starts_with($value, './')) {
                        return isset($frontspecPath)
                            ? dirname($frontspecPath)
                            : getcwd() . '/' . str_replace('./', '', $value);
                    }
                    return $value;
                }, $this->settings->namespaces[$namespace])
            );
        }
    }

    /**
     * @name            list
     * @type            Function
     * @platform        php
     * @status          beta
     *
     * This method allows you to list all the available spec files inside a particular namespace(s), or simply all.
     *
     * @param       {String}        $namespaces         An array of namespaces to list the specs from. If not set, list all the specs from all the namespaces
     * @return      {Any}                               A list of all the specs files available
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public function list($namespaces = [])
    {
        $results = [];
        $namespacesFolders = [];
        $definedNamespaces = $this->settings->namespaces;
        $definedNamespacesKeys = array_keys((array) $definedNamespaces);

        $finalNamespaces = [];

        if (!count($namespaces)) {
            $finalNamespaces = $definedNamespacesKeys;
        } else {
            foreach ($definedNamespacesKeys as $definedNamespace) {
                foreach ($namespaces as $passedNamespace) {
                    if (str_starts_with($passedNamespace, $definedNamespace)) {
                        if (!in_array($definedNamespace, $finalNamespaces)) {
                            array_push($finalNamespaces, $definedNamespace);
                        }
                    }
                }
            }
        }

        foreach ($finalNamespaces as $namespace) {
            $folders = $definedNamespaces[$namespace];

            foreach ($folders as $folder) {
                $specFiles = glob($folder . '/**/*.spec.json');

                foreach ($specFiles as $specFilePath) {
                    $filename = basename($specFilePath);
                    $name = str_replace('.spec.json', '', $filename);
                    $dotpath =
                        $namespace .
                        implode(
                            '.',
                            explode(
                                '/',
                                str_replace(
                                    $folder,
                                    '',
                                    str_replace('.spec.json', '', $specFilePath)
                                )
                            )
                        );

                    $that = $this;
                    array_push($results, [
                        'name' => $name,
                        'filename' => $filename,
                        'dotpath' => $dotpath,
                        'namespace' => $namespace,
                        'path' => $specFilePath,
                        'dir' => dirname($specFilePath),
                        'read' => function ($settings = []) use (
                            $that,
                            $dotpath
                        ) {
                            return $that->read($dotpath, $settings);
                        },
                    ]);
                }
            }
        }

        return $results;
    }

    public function resolve($specJson)
    {
        if (isset($specJson->extends)) {
            $specs = $this->read($specJson->extends, [
                'metas' => false,
                'models' => false,
            ]);
            unset($specJson->extends);
            $specJson = \Sugar\object\deepMerge($specs, $specJson);
        }

        foreach ($specJson as $key => $value) {
            if (is_object($value) || is_array($value)) {
                $specJson->{$key} = $this->resolve($value);
            }

            if (is_string($value) && str_starts_with($value, '@')) {
                $specs = $this->read(str_replace('@', '', $value), [
                    'metas' => false,
                    'models' => false,
                ]);
                $specJson->{$key} = $specs;
            }

            if (!$value) {
                unset($specJson->{$key});
            }
        }

        return $specJson;
    }

    /**
     * @name            read
     * @type            Function
     * @platform        php
     * @status          beta
     *
     * This method allows you to read a spec file and/or a value inside the passed spec file.
     *
     * @param       {String}        $specDotPath        A dotpath that point to a json spec file relative to one of the registered "$settings->namespaces" folders. You can then specify an internal dotpath to get a specific value inside the passed file like so "sugar.views.props.attributes:title"
     * @return      {Any}                               The requested spec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public function read($specDotPath, $settings = [])
    {
        $finalValue;

        $finalSettings = \Sugar\object\deepMerge(
            $this->settings->read,
            $settings
        );

        $definedNamespaces = $this->settings->namespaces;
        $definedNamespacesKeys = array_keys((array) $definedNamespaces);

        $currentNamespace = '';
        foreach ($definedNamespacesKeys as $namespace) {
            if (str_starts_with((string) $specDotPath, $namespace)) {
                $currentNamespace = $namespace;
                break;
            }
        }

        if (!$currentNamespace) {
            throw new Exception(
                '[SSpecs.read] The passed dotpath "' .
                    $specDotPath .
                    '" does not correspond to any registered namespaces which are:' .
                    implode("\n- ", $definedNamespacesKeys)
            );
        }

        $dotPathParts = explode(':', $specDotPath);
        $specFileDotPath = $dotPathParts[0];
        if (isset($dotPathParts[1])) {
            $internalSpecDotPath = $dotPathParts[1];
        }

        // compute internal namespace dotpath
        $internalDotPath = str_replace(
            $currentNamespace . '.',
            '',
            $specFileDotPath
        );
        $internalPath =
            implode('/', explode('.', $internalDotPath)) . '.spec.json';

        // some variables
        $finalSpecFilePath;
        $specName = @array_pop(explode('.', $internalDotPath));

        // loop on each registered namespaces directories to check if the specDotPath
        // correspond to a file in one of them...
        $dirs = $this->settings->namespaces[$currentNamespace];

        foreach ($dirs as $dir) {
            // direct path my/path => my/path.spec.json
            $potentialSpecPath = $dir . '/' . $internalPath;

            if (file_exists($potentialSpecPath)) {
                $finalSpecFilePath = $potentialSpecPath;
                break;
            }

            // try from my/path => my/path/path.spec.json
            $parts = explode('.', $internalDotPath);
            $lastDotPart = end($parts);
            $potentialSpecPath =
                $dir .
                '/' .
                str_replace(
                    '.spec.json',
                    '/' . $lastDotPart . '.spec.json',
                    $internalPath
                );

            if (file_exists($potentialSpecPath)) {
                $finalSpecFilePath = $potentialSpecPath;
                break;
            }
        }

        if (!isset($finalSpecFilePath)) {
            throw new Exception(
                '[SSpecs] The requested dotpath spec "' .
                    $specDotPath .
                    '" does not resolve to any existing spec file...'
            );
        }

        // read the spec file
        $specJson = json_decode(file_get_contents($finalSpecFilePath), true);

        // make sure we have an object
        $specJson = \Sugar\convert\toObject($specJson);

        // resolve extends and "@" references
        $specJson = $this->resolve($specJson);

        // check if we have a ".preview.png" file alongside the spec file
        $potentialPreviewUrl = str_replace(
            '.spec.json',
            '.preview.png',
            $finalSpecFilePath
        );
        if (file_exists($potentialPreviewUrl)) {
            if (@is_callable($this->settings->previewUrl)) {
                $args = (object) [
                    'path' => $potentialPreviewUrl,
                    'name' => $specName,
                    'specs' => $internalDotPath,
                    'specsObj' => $specJson,
                ];
                $specJson->preview = call_user_func(
                    $this->settings->previewUrl,
                    $args
                );
            }
        }

        // if we have an internal spec dotpath
        if (isset($internalSpecDotPath)) {
            return \Sugar\ar\get($specJson, $internalSpecDotPath);
        }

        // models
        if ($finalSettings->models) {
            $folderPath = dirname($finalSpecFilePath);
            $glob = $folderPath . '/*.' . $specName . '.model.json';
            $files = glob($glob);
            if (count($files)) {
                $specJson->models = (object) [];
                foreach ($files as $filePath) {
                    $modelJson = json_decode(file_get_contents($filePath));
                    $fileName = @array_pop(explode('/', $filePath));
                    $name = str_replace('.model.json', '', $fileName);
                    $modelName = explode('.', $name)[0];

                    // handle the potential "preview.png" file(s) alongside the model one
                    $potentialModelPreviewUrl = str_replace(
                        '.model.json',
                        '.preview.png',
                        $filePath
                    );

                    if (
                        file_exists($potentialModelPreviewUrl) &&
                        @is_callable($this->settings->previewUrl)
                    ) {
                        $modelJson->preview = call_user_func(
                            $this->settings->previewUrl,
                            (object) [
                                'path' => $potentialModelPreviewUrl,
                                'name' => $name,
                                'specs' => $internalDotPath,
                                'specsObj' => $specJson,
                                'modelObj' => $modelJson,
                            ]
                        );
                    }
                    // handle "metas"
                    if ($finalSettings->metas) {
                        $modelJson->metas = (object) [
                            'path' => $filePath,
                            'dir' => dirname($filePath),
                            'name' => $name,
                            'specs' => $specDotPath,
                        ];
                    }
                    // set the model in the json
                    $specJson->models->{$modelName} = $modelJson;
                }
            }
        }

        // add metas about the spec file read
        if ($finalSettings->metas) {
            $specJson->metas = (object) [
                'path' => $finalSpecFilePath,
                'dir' => dirname($finalSpecFilePath),
                'name' => $specName,
                'specs' => $internalDotPath,
            ];
        }

        // return the getted specJson
        return $specJson;
    }
}
