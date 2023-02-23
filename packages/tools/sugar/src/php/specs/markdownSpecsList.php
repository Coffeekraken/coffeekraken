<?php

namespace Sugar\specs;

/**
 * @name        markdownSpecsList
 * @namespace   php.specs
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function allows you to display a markdown specs list with some default specifications info like "margin", "padding", "gap", etc...
 * You can abviously override the defaults with your own details object that MUST contains an "title" and "description" property for each spec
 *
 * @param       {Object}          $specs                  The specs object you want to list
 * @param       {Object}            [$override=[]]           An object to override some of the passed specs
 * @return      {String}                                    The markdown list string
 *
 * @snippet             \Sugar\specs\markdownSpecsList($1);
 *
 * @example       php
 * $markdown = \Sugar\specs\markdownSpecsList($mySpecs);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function markdownSpecsList($specs, $override = [])
{
    // make sure we have objects for the details
    $specs = \Sugar\convert\toObject($specs);
    $override = \Sugar\convert\toObject($override);

    // default details
    $defaults = \Sugar\convert\toObject([
        'props' => [
            'id' => [
                'title' => 'Id',
                'description' => 'A uniqid for your component',
            ],
            'title' => [
                'title' => 'Title',
                'description' => 'Component title',
            ],
            'intro' => [
                'title' => 'Intro',
                'description' => 'Component intro',
            ],
            'text' => [
                'title' => 'Text',
                'description' => 'Component text',
            ],
            'direction' => [
                'title' => 'Direction',
                'description' => 'Component direction (vertical, horizontal)',
            ],
            'image' => [
                'title' => 'Image',
                'description' => 'Component image with url, title and alt',
            ],
            'cta' => [
                'title' => 'Cta',
                'description' =>
                    'Component CTA (call to action) with color, url, target, etc...',
            ],
            'frontspec' => [
                'title' => 'Frontspec',
                'description' =>
                    'The frontspec.json object that stands in the root of your project',
            ],
            'color' => [
                'title' => 'Color',
                'description' => 'Specify the color you want',
            ],
            'link' => [
                'Title' => 'Link',
                'description' =>
                    'A link composed by a target url, a title and a target like "_blank", etc...',
            ],
            'gap' => [
                'title' => 'Gap',
                'description' => 'The gap beetween the grid or flex cells',
            ],
            'attributes' => [
                'title' => 'Attributes',
                'description' => 'Custom attributes to place on the component',
            ],
            'html' => [
                'title' => 'Html',
                'description' => 'Some html to place in the component',
            ],
            'spacing' => [
                'title' => 'Spacing',
                'description' => 'Manage the vertical spacings',
            ],
            'padding' => [
                'title' => 'Paddings',
                'description' =>
                    'Manage the paddings with responsive capabilities',
            ],
            'margin' => [
                'title' => 'Margins',
                'description' =>
                    'Manage the margins with responsive capabilities',
            ],
        ],
    ]);

    foreach (array_keys((array) $defaults->props) as $spec) {
        if (!isset($specs->props->$spec)) {
            unset($defaults->props->$spec);
        }
    }

    // merge the details
    $finalSpecs = \Sugar\object\deepMerge($specs, $defaults, $override);

    // init the list array
    $listArray = [];

    $specsKeys = array_keys((array) $specs->props);

    // loop on each wanted specs
    foreach ($specsKeys as $spec) {
        $requiredStr = '';
        if (isset($finalSpecs->props->$spec->required)) {
            $requiredStr = ' **required**';
        }

        // add item in the list
        @array_push(
            $listArray,
            '#### ' .
                $finalSpecs->props->$spec->title .
                ' `' .
                $spec .
                '`' .
                $requiredStr
        );
        @array_push($listArray, $finalSpecs->props->$spec->description);

        if (isset($finalSpecs->props->$spec->default)) {
            @array_push(
                $listArray,
                '- Default     : `' .
                    \Sugar\string\toString($finalSpecs->props->$spec->default) .
                    '`'
            );
        }

        @array_push(
            $listArray,
            '- Type        : `' .
                $finalSpecs->props->$spec->type .
                '`' .
                PHP_EOL
        );

        if (isset($finalSpecs->props->$spec->options)) {
            @array_push($listArray, '- Options: ');

            foreach ($finalSpecs->props->$spec->options as $option) {
                @array_push(
                    $listArray,
                    '   - ' . $option->name . ': `' . $option->value . '`'
                );
            }
        }

        if (isset($finalSpecs->props->$spec->examples)) {
            foreach (
                $finalSpecs->props->$spec->examples
                as $language => $example
            ) {
                array_push($listArray, '```' . $language);
                array_push(
                    $listArray,
                    implode(PHP_EOL, (array) $example->code)
                );
                array_push($listArray, '```');
            }
        }
    }

    // return the generated list
    return implode(PHP_EOL, $listArray);
}
