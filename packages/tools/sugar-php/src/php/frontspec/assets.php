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
 * \Sugar\frontspec\assets($frontspec->assets);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function assets($assets, $cacheBuster = '')
{
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

        switch ($extension) {
            case 'css':
                if (
                    \Sugar\is\absolutePath($finalSrc) ||
                    \Sugar\is\url($finalSrc)
                ) {
                    array_push(
                        $assetsStr,
                        '<link rel="stylesheet" id="' .
                            $name .
                            '" href="' .
                            \Sugar\string\replaceTokens($finalSrc) .
                            '" />'
                    );
                } else {
                    array_push(
                        $assetsStr,
                        '<link rel="stylesheet" id="' .
                            $name .
                            '" href="/' .
                            \Sugar\string\replaceTokens($finalSrc) .
                            '" />'
                    );
                }
                break;
            case 'js':
            case 'ts':
                $type = isset($asset->type) ? $asset->type : 'text/javascript';
                $nomodule = isset($asset->nomodule) ? 'nomodule' : '';

                if (
                    \Sugar\is\absolutePath($finalSrc) ||
                    \Sugar\is\url($finalSrc)
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
                            \Sugar\string\replaceTokens($finalSrc) .
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
                            \Sugar\string\replaceTokens($finalSrc) .
                            '"></script>'
                    );
                }
                break;
            default:
                print 'EEE' . $extension;
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
