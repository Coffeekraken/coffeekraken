<?php
namespace Sugar\markdown;

require_once(__DIR__.'/../_libs/Parsedown.php');


/**
 * @name        toHtml
 * @namespace            php.markdown
 * @type        Function
 * @platform        php
 * @status          beta
 * 
 * This method simply render your passed markdown to HTML using the AMATING Parsedown library.
 * 
 * @param       {String}        $markdown           The markdown to render
 * @param      {Boolean}       [$inline=true]         Whether to render inline or block
 * @return      {String}                            The rendered HTML
 * 
 * @example      php
 * Sugar\markdown\toHtml('...');
 * 
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toHtml($markdown, $inline = true) {
    $parsedown = new \Parsedown();
    if ($inline) return $parsedown->line($markdown);
    else return $parsedown->text($markdown);
}
