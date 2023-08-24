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

// $_SERVER data
if (isset($data['$_SERVER'])) {
    $_SERVER = array_merge($_SERVER, $data['$_SERVER']);
}

// $_ENV data
if (isset($data['$_ENV'])) {
    $_ENV = array_merge($_ENV, $data['$_ENV']);
}

$loader = new \Twig\Loader\FilesystemLoader();
foreach ($params->rootDirs as $dir) {
    if (file_exists($dir)) {
        $loader->addPath($dir);
    }
}
$loader->addPath('/');
$twig = new \Twig\Environment($loader, [
    'debug' => true,
    'cache' => false,
]);
$twig->addExtension(new \Twig\Extension\DebugExtension());

// init twig with Sugar power
$twig = \SViews\twig\initTwig($twig, $loader);

// ensure we send an array to the renderer
$data = \Sugar\convert\toArray($data);

try {
    $html = \Sugar\html\expandPleasantCssClassnames(
        $twig->render($params->viewRelPath, $data)
    );
    // $html = \Sugar\classname\patchHtml($html);
    print $html;
} catch (Exception $e) {
    print $e;
}
