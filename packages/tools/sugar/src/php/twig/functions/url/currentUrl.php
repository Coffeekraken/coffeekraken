<?php

/**
 * @name        currentUrl
 * @namespace   php.twig.functions.url
 * @type        TwigFunction
 * @platform    twig
 * @status      beta
 *
 * This twig function allows you to get the current url
 *
 * @return      {String}                        The current url
 *
 * @snippet             __currentUrl()
 *
 * @example       twig
 * {{ __currentUrl() }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__currentUrl', function (): string {
    return \Sugar\url\currentUrl();
});
