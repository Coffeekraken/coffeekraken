<?php

// require the vendors
$nodeModulesVendorsPath = realpath(
    __DIR__ . '/../../../../../../../../autoload.php'
);
require_once $nodeModulesVendorsPath;

// set some environment variables
$_ENV['S_NODES_DATA'] = true;

$params = [];
if (file_exists($argv[1])) {
    $params = json_decode(file_get_contents($argv[1]), true);
}

// $_SERVER data
if (isset($params['$_SERVER'])) {
    $_SERVER = array_merge($_SERVER, $params['$_SERVER']);
}

// $_ENV data
if (isset($params['$_ENV'])) {
    $_ENV = array_merge($_ENV, $params['$_ENV']);
}

// handle if page file does not exists
if (!file_exists($params['pageFile'])) {
    print 'The passed page file path "' .
        $params['pageFile'] .
        '" does not exists...';
    return;
}

$nodesDir = $params['nodesDir'];

// read frontspec
$frontspec = new \SFrontspec();
$frontspecJson = $frontspec->read();

// read the page json
$pageFileJson = json_decode(file_get_contents($params['pageFile']));

$viewRenderer = new SViewRenderer([
    'sharedData' => [
        'frontspec' => $frontspecJson,
        'page' => $params['page'],
        'req' => $params['req'],
    ],
]);
$renderRes = $viewRenderer->renderPage($pageFileJson);

// function ($node) use (
//     $nodesDir
// ) {
//     $filePath = $nodesDir . '/' . $node->uid . '.json';

//     if (!file_exists($filePath)) {
//         return;
//     }

//     $data = json_decode(file_get_contents($filePath));
//     return $data;
// }

// expand classes
$renderRes = \Sugar\html\expandPleasantCssClassnames($renderRes);

// print the result
print $renderRes;
