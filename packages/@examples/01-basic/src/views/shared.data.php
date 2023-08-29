<?php

return [
    'carpenter' => true,
    'menu' => [
        'primary' => [
            'items' => [
                [
                    'link' => [
                        'url' => '/',
                        'text' => 'Menu #1',
                    ],
                ],
                [
                    'link' => [
                        'url' => '/',
                        'text' => 'Menu #2',
                    ],
                    'children' => [
                        [
                            'link' => [
                                'url' => '/',
                                'text' => 'Menu #2.1',
                            ],
                        ],
                        [
                            'link' => [
                                'url' => '/',
                                'text' => 'Long menu item',
                            ],
                        ],
                    ],
                ],
                [
                    'link' => [
                        'url' => '/',
                        'text' => 'Menu #3',
                    ],
                ],
            ],
        ],
    ],
];
