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
    public function __construct($settings)
    {
        $this->settings = (object) array_merge_recursive(
            [
                'namespaces' => [],
                'sFrontspecSettings' => [],
            ],
            (array) $settings
        );

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
                        'read' => function () use ($that, $dotpath) {
                            return $that->read($dotpath);
                        },
                    ]);
                }
            }
        }

        return $results;
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
    public function read($specDotPath)
    {
        $finalValue;

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
                '[SSpecs.read] The passed dotpath ' .
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

        $finalSpecFilePath;

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

        // traverse each values to resolve them if needed
        $specJson = \Sugar\object\deepMap($specJson, function ($p, $v) use (
            $specJson
        ) {
            return $this->resolve($v, $specJson);
        });

        // make sure we have an object
        $specJson = \Sugar\convert\toObject($specJson);

        // handle "extends" property
        $specJson = \Sugar\object\deepMap($specJson, function (
            $prop,
            $value,
            &$object
        ) {
            if ($prop == 'extends') {
                if (substr($value, 0, 1) == '@') {
                    throw new Exception(
                        'The "extends": "' .
                            $value .
                            '" property cannot start with an "@"'
                    );
                }
                $extendsJson = $this->read($value);
                $extendsJson = \Sugar\convert\toObject($extendsJson);

                $keys = array_keys(get_object_vars($extendsJson));
                $object_vars = get_object_vars($extendsJson);
                foreach ($object_vars as $propertyName => $propertyValue) {
                    if (property_exists($object, $propertyName)) {
                        var_dump($propertyName);
                        $object->$propertyName = \Sugar\object\deepMerge(
                            $extendsJson,
                            $object
                        );
                    } elseif ($propertyName != 'extends') {
                        $object->$propertyName = $propertyValue;
                    }
                }
            }
            return $value;
        });

        // if we have an internal spec dotpath
        if (isset($internalSpecDotPath)) {
            return \Sugar\ar\get($specJson, $internalSpecDotPath);
        }

        // return the getted specJson
        return $specJson;
    }

    /**
     * This method take a value (string, boolean, etc...) and try to resolve it
     * if it is something like "@this.props...", or "@sugar.views...", etc...
     */
    private function resolve($value, $specJson)
    {
        $newValue = $value;
        if (is_string($value)) {
            if (str_starts_with($value, '@this')) {
                $internalDotPath = str_replace('@this.', '', $value);
                $newValue = \Sugar\ar\get($specJson, $internalDotPath);
                if (is_array($newValue) ||  is_object($newValue)) {
                    $newValue = \Sugar\object\deepMap($newValue, function (
                        $p,
                        $v
                    ) use ($newValue) {
                        return $this->resolve($v, $newValue);
                        return $v;
                    });
                }
            } elseif (str_starts_with($value, '@')) {
                $dotPath = str_replace('@', '', $value);
                $spec = $this->read($dotPath);
                $newValue = $spec;
            }
        }
        return $newValue;
    }
}
