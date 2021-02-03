<?php

// get the Thorin class
require_once 'core/Sugar.php';

Sugar::requireFolder(__DIR__, [
    'recursive' => true,
    'exclude' => [
        __DIR__.'/core/Sugar.php',
        __DIR__.'/__wip__',
        __DIR__.'/autoload.php',
        __DIR__.'/views/blade'    
    ]
]);