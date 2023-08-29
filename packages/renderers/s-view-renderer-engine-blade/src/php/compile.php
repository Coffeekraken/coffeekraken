<?php
// require the vendors
$nodeModulesVendorsPath = realpath(__DIR__ . '/../../../../../autoload.php');
require_once $nodeModulesVendorsPath;

// set some environment variables
$_ENV['S_NODES_DATA'] = true;
$_ENV['ENV'] = 'development';

$params = [];

if (file_exists($argv[1])) {
    $params = json_decode(file_get_contents($argv[1]));
}

// prepare data to pass it to the template engine
$data = \Sugar\convert\toArray($params->data);

// shared data file path
if (isset($data['_sharedDataFilePath'])) {
    $sharedData = json_decode(file_get_contents($data['_sharedDataFilePath']));
    $data = array_merge((array) $sharedData, (array) $data);
}

// $_ENV data
if (isset($data['$_ENV'])) {
    $_ENV = array_merge($_ENV, $data['$_ENV']);
}

// $_SERVER data
if (isset($data['$_SERVER'])) {
    $_SERVER = array_merge($_SERVER, $data['$_SERVER']);
}

// preparing the paths
$viewName = str_replace('.blade.php', '', $params->viewDotPath);

// add the default sugar views path
$params->rootDirs = array_merge(
    $params->rootDirs,
    \SViews\blade\getDefaultViewDirs()
);

$blade = new eftec\bladeone\BladeOne(
    $params->rootDirs,
    $params->cacheDir . '/blade'
    // BladeOne::MODE_DEBUG
);
// $blade->setMode(BladeOne::MODE_DEBUG);

// ensure we send an array to the renderer
$data = \Sugar\convert\toArray($data);

$html = \Sugar\html\expandPleasantCssClassnames(
    $blade->run($viewName, (array) $data)
);
// $html = \Sugar\classname\patchHtml($html);
print $html;
