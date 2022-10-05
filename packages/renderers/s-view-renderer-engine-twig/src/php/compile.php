<?php
// require the vendors
$nodeModulesVendorsPath = realpath(__DIR__ . '/../../vendor/autoload.php');
require_once $nodeModulesVendorsPath;

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
$viewName = str_replace('.twig', '', $params->viewDotPath);

$loader = new \Twig\Loader\FilesystemLoader($params->rootDirs);
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

try {
    print \Sugar\html\expandPleasantCssClassnames(
        $twig->render(str_replace('.', '/', $viewName) . '.twig', $data)
    );
} catch (Exception $e) {
    print $e;
}
