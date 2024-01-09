<?php

namespace SViews\html;

/**
 * @name            cls
 * @namespace            php.html
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to pass two arguments. The first is the class names you always want, and
 * the second are the class names you want when either the $_ENV['S_VIEWS_CLS_STYLE'] is set to `true`,
 * or that the passed local variable `$view.clsStyle` is set to true.
 *
 * @param       {String}        $cls            The classes you want space separated
 * @param       {String}        $styleCls       The style classes you want space separated
 * @param       {}
 * @return      {String}                        The proper classes depending on your $_ENV['S_VIEWS_CLS_STYLE'] or $view.clsStyle variables
 *
 * @snippet         \SViews\html\cls($1, $2);
 *
 * @example         php
 * \SViews\html\cls('_my-element', 's-typo:h1');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function cls(string $cls, string $styleCls, \SViews\types\SViewSettings $view): string {
    
    $finalClasses = $cls;
    if (isset($view)) {
        $view = (object) $view;
    }

    if (isset($view) && isset($view->clsStyle)) {
        if ($view->clsStyle == true) {
            $finalClasses .= ' ' . $styleCls;
        }
    } else if (isset($_ENV['S_VIEWS_CLS_STYLE']) && $_ENV['S_VIEWS_CLS_STYLE'] === true) {
        $finalClasses .= ' ' . $styleCls;
    }

    return $finalClasses;
}