<?php

/**
 * @name            SViewRenderer
 * @namespace       php
 * @type            Class
 * @platform        php
 * @status          beta
 *
 * This class represent a template that can be rendered using all the supported render engines listed in the features bellow.
 *
 * @param       {Object|Array}          [$settings=[]]              Some settings to configure your instance
 *
 * @setting         {Object|Array}            [namespaces=[]]             An array|object of namespace like "my.namespace" property with a simple array of folders where to search for specs files when using this namespace
 * @setting         {Object|Array}            [sFrontspecSettings=[]]           Some settings to pass to the SFrontspec class in order to read the `frontspec.json` content
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Support for ```twig``` render engine
 * @feature       2.0.0         Simply render your template using the ```render``` method that returns you back a nice SPromise instance resolved once the template has been rendered correctly
 *
 * @snippet         new SViewRenderer($1);
 * $template = new SViewRenderer($1);
 * $result = $template->render($1, $2);
 *
 * @example         php
 * $template = new SViewRenderer([
 *      "rootDirs": ["/my/cool/folder/where/to/search/for/views"]
 * ]);
 * $result = $template->render('my.view'', [
 *      "title" => "World"
 * ]);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SViewRenderer
{
    /**
     * @name       engines
     * @type      Array
     * @static
     *
     * Store the registered engines
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public static $engines = [
        'twig' => 'SViewRendererEngineTwig',
    ];

    /**
     * @name        $settings
     * @type        SViewRendererSettings
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
        if ($settings instanceof SViewRendererSettings) {
            $this->settings = $settings;
        } else {
            $this->settings = new SViewRendererSettings($settings);
        }
    }

    /**
     * Load the shared datas
     */
    private function _getSharedData()
    {
        // shared data from the settings
        $sharedData = $this->settings->sharedData;

        // shared data from files
        if (count($this->settings->sharedDataFiles)) {
            foreach ($this->settings->sharedDataFiles as $filePath) {
                $relFilePath = str_replace(
                    $_SERVER['DOCUMENT_ROOT'] . '/',
                    '',
                    $filePath
                );
                $parts = explode('.', $filePath);
                $extension = array_pop($parts);
                if (!file_exists($filePath)) {
                    \Sugar\console\log(
                        '[SViewRenderer] The registered shared data file "' .
                            $relFilePath .
                            '" does not exists...'
                    );
                    continue;
                }
                $data = [];
                switch ($extension) {
                    case 'php':
                        $data = require $filePath;
                        break;
                    case 'json':
                        $data = json_decode(file_get_contents($filePath), true);
                        break;
                    default:
                        throw new Exception(
                            'The data file "' .
                                $filePath .
                                '" is not a supported format, at least for now...'
                        );
                }
                // merge the data
                $sharedData = array_merge_recursive($sharedData, $data);
            }
        }
        return $sharedData;
    }

    /**
     * Get the engine instance back from the passed extension.
     */
    private $_enginesInstances = [];
    private function _getEngineInstance($extension)
    {
        // from cache
        if (isset($this->_enginesInstances[$extension])) {
            return $this->_enginesInstances[$extension];
        }

        // make sure we have an engine for this view
        if (!isset(SViewRenderer::$engines[$extension])) {
            throw new Exception(
                'The view extension "' .
                    $extension .
                    '" does not have any suitable engine to render it...'
            );
        }

        $engine = SViewRenderer::$engines[$extension];
        $this->_enginesInstances[$extension] = new $engine($this->settings);
        return $this->_enginesInstances[$extension];
    }

    public function render($viewDotPath, $data = [])
    {
    }

    private function getViewMetas($viewDotPath)
    {
        $parts = explode('.', $viewDotPath);
        $viewName = array_pop($parts);
        $viewPath = $this->_getFinalViewPath($viewDotPath);
        $parts = explode('.', $viewPath);
        $extension = array_pop($parts);
        $engineInstance = $this->_getEngineInstance($extension);

        if (!isset($viewPath)) {
            throw new Exception(
                'The passed viewDotPath "' .
                    $viewDotPath .
                    '" does not resolve to any view file...'
            );
        }

        return [
            'name' => $viewName,
            'path' => $viewPath,
            'extension' => $extension,
            'engineInstance' => $engineInstance,
        ];
    }

    public function renderPage($pageJson, $nodeLoader = null)
    {
        // make sure we have a layout
        if (!isset($pageJson->layout)) {
            $pageJson->layout = 'layouts.main';
        }

        // get the shared data
        $sharedData = $this->_getSharedData();

        // recursive render function
        $renderNodes = function ($nodes, $renderNodes = null) use (
            $nodeLoader,
            $sharedData
        ) {
            $html = [];

            foreach ($nodes as $idx => $node) {
                if ($node->type == 'root') {
                    continue;
                }

                $nodes = [];
                if (isset($node->nodes)) {
                    foreach ($node->nodes as $i => $n) {
                        $nodes[$i] = $renderNodes([$i => $n], $renderNodes);
                    }
                }

                // load the node data. See @specimen/specimen ISRenderableNode type
                if (is_callable($nodeLoader)) {
                    $renderableNode = $nodeLoader($node);
                }

                if (!isset($renderableNode->specs)) {
                    array_push(
                        $html,
                        '<div class="s-carpenter-app_error">Your "' .
                            $node->uid .
                            '" (' .
                            $node->type .
                            ') node does not have any data attached...</div>'
                    );
                    continue;
                }

                // render the node
                $viewMetas = $this->getViewMetas($renderableNode->specs);

                $renderResult = $viewMetas['engineInstance']->render(
                    $viewMetas['path'],
                    array_merge_recursive(
                        [
                            'nodes' => $nodes,
                            'uid' => $node->uid,
                        ],
                        $sharedData,
                        \Sugar\convert\toArray($renderableNode->values)
                    )
                );

                array_push($html, $renderResult);
            }

            return implode(PHP_EOL, $html);
        };

        // render the content
        $contentHtml = $renderNodes($pageJson->nodes, $renderNodes);

        // render the layout with the content rendered above
        $viewMetas = $this->getViewMetas($pageJson->layout);
        $layoutRenderResult = $viewMetas['engineInstance']->render(
            $viewMetas['path'],
            array_merge_recursive(
                [
                    'body' => $contentHtml,
                ],
                $sharedData
            )
        );

        return $layoutRenderResult;
    }

    /**
     * Get the final absolute view path from the dotpath
     */
    public function _getFinalViewPath($viewDotPath)
    {
        // remove the "views.*" in the
        $viewDotPath = preg_replace('/views\./', '', $viewDotPath);

        $finalViewPath = $viewDotPath;
        $handledViewsExtensions = array_keys((array) SViewRenderer::$engines);

        // direct view path
        if (file_exists($viewDotPath)) {
            return $viewDotPath;
        }

        // direct from the rootDirs
        for ($i = 0; $i < count($this->settings->rootDirs); $i++) {
            $rootDir = $this->settings->rootDirs[$i];
            if (file_exists($rootDir . '/' . $viewDotPath)) {
                return $rootDir . '/' . $viewDotPath;
            }
        }

        // doted path
        for ($i = 0; $i < count($this->settings->rootDirs); $i++) {
            $rootDir = $this->settings->rootDirs[$i];
            $parts = explode('.', $viewDotPath);
            $viewName = array_pop($parts);
            $viewPath = preg_replace('/\./', '/', $viewDotPath);
            $globPart = '{' . implode('|', $handledViewsExtensions) . '}';

            $potentialViewGlob1 = $rootDir . '/' . $viewPath . '.' . $globPart;
            $potentialViewGlob2 =
                $rootDir . '/' . $viewPath . '/' . $viewName . '.' . $globPart;

            $matches = glob($potentialViewGlob1, GLOB_BRACE);
            if ($matches) {
                for ($j = 0; $j < count($matches); $j++) {
                    $potentialPath = $matches[$j];
                    if (preg_match('/\.data\.[a-zA-Z0-9]+/', $potentialPath)) {
                        continue;
                    }
                    if (file_exists($potentialPath)) {
                        $finalViewPath = $potentialPath;
                        break;
                    }
                }
            } else {
                $matches = glob($potentialViewGlob2, GLOB_BRACE);
                if ($matches) {
                    for ($j = 0; $j < count($matches); $j++) {
                        $potentialPath = $matches[$j];
                        if (
                            preg_match('/\.data\.[a-zA-Z0-9]+/', $potentialPath)
                        ) {
                            continue;
                        }
                        if (file_exists($potentialPath)) {
                            $finalViewPath = $potentialPath;
                            break;
                        }
                    }
                }
            }
        }

        // detect and save the view doted path or the view template string
        if (
            count(explode(' ', $viewDotPath)) == 1 &&
            trim($viewDotPath) == $viewDotPath
        ) {
            // check if we can find the view path passed
            if (\Sugar\is\absolutePath($viewDotPath)) {
                if (file_exists($viewDotPath)) {
                    $finalViewPath = $viewDotPath;
                }
            }
        }

        return $finalViewPath;
    }
}
