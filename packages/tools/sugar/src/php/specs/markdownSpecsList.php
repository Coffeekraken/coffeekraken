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
 * @param       {String[]}          $specs                  The list of specs you want to display
 * @param       {Object}            [$details=[]]           An associative array or an object that specify each specs details like `{margin:{title:'Margin',description':'Manage margins'}}`
 * @return      {String}                                    The markdown list string
 *
 * @example       php
 * $markdown = \Sugar\specs\markdownSpecsList(['margin','padding'], [
 *   "margin" => [
 *      "title" => "Margin",
 *      "description" => "Manage the margins with ease
 *   ]
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function markdownSpecsList(array $specs, $details = [])
{
    // make sure we have an associative array for the details
    $details = \Sugar\convert\toArray($details);

    // default details
    $defaults = [
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
            'description' => 'Manage the paddings with responsive capabilities',
        ],
        'margin' => [
            'title' => 'Margins',
            'description' => 'Manage the margins with responsive capabilities',
        ],
    ];

    // merge the details
    $finalDetails = \Sugar\ar\deepMerge($defaults, $details);

    // init the list array
    $listArray = [];

    // loop on each wanted specs
    foreach ($specs as $spec) {
        // title
        $title = $spec;
        if (isset($finalDetails[$spec]['title'])) {
            $title = $finalDetails[$spec]['title'];
        }

        // description
        $description = '';
        if (isset($finalDetails[$spec]['description'])) {
            $description = $finalDetails[$spec]['description'];
        }

        // built item str
        $str = '- **' . $title . '**';
        if ($description !== '') {
            $str = $str . ': ' . $description;
        }

        // add item in the list
        array_push($listArray, $str);
    }

    // return the generated list
    return implode(PHP_EOL, $listArray);
}
