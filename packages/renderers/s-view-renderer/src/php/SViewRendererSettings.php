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
     *
     * Specify the folder where to store the cache.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $cacheDir;

    /**
     * @name           defaultEngine
     * @type            String[]
     *
     * Specify the default engine to use when not any is specified at the dotpath start like "twig://...", etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $defaultEngine = ['twig', 'blade'];

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
     * @name           defaultData
     * @type            String[]
     *
     * Specify some default data to pass to the view
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $defaultData = [];

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
