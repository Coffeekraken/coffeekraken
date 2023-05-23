<?php

class SDocmapSettings
{
    /**
     * @name           rootDir
     * @type            String
     * @default         $_ENV['S_FRONTEND_PATH'] || $_SERVER['DOCUMENT_ROOT']
     *
     * Specify the folder from where to find the docmap.json file.
     * By default, it will take the $_ENV['S_FRONTEND_DIR'] variable and if this is not set,
     * it will take the $_SERVER['DOCUMENT_ROOT'] one.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $rootDir;

    /**
     * @name           customMenu
     * @type            Record<string, Function>
     * @default         "styleguide" and "specs"
     *
     * Specify some custom menus you want to generate when reading the docmap.json file.
     * These will be saved under the "customMenu" property of the readed docmap object.
     * Each custom menu specified here must be a closure what take as input:
     * - namespace: The docmap item namespace
     * - docmapItem: The docmap item to be processed
     * If your function returns true, the item will be present in your custom menu, otherwise it will not.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $customMenu;

    public function __construct($settings = [])
    {
        foreach ($settings as $key => $value) {
            if (is_array($this->{$key}) && is_array($value)) {
                $this->{$key} = array_merge_recursive($this->{$key}, $value);
            } else {
                $this->{$key} = $value;
            }
        }

        if (!isset($this->rootDir)) {
            $this->rootDir = $_SERVER['DOCUMENT_ROOT'];
            if (isset($_ENV['S_FRONTEND_DIR'])) {
                $this->rootDir = $_ENV['S_FRONTEND_DIR'];
            }
        }

        if (!isset($this->customMenu)) {
            $this->customMenu = (object) [];
        }

        // styleguide custom menu
        if (!isset($this->customMenu->styleguide)) {
            $this->customMenu->styleguide = function ($prop, $value) {
                if (!isset($value->slug)) {
                    return true;
                }
                if (
                    preg_match('/^([a-zA-Z0-9-_@\/]+)?\/doc\//', $value->slug)
                ) {
                    return true;
                }
                return false;
            };
        }

        // specs custom menu
        if (!isset($this->customMenu->specs)) {
            $this->customMenu->specs = function ($prop, $value) {
                if (!isset($value->slug)) {
                    return true;
                }
                if (
                    preg_match('/^([a-zA-Z0-9-_@\/]+)?\/views\//', $value->slug)
                ) {
                    return true;
                }
                return false;
            };
        }
    }
}
