<?php

namespace Sugar\draftJs;

/**
 * @name            generateDeepStyleObject
 * @namespace       php.draftJs
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Create deep object used to render DraftJs output (HTML, markdown, etc...)
 *
 * @param       {Array}         $block                      DraftJs JSON object
 * @param       {String}        $style                      Typo to render
 * @param       {Integer}       $char_position              Position in content treatment - Start to 0
 * @param       {Integer}       $keyInlineStylePosition     Index of current InlineStyle treatment
 * @param       {Array}         $breakPoint                 Contains deep elements to close
 * @return      {Array}         Deep object
 *
 * @since       2.0.0
 * @author    Paul Balanche <pb@buzzbrothers.ch> (https://buzzbrothers.ch)
 */
function generateDeepStyleObject(
    $block,
    $style = null,
    &$char_position = 0,
    &$keyInlineStylePosition = -1,
    &$breakPoint = []
) {
    $content = [''];

    $textSplitted = str_split($block['text']);
    foreach ($textSplitted as $key => $character) {
        if ($key < $char_position) {
            continue;
        }

        if (isset($breakPoint[$key]) && $breakPoint[$key] > 0) {
            $breakPoint[$key]--;
            break;
        }

        // Opening sub-style
        foreach (
            $block['inlineStyleRanges']
            as $keyInlineStyle => $inlineStyle
        ) {
            if (
                $inlineStyle['offset'] == $key &&
                $keyInlineStyle > $keyInlineStylePosition
            ) {
                $keyInlineStylePosition = $keyInlineStyle;
                $content[] = generateDeepStyleObject(
                    $block,
                    $inlineStyle['style'],
                    $char_position,
                    $keyInlineStyle,
                    $breakPoint
                );
                $content[] = '';
                continue 2;
            }
        }

        $content[count($content) - 1] .= $character;
        $char_position++;

        // Closing sub-style
        foreach (
            $block['inlineStyleRanges']
            as $keyInlineStyle => $inlineStyle
        ) {
            if ($inlineStyle['offset'] + $inlineStyle['length'] == $key + 1) {
                $breakPoint[$key + 1] = isset($breakPoint[$key + 1])
                    ? $breakPoint[$key + 1] + 1
                    : 1;
            }
        }
    }

    if (empty($content[0])) {
        array_shift($content);
    }

    if (empty($content[count($content) - 1])) {
        unset($content[count($content) - 1]);
    }

    return [
        'type' => $style,
        'content' => $content,
    ];
}
