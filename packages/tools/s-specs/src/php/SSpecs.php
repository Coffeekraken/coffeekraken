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
        $this->settings = (object) $settings;
        if (!isset($this->settings->namespaces)) {
            throw new Exception(
                '[SSpecs] You MUST at least specify some "namespaces" folders to search specs files in...'
            );
        }
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
        $definesNamespacesKeys = array_keys((array) $definedNamespaces);

        $currentNamespace = '';
        foreach ($definesNamespacesKeys as $namespace) {
            if (str_starts_with($specDotPath, $namespace)) {
                $currentNamespace = $namespace;
                break;
            }
        }

        if (!$currentNamespace) {
            throw new Exception(
                '[SSpecs.read] The passed dotpath ' .
                    $specDotPath .
                    '" does not correspond to any registered namespaces which are:' .
                    implode("\n- ", $definesNamespacesKeys)
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
        $specJson = \Sugar\object\deepMap($specJson, function ($v) use (
            $specJson
        ) {
            return $this->resolve($v, $specJson);
        });

        // make sure we have an object
        $specJson = \Sugar\convert\arrayToObject($specJson);

        // check if the spec extends another
        if (isset($specJson->extends)) {
            $extendsJson = $this->read($specJson->extends);
            $extendsJson = \Sugar\convert\arrayToObject($extendsJson);
            $specJson = \Sugar\object\deepMerge($extendsJson, $specJson);
            unset($specJson->extends);
        }

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
