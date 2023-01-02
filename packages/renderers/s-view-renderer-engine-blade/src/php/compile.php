<?php
// require the vendors
$nodeModulesVendorsPath = realpath(__DIR__ . '/../../vendor/autoload.php');
$monorepoVendorsPath = realpath(__DIR__ . '/../../../vendor/autoload.php');

if ($nodeModulesVendorsPath) {
    require_once $nodeModulesVendorsPath;
} elseif ($monorepoVendorsPath) {
    require_once $monorepoVendorsPath;
}
// use Jenssegers\Blade\Blade;
use eftec\bladeone\BladeOne;

// set some environment variables
$_ENV['S_SPECS_VALUES'] = true;

$params = [];

if (file_exists($argv[1])) {
    $params = json_decode(file_get_contents($argv[1]));
}

// prepare data to pass it to the template engine
$data = (object) $params->data;

// shared data file path
if ($data->_sharedDataFilePath) {
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

$blade = new BladeOne(
    $params->rootDirs,
    $params->cacheDir . '/blade'
    // BladeOne::MODE_DEBUG
);
// $blade->setMode(BladeOne::MODE_DEBUG);
print \Sugar\html\expandPleasantCssClassnames(
    $blade->run($viewName, (array) $data)
);
