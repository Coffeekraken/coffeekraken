<?php

namespace Sugar\draftJs;

/**
 * @name            renderContent
 * @namespace       php.draftJs
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Return DraftJs HTML
 *
 * @param       {Array}         $deepStyleObject            Deep style object gathered using the `generateDeepStyleObject` function
 * @param       {Function}      $renderFunction             The render function that will take as parameter an array with the "type" and the "html" properties
 * @return      {String}                                    Returned HTML
 *
 * @since       2.0.0
 * @author    Paul Balanche <pb@buzzbrothers.ch> (https://buzzbrothers.ch)
 */
function renderContent($deepStyleObject, callable $renderFunction)
{
    $html = '';
    if (is_array($deepStyleObject)) {
        foreach ($deepStyleObject as $subContent) {
            if (is_array($subContent) && isset($subContent['content'])) {
                $html .= call_user_func_array($renderFunction, [
                    [
                        'type' =>
                            isset($subContent['type']) &&
                            $subContent['type'] != null
                                ? $subContent['type']
                                : null,
                        'group' => isset($subContent['group'])
                            ? $subContent['group']
                            : null,
                        'html' => renderContent(
                            $subContent['content'],
                            $renderFunction
                        ),
                    ],
                ]);
            } else {
                $html .= $subContent;
            }
        }
    }

    return $html;
}
