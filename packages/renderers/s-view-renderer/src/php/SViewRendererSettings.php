<?php

class SViewRendererSettings
{
    /**
     * @name           rootDirs
     * @type            String[]
     *
     * Specify the folders where to search for views.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $rootDirs = [];

    /**
     * @name           cacheDir
     * @type            String[]
     * @default         $_SERVER['DOCUMENT_ROOT'] . '/.local/cache/views'
     *
     * Specify the folder where to store the cache.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $cacheDir;

    /**
     * @name           defaultEngine
     * @type            String
     * @default         twig
     *
     * Specify the default engine to use when not any is specified at the dotpath start like "twig://...", etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $defaultEngine = 'twig';

    /**
     * @name           enginesSettings
     * @type            String[]
     *
     * Specify some engines settings. Object must contain each engine settings under his own property. For blade, the property name is "blade"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $enginesSettings = [];

    /**
     * @name           dataFile
     * @type            Boolean
     * @default         false
     *
     * Specify if you want to make use of .data.json/php files alongside the views or not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $dataFile = false;

    /**
     * @name           dataFunction
     * @type            Boolean
     * @default         false
     *
     * Specify a function that will be called for each render to provide some data if wanted
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $dataFunction;

    /**
     * @name           sharedData
     * @type            String[]
     *
     * Specify some shared data to pass to each views
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $sharedData = [];

    /**
     * @name           sharedDataFiles
     * @type            String[]
     *
     * Specify some shared data files to load
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $sharedDataFiles = [];

    public function __construct($settings)
    {
        $this->cacheDir = $_SERVER['DOCUMENT_ROOT'] . '/.local/cache/views';

        foreach ($settings as $key => $value) {
            if (is_array($this->{$key}) && is_array($value)) {
                $this->{$key} = array_merge_recursive($this->{$key}, $value);
            } else {
                $this->{$key} = $value;
            }
        }

        // handle complexe rootDirs
        $this->rootDirs = array_merge(
            $this->rootDirs,
            [$_SERVER['DOCUMENT_ROOT'] . '/src/views'],
            \Sugar\twig\getDefaultViewDirs(),
            \Sugar\blade\getDefaultViewDirs()
        );
    }
}
