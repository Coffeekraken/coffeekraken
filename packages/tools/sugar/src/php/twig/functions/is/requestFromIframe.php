<?php

/**
 * @name        requestFromIframe
 * @namespace   php.twig.functions.is
 * @type        TwigFunction
 * @platform    twig
 * @status      beta
 *
 * This twig function allows you to check if the request has been made from an iframe or not.
 *
 * @return      {String}                        true if requested from iframe, false if not
 *
 * @snippet             __requestFromIframe()
 *
 * @example       twig
 * {% if __requestFromIframe() %}
 *      // ...
 * {% endif %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__requestFromIframe', function (): bool {
    return \Sugar\is\requestFromIframe();
});
