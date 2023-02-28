<?php

/**
 * @name            SClassmap
 * @namespace       php
 * @type            Class
 * @platform        php
 * @status          wip
 *
 * This package allows you to compress your css classes/variables,
 * to patch them in your HTML as well as to proxy js native functions
 * like classList.add, style.setProperty, etc, to reflect your minified classnames.
 *
 * @param       {Object|Array}          [$settings=[]]              Some settings to configure your instance
 *
 * @setting         {String}            [path=null]                 Specify the path to the classmap file to load
 * @setting         {Object|Array}            [sFrontspecSettings=[]]           Some settings to pass to the SFrontspec class in order to read the `frontspec.json` content
 *
 * @example         php
 * $classmap = new SClassmap();
 * $patchedHtml = $classmap->patchHtml('...');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SClassmap
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
     * @name          $map
     * @type          Array
     *
     * Store the actual classmap
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $map;

    /**
     * Constructor
     */
    public function __construct($settings)
    {
        $this->settings = (object) array_merge_recursive(
            [
                'map' => null,
                'path' => null,
                'sFrontspecSettings' => [],
            ],
            (array) $settings
        );

        if (isset($this->settings->map)) {
            $this->$map = $this->settings->map;
        } elseif (isset($this->settings->path)) {
            $this->$map = $this->read($this->settings->path);
        } else {
            // read the frontspec
            $frontspec = new \SFrontspec($this->settings->sFrontspecSettings);
            $frontspecJson = $frontspec->read();
            if (isset($frontspecJson->classmap->path)) {
                $this->map = $this->read($frontspecJson->classmap->path);
            }
        }
    }

    /**
     * @name            patchHtml
     * @type            Function
     * @platform        php
     * @status          beta
     *
     * This method allows you to patch the passed html and replace in it all the available
     * classes in the map
     *
     * @param       {String}            $html           The html to patch
     * @return      {String}                            The patched html
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public function patchHtml(string $html)
    {
        // grab do not touch tags
        preg_match_all(
            '/<code[^>]*>(.*?)<\/code>/s',
            $html,
            $doNotTouchTagCode
        );
        foreach ($doNotTouchTagCode[0] as $idx => $tag) {
            $html = str_replace(
                $tag,
                '[sClassmapClassesTagCode:' . $idx . ']',
                $html
            );
        }

        $reg = '/class="[a-zA-Z0-9_\-:@\s]+"/';
        $parts = [];
        $matches = preg_match_all($reg, $html, $parts);

        foreach ($parts[0] as $class) {
            $classes = str_replace(['class="', '"'], '', $class);
            $classNames = explode(' ', $classes);
            $classesArray = [];
            foreach ($classNames as $className) {
                if (isset($this->map->$className)) {
                    array_push($classesArray, $this->map->$className);
                    // array_push($classesArray, $className);
                } else {
                    array_push($classesArray, $className);
                }
            }

            $html = str_replace(
                $class,
                'class="' . implode(' ', $classesArray) . '"',
                $html
            );
        }

        // restore do not touch tags
        preg_match_all(
            '/\[sClassmapClassesTagCode:[0-9]{1,999}\]/ms',
            $html,
            $restoreTagCode
        );
        preg_match_all(
            '/\[sExpandColonClassesTagTemplate\:[0-9]{1,999}\]/ms',
            $html,
            $restoreTagTemplate
        );

        foreach ($restoreTagCode[0] as $idx => $tag) {
            $html = str_replace($tag, $doNotTouchTagCode[0][$idx], $html);
        }
        foreach ($restoreTagTemplate[0] as $idx => $tag) {
            $html = str_replace($tag, $doNotTouchTagTemplate[0][$idx], $html);
        }

        return $html;
    }

    /**
     * @name            read
     * @type            Function
     * @platform        php
     * @status          beta
     *
     * This method allows you to read a spec file and/or a value inside the passed spec file.
     *
     * @param       {String}        $path                 The classmap.json file path to read
     * @return      {Any}                               The classmap json
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public function read($path)
    {
        $json = json_decode(file_get_contents($path));
        $this->map = $json;
        return $json;
    }
}
