<?php

// get the Thorin class
require_once 'core/Sugar.php';

Sugar::requireFolder(dirname(__FILE__), [
    'recursive' => true,
    'exclude' => [
        dirname(__FILE__).'/core/Sugar.php',
        dirname(__FILE__).'/__wip__',
        dirname(__FILE__).'/autoload.php',
        dirname(__FILE__).'/views/blade'    
    ]
]);