<?php
// require the vendors
$nodeModulesVendorsPath = realpath(__DIR__ . '/../../../../../autoload.php');
require_once $nodeModulesVendorsPath;

// set some environment variables
$_ENV['S_SPECS_VALUES'] = true;
$_ENV['ENV'] = 'development';

$params = [];

if (file_exists($argv[1])) {
    $params = json_decode(file_get_contents($argv[1]));
}

// prepare data to pass it to the template engine
$data = (object) $params->data;

// shared data file path
if ($data->_sharedDataFilePath && file_exists($data->_sharedDataFilePath)) {
    $sharedData = json_decode(file_get_contents($data->_sharedDataFilePath));
    $data = array_merge((array) $sharedData, (array) $data);
}

// preparing the paths
$viewName = str_replace('.blade.php', '', $params->viewDotPath);

// print $params->cacheDir;

// add the default sugar views path
$params->rootDirs = array_merge(
    $params->rootDirs,
    \Sugar\blade\getDefaultViewDirs()
);

$blade = new eftec\bladeone\BladeOne(
    $params->rootDirs,
    $params->cacheDir . '/blade'
    // BladeOne::MODE_DEBUG
);
// $blade->setMode(BladeOne::MODE_DEBUG);

$html = \Sugar\html\expandPleasantCssClassnames(
    $blade->run($viewName, (array) $data)
);
// $html = $blade->run($viewName, (array) $data);
// $html = \Sugar\classname\patchHtml($html);
print $html;
