<?php

namespace Sugar\frontspec;

/**
 * @name            assets
 * @namespace       php.frontspec
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Print the passed "assets" from the frontspec
 *
 * @param     {Object}      The "assets" object of the frontspec
 * @return    {String}    The HTML code of the assets
 *
 * @example    php
 * \Sugar\frontspec\assets($frontspec->assets);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function assets($assets)
{
    $assetsStr = [];

    if (!$assets) {
        return '';
    }

    foreach ($assets as $name => $asset) {
        $extension = \Sugar\path\extension($asset->src);
        switch ($extension) {
            case 'css':
                if (
                    \Sugar\is\absolutePath($asset->src) ||
                    \Sugar\is\url($asset->src)
                ) {
                    array_push(
                        $assetsStr,
                        '<link rel="stylesheet" id="' .
                            $name .
                            '" href="' .
                            \Sugar\string\replaceTokens($asset->src) .
                            '" />'
                    );
                } else {
                    array_push(
                        $assetsStr,
                        '<link rel="stylesheet" id="' .
                            $name .
                            '" href="/' .
                            \Sugar\string\replaceTokens($asset->src) .
                            '" />'
                    );
                }
                break;
            case 'js':
            case 'ts':
                $type = isset($asset->type) ? $asset->type : 'text/javascript';
                $nomodule = isset($asset->nomodule) ? 'nomodule' : '';

                if (
                    \Sugar\is\absolutePath($asset->src) ||
                    \Sugar\is\url($asset->src)
                ) {
                    array_push(
                        $assetsStr,
                        '<script type="' .
                            $type .
                            '" id="' .
                            $name .
                            '" ' .
                            $nomodule .
                            ' src="' .
                            \Sugar\string\replaceTokens($asset->src) .
                            '"></script>'
                    );
                } else {
                    array_push(
                        $assetsStr,
                        '<script type="' .
                            $type .
                            '" id="' .
                            $name .
                            '" ' .
                            $nomodule .
                            ' src="/' .
                            \Sugar\string\replaceTokens($asset->src) .
                            '"></script>'
                    );
                }
                break;
            default:
                if (file_exists(realpath($asset->src))) {
                    array_push(
                        $assetsStr,
                        file_get_contents(realpath($asset->src))
                    );
                } else {
                    array_push($assetsStr, $asset->src);
                }
                break;
        }
    }

    return implode(PHP_EOL, $assetsStr);
}
