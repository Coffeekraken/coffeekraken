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
 * @param     {Object}      $assets         The "assets" object of the frontspec
 * @param     {String}      [$cacheBuster='']      A string to be added to the asset url to bust cache
 * @return    {String}    The HTML code of the assets
 *
 * @example    php
 * \Sugar\frontspec\assets($frontspec);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function assets($frontspec, $cacheBuster = '')
{
    $frontspec = \Sugar\convert\toObject($frontspec);

    $assets = $frontspec->assets;
    $assetsStr = [];

    if (!$assets) {
        return '';
    }

    foreach ($assets as $name => $asset) {
        $extension = \Sugar\path\extension($asset->src);
        if (!$extension) {
            continue;
        }

        $finalSrc = $asset->src;
        if ($cacheBuster !== '') {
            $finalSrc = $finalSrc . '?' . $cacheBuster;
        }

        $id = $name;
        if (isset($asset->id)) {
            $id = $asset->id;
        }

        switch ($extension) {
            case 'css':
                if (
                    \Sugar\is\absolutePath($finalSrc) ||
                    \Sugar\is\url($finalSrc)
                ) {
                    array_push(
                        $assetsStr,
                        '<link id="' .
                            $id .
                            '" href="' .
                            \Sugar\string\replaceTokens($finalSrc) .
                            '" rel="stylesheet" />'
                    );
                } else {
                    array_push(
                        $assetsStr,
                        '<link id="' .
                            $id .
                            '" href="/' .
                            \Sugar\string\replaceTokens($finalSrc) .
                            '" rel="stylesheet" />'
                    );
                }
                break;
            case 'js':
            case 'ts':
                $type = isset($asset->type) ? $asset->type : 'text/javascript';
                $nomodule = isset($asset->nomodule) ? 'nomodule ' : '';
                $defer = $asset->defer ? 'defer ' : '';

                if (
                    \Sugar\is\absolutePath($finalSrc) ||
                    \Sugar\is\url($finalSrc)
                ) {
                    array_push(
                        $assetsStr,
                        '<script type="' .
                            $type .
                            '" id="' .
                            $id .
                            '" ' .
                            $nomodule .
                            $defer .
                            ' src="' .
                            \Sugar\string\replaceTokens($finalSrc) .
                            '"></script>'
                    );
                } else {
                    array_push(
                        $assetsStr,
                        '<script type="' .
                            $type .
                            '" id="' .
                            $id .
                            '" ' .
                            $nomodule .
                            $defer .
                            ' src="/' .
                            \Sugar\string\replaceTokens($finalSrc) .
                            '"></script>'
                    );
                }
                break;
            default:
                if (file_exists(realpath($finalSrc))) {
                    array_push(
                        $assetsStr,
                        file_get_contents(realpath($finalSrc))
                    );
                } else {
                    array_push($assetsStr, $finalSrc);
                }
                break;
        }
    }

    return implode(PHP_EOL, $assetsStr);
}
