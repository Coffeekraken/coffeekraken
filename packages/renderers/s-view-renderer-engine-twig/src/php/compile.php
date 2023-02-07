<?php

// require the vendors
$nodeModulesVendorsPath = realpath(__DIR__ . '/../../vendor/autoload.php');
require_once $nodeModulesVendorsPath;

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

$loader = new \Twig\Loader\FilesystemLoader();
foreach ($params->rootDirs as $dir) {
    if (file_exists($dir)) {
        $loader->addPath($dir);
    }
}
$loader->addPath('/');
$twig = new \Twig\Environment($loader, [
    // 'cache' => $params->cacheDir . '/twig',
    'debug' => true,
    'cache' => false,
]);
$twig->addExtension(new \Twig\Extension\DebugExtension());

// init twig with Sugar power
$twig = \Sugar\twig\initTwig($twig, $loader);

// ensure we send an array to the renderer
$data = \Sugar\convert\toArray($data);

// print '<pre>';
// print_r($params->viewPath);

try {
    $html = \Sugar\html\expandPleasantCssClassnames(
        $twig->render($params->viewPath, $data)
    );
    // $html = \Sugar\classname\patchHtml($html);
    print $html;
} catch (Exception $e) {
    print $e;
}
