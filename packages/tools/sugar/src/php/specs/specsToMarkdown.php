<?php

namespace Sugar\specs;

/**
 * @name        specsToMarkdown
 * @namespace   php.specs
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function allows you to display a markdown specs list with some default specifications info like "margin", "padding", "gap", etc...
 * You can abviously override the defaults with your own details object that MUST contains an "title" and "description" property for each spec
 *
 * @param       {String[]}          $specs                  The list of specs you want to display
 * @param       {Object}            [$override=[]]           An associative array or an object that specify each specs details like `{margin:{title:'Margin',description':'Manage margins'}}`
 * @return      {String}                                    The markdown list string
 *
 * @example       php
 * $markdown = \Sugar\specs\specsToMarkdown(['margin','padding'], [
 *   "margin" => [
 *      "title" => "Margin",
 *      "description" => "Manage the margins with ease
 *   ]
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function specsToMarkdown($specs, $override = [])
{
    // make sure we have objects
    $specs = \Sugar\convert\toObject($specs);
    $override = \Sugar\convert\toObject($override);

    // override the specs with the override object
    $specs = \Sugar\object\deepMerge($specs, $override);

    $lines = [];

    // title
    if (isset($specs->title)) {
        array_push($lines, '# ' . $specs->title);
        array_push($lines, '');
    }

    // description
    if (isset($specs->description)) {
        array_push($lines, $specs->description);
        array_push($lines, '');
    }

    // properties
    if (isset($specs->props)) {
        array_push($lines, '## Properties');
        $list = \Sugar\specs\markdownSpecsList($specs);
        array_push($lines, $list);
        array_push($lines, '');
    }

    // examples
    if (isset($specs->examples)) {
        $examples = \Sugar\convert\toArray($specs->examples);

        array_push($lines, '## Usage');
        array_push($lines, '');

        foreach ($examples as $key => $example) {
            // title
            if (isset($example['title'])) {
                array_push($lines, '#### ' . $example['title']);
                array_push($lines, '');
            }

            // description
            if (isset($example['description'])) {
                array_push($lines, $example['description']);
                array_push($lines, '');
            }

            // code
            if (isset($example['code'])) {
                array_push($lines, '```' . $key);
                if (is_array($example['code'])) {
                    array_push($lines, implode(PHP_EOL, $example['code']));
                } else {
                    array_push($lines, $example['code']);
                }
                array_push($lines, '```');
                array_push($lines, '');
            }
        }
    }

    // specification
    array_push($lines, '## JSON Specifications');

    $code = implode(PHP_EOL, [
        '```js',
        'export default ' . json_encode($specs, JSON_PRETTY_PRINT),
        '```',
    ]);

    array_push($lines, $code);
    array_push($lines, '');

    // return the generated list
    return implode(PHP_EOL, $lines);
}
