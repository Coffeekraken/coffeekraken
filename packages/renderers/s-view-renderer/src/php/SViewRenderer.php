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
    public function __construct($settings = [])
    {
        if ($settings instanceof SViewRendererSettings) {
            $this->settings = $settings;
        } else {
            $this->settings = new SViewRendererSettings($settings);
        }
    }

    public function renderPage($pageJson, $loadComponent = null)
    {
        $loader = new \Twig\Loader\FilesystemLoader($this->settings->rootDirs);
        $twig = new \Twig\Environment($loader, [
            'cache' => $this->settings->cacheDir,
        ]);

        \Sugar\twig\initTwig($twig);

        if (!isset($pageJson->layout)) {
            $pageJson->layout = 'main';
        }

        // print '<pre>';
        // var_dump($pageJson);

        $renderNodes = function ($nodes, $renderNodes) use (
            $twig,
            $loadComponent
        ) {
            $html = [];

            foreach ($nodes as $id => $node) {
                if (isset($node->nodes)) {
                    return $renderNodes($node->nodes, $renderNodes);
                } else {
                    // render the node
                    if (is_callable($loadComponent)) {
                        $data = $loadComponent($node);
                        $viewName = array_pop(explode('.', $data->specs));
                        $viewPath = preg_replace(
                            '/^views\./',
                            '',
                            $data->specs
                        );
                        $viewPath = str_replace('.', '/', $viewPath);
                        $viewPath = $viewPath . '/' . $viewName . '.twig';
                        $twig->render(
                            $viewPath,
                            \Sugar\convert\toArray($data->values)
                        );
                    }

                    array_push($html, $node->id);
                }
            }

            return implode(PHP_EOL, $html);
        };

        print '<pre>';
        var_dump($renderNodes($pageJson->nodes, $renderNodes));

        // return $_SERVER['DOCUMENT_ROOT'];
    }

    public function _getFinalViewPath($viewDotPath) {

        $finalViewPath;



        const handledViewsExtensions: string[] = Object.keys(
            SViewRenderer.engines,
        );

        // direct view path
        if (__fs.existsSync(viewDotPath)) {
            return viewDotPath;
        }

        // direct from the rootDirs
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i];
            if (__fs.existsSync(`${rootDir}/${viewDotPath}`)) {
                return `${rootDir}/${viewDotPath}`;
            }
        }

        // doted path
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i],
                viewName = viewDotPath.split('.').slice(-1)[0],
                viewPath = viewDotPath.replace(/\./gm, '/'),
                globPart = `@(${handledViewsExtensions.join('|')})`;

            const potentialViewGlob1 = `${rootDir}/${viewPath}.${globPart}`,
                potentialViewGlob2 = `${rootDir}/${viewPath}/${viewName}.${globPart}`;

            let potentialPath;
            let matches = __glob.sync(potentialViewGlob1);

            if (matches && matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    potentialPath = matches[j];
                    // exclude .data files
                    if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                        continue;
                    }
                    finalViewPath = potentialPath;
                    break;
                }
            } else {
                // try to add the name of the view again like
                // if it is stored in a folder with the same name
                // retry again with new glob string
                matches = __glob.sync(potentialViewGlob2);
                if (matches && matches.length) {
                    for (let j = 0; j < matches.length; j++) {
                        potentialPath = matches[j];
                        // exclude .data files
                        if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                            continue;
                        }
                        finalViewPath = potentialPath;
                        break;
                    }
                }
            }

            // @ts-ignore
            if (finalViewPath) {
                break;
            }
        }

        // // remove all the engines extensions from the viewPath
        // Object.keys(SViewRenderer.engines).forEach((ext) => {
        //     viewDotPath = viewDotPath.replace(`.${ext}`, '');
        // });

        // detect and save the view doted path or the view template string
        if (
            viewDotPath.split(' ').length === 1 &&
            viewDotPath.trim() === viewDotPath
        ) {
            // check if we can find the view path passed
            if (__path.isAbsolute(viewDotPath)) {
                if (__fs.existsSync(viewDotPath)) {
                    // throw new Error(
                    //   `Sorry but the absolute path to the view "<cyan>${viewDotPath}</cyan>" does not exist...`
                    // );
                    finalViewPath = viewDotPath;
                }
            } else {
            }
        } else {
            // throw new Error(
            //   `<red>[SView]</red> It seems that the passed viewPath "<yellow>${viewPath}</yellow>" argument is not a valid path`
            // );
        }

        // @ts-ignore
        return finalViewPath;
    }

}
