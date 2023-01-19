<?php

/**
 * @name            SFrontspec
 * @namespace       php
 * @type            Class
 * @platform        php
 * @status          beta
 *
 * This class allows you to access the `frontspec.json` file that is usualy at the root of the frontend project.
 *
 * @param       {Object|Array}              [$settings=[]]              Some settings to configure your frontspec instance
 *
 * @setting        {String}                 [$path=$_ENV['S_FRONTSPEC_PATH'] || $_ENV['S_FRONTEND_PATH'] . '/frontspec.json']       The frontspec path. If not specified, it will try to find it by looking for the nearest `frontspec.json` file from the cwd
 *
 * @example         php
 * $frontspec = new SFrontspec();
 * $frontspecJson = $frontspec->read();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontspec
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
                'path' => isset($_ENV['S_FRONTSPEC_PATH']) 
                        ? $_ENV['S_FRONTSPEC_PATH']
                        : ((
                            isset($_ENV['S_FRONTEND_PATH'])
                        ) ? $_ENV['S_FRONTEND_PATH'] . '/frontspec.json'
                        : null),
            ],
            (array) $settings
        );
    }

    /**
     * This method simply load the frontspec.json file and process it like making the relative path absolute, etc...
     */
    private function _load(string $frontspecPath)
    {
        // load the file json
        $frontspecJson = json_decode(file_get_contents($frontspecPath));

        // format relative paths
        $frontspecJson = \Sugar\ar\deepMap($frontspecJson, function (
            $prop,
            $value
        ) use ($frontspecPath) {
            if ($value == null) {
                return null;
            }

            if (str_starts_with($value, './')) {
                return dirname($frontspecPath) .
                    '/' .
                    str_replace('./', '', $value);
            }
            return $value;
        });

        return $frontspecJson;
    }

    /**
     * @name            read
     * @type            Function
     * @platform        php
     * @status          beta
     *
     * This method allows you to read a spec file and/or a value inside the passed spec file.
     *
     * @param       {String}        [$frontspecPath=null]        A path to the frontspec file you want to load
     * @return      {Any}                               The requested spec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public function read(string $frontspecPath = null)
    {
        $finalFrontspecPath;

        // passed path
        if (isset($frontspecPath)) {
            $finalFrontspecPath = $frontspecPath;
        }

        // check if we have a passed finalFrontspecPath in the settings
        if (!isset($finalFrontspecPath) && isset($this->settings->path)) {
            $finalFrontspecPath = $this->settings->path;
        }

        // if no namespace found, try to get them from
        // the frontspec file
        if (
            !isset($finalFrontspecPath) &&
            file_exists(getcwd() . '/frontspec.json')
        ) {
            $finalFrontspecPath = getcwd() . '/frontspec.json';
        }

        // search using glob
        if (!isset($finalFrontspecPath)) {
            $potentialFrontspecPath = glob('**/frontspec.json');
            if (count($potentialFrontspecPath)) {
                $finalFrontspecPath = $potentialFrontspecPath[0];
            }
        }

        // error
        if (!file_exists($finalFrontspecPath)) {
            throw new Error(
                'The passed frontspec path "' .
                    $finalFrontspecPath .
                    '" does not exists'
            );
        }

        // load and return
        return $this->_load($finalFrontspecPath);
    }
}
