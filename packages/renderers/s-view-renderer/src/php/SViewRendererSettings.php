<?php

class SViewRendererSettings
{
    /**
     * @name           rootDir
     * @type            String
     * @default         $_ENV['S_FRONTEND_PATH'] || $_SERVER['DOCUMENT_ROOT']
     *
     * Specify the folder from where to build the pathes like "cacheDir", etc...
     * By default, it will take the $_ENV['S_FRONTEND_DIR'] variable and if this is not set,
     * it will take the $_SERVER['DOCUMENT_ROOT'] one.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $rootDir;

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
     * @name           nodeLoader
     * @type            Function
     * @default         null
     *
     * Specify a function that will be called for each nodes defined in the page file.
     * This function has as responsability to return some data to be injected inside the view at render.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $nodeLoader;

    /**
     * @name           nodeLoaderPath
     * @type            String
     * @default         $this->rootDir . '/src/nodes/nodeLoader.php'
     *
     * Specify a path to a .php file that return a node loader function.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $nodeLoaderPath;

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

        if (!isset($this->cacheDir)) {
            $this->cacheDir = $this->rootDir . '/.local/cache/views';
        }

        if (!isset($this->nodeLoaderPath)) {
            $this->nodeLoaderPath =
                $this->rootDir . '/src/nodes/nodeLoader.php';
        } elseif (!file_exists($this->nodeLoaderPath)) {
            throw new Exception(
                '[SViewRendererSettings] Your nodeLoaderPath "' .
                    $this->nodeLoaderPath .
                    '" file does not exists...'
            );
        }

        // add the src/views/shared.data.php file
        array_push(
            $this->sharedDataFiles,
            $this->rootDir . '/src/views/shared.data.php'
        );

        // handle complexe rootDirs
        $this->rootDirs = array_merge(
            $this->rootDirs,
            [$this->rootDir . '/src/views'],
            \Sugar\twig\getDefaultViewDirs(),
            \Sugar\blade\getDefaultViewDirs()
        );
    }
}
