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
 * @param       {SViewRendererSettings}          [$settings=[]]              An instance of the SViewRendererSettings class to configure your views renderer
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Support for ```twig``` render engine
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
        'blade.php' => 'SViewRendererEngineBlade',
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
     * Load a data file for the passed view path
     */
    private function _loadDataFileForView($viewPath)
    {
        $viewMetas = $this->getViewMetas($viewPath);

        $dataFilePath;
        $dataFileExt;
        foreach (['php', 'js', 'json'] as $ext) {
            $potentialFilePath =
                $viewMetas->dir .
                '/' .
                $viewMetas->filenameWithoutExt .
                '.data.' .
                $ext;
            if (file_exists($potentialFilePath)) {
                $dataFilePath = $potentialFilePath;
                $dataFileExt = $ext;
                break;
            }
        }

        if (!isset($dataFilePath)) {
            return [];
        }

        return $this->_loadDataFile($dataFilePath);
    }

    /**
     * Load a data file
     */
    private function _loadDataFile($filePath)
    {
        $relFilePath = str_replace(
            $this->settings->rootDir . '/',
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
        }

        $data = [];
        switch ($extension) {
            case 'php':
                $data = require $filePath;
                break;
            case 'json':
                $data = json_decode(file_get_contents($filePath), true);
                break;
            case 'js':
                $output = [];
                $tmpFilePath = dirname($filePath) . '/execFromPhp.js';
                $relPath = str_replace(
                    $this->settings->rootDir . '/',
                    '',
                    $tmpFilePath
                );
                $nodeFile = [
                    'import __fn from "./' . basename($filePath) . '";',
                    'const sharedData = ' .
                    json_encode($this->settings->sharedData) .
                    ';',
                    // 'import __SSugarConfig from "@coffeekraken/s-sugar-config";',
                    'async function _exec() {',
                    // '   await __SSugarConfig.load();',
                    '   console.log(JSON.stringify(await __fn(sharedData)));',
                    '   process.exit(0);',
                    '}',
                    '_exec();',
                ];

                file_put_contents($tmpFilePath, implode(PHP_EOL, $nodeFile));
                $data = exec(
                    'node --experimental-json-modules --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node ' .
                        $relPath,
                    $output,
                    $result
                );
                unlink($tmpFilePath);
                $data = json_decode(implode('', $output));

                if (isset($data->filePath)) {
                    print_r($data);
                    $data = json_decode(file_get_contents($data->filePath));
                }

                break;
            default:
                throw new Exception(
                    'The data file "' .
                        $filePath .
                        '" is not a supported format, at least for now...'
                );
        }
        return $data;
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
                if (!file_exists($filePath)) {
                    continue;
                }
                // load the data from the file
                $data = $this->_loadDataFile($filePath);

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

    public function getViewMetas($viewDotPath)
    {
        $parts = explode('.', $viewDotPath);
        $viewName = array_pop($parts);
        $viewPath = $this->_getFinalViewPath($viewDotPath);
        $filename = basename($viewPath);
        $filenameWithoutExt = $filename;

        // if no file path
        if (!isset($viewPath)) {
            throw new Exception(
                'The passed viewDotPath "' .
                    $viewDotPath .
                    '" does not resolve to any view file...'
            );
        }

        // get the engine extension
        $extension;
        foreach (SViewRenderer::$engines as $ext => $engineId) {
            if (str_ends_with($viewPath, $ext)) {
                $filenameWithoutExt = str_replace(
                    '.' . $ext,
                    '',
                    $filenameWithoutExt
                );
                $extension = $ext;
                break;
            }
        }

        // get the engine instance
        $engineInstance = $this->_getEngineInstance($extension);

        // return the view metas
        return (object) [
            'name' => $viewName,
            'path' => $viewPath,
            'filename' => basename($viewPath),
            'filenameWithoutExt' => $filenameWithoutExt,
            'dir' => dirname($viewPath),
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

        // nodeLoader from nodeLoaderPath
        if (
            !$nodeLoader &&
            isset($this->settings->nodeLoaderPath) &&
            file_exists($this->settings->nodeLoaderPath)
        ) {
            $nodeLoader = require_once $this->settings->nodeLoaderPath;
        }

        // nodeLoader from settings
        if (!$nodeLoader && isset($this->settings->nodeLoader)) {
            $nodeLoader = $this->settings->nodeLoader;
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
                        $nodes[isset($n->uid) ? $n->uid : $i] = $renderNodes(
                            [$i => $n],
                            $renderNodes
                        );
                    }
                }

                // load the node data. See @specim3n/specimen ISRenderableNode type
                if (is_callable($nodeLoader)) {
                    $renderableNode = $nodeLoader($node);
                }

                if ($node->type == 'container') {
                    $renderableNode = (object) [
                        'specs' => 'sugar.views.bare.nude',
                        'values' => [],
                    ];
                }

                if (!isset($renderableNode->view)) {
                    array_push(
                        $html,
                        '<div class="s-carpenter-app_error">Your "' .
                            $node->uid .
                            '" (' .
                            $node->type .
                            ') node does not have any view attached...</div>'
                    );
                    continue;
                }

                // render the node
                $viewMetas = $this->getViewMetas($renderableNode->view);

                // load data from the ".data.php/json" file alongside the
                // node file
                $data = $this->_loadDataFileForView($viewMetas->path);

                // if the returned data is callbable
                if (is_callable($data)) {
                    $data = $data();
                }

                if (!$data) {
                    $data = [];
                }

                $renderResult = $viewMetas->engineInstance->render(
                    $viewMetas->path,
                    array_merge_recursive(
                        [
                            'nodes' => $nodes,
                            'uid' => $node->uid,
                        ],
                        $sharedData,
                        (array) $data,
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

        $layoutRenderResult = $viewMetas->engineInstance->render(
            $viewMetas->path,
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
            $globPart = '{' . implode(',', $handledViewsExtensions) . '}';

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

        if ($finalViewPath == $viewDotPath) {
            throw new Exception(
                '[SViewRenderer] No suitable view found for "' .
                    $viewDotPath .
                    '"...'
            );
        }

        return $finalViewPath;
    }
}
