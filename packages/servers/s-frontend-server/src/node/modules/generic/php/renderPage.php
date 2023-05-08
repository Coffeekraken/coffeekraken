<?php

// require the vendors
$nodeModulesVendorsPath = realpath(
    __DIR__ . '/../../../../../../../../autoload.php'
);
require_once $nodeModulesVendorsPath;

// set some environment variables
$_ENV['S_NODES_DATA'] = true;
$_ENV['ENV'] = 'development';

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

// read the page json
$pageFileJson = json_decode(file_get_contents($params['pageFile']));

$viewRenderer = new SViewRenderer([
    'sharedData' => [
        'page' => $params['page'],
    ],
]);
$renderRes = $viewRenderer->renderPage($pageFileJson, function (
    $component
) use ($nodesDir) {
    $filePath = $nodesDir . '/' . $component->uid . '.json';

    if (!file_exists($filePath)) {
        return;
    }

    $data = json_decode(file_get_contents($filePath));
    return $data;
});

print \Sugar\html\expandPleasantCssClassnames($renderRes);

// $loader = new \Twig\Loader\FilesystemLoader();
// foreach ($params->rootDirs as $dir) {
//     if (file_exists($dir)) {
//         $loader->addPath($dir);
//     }
// }
// $loader->addPath('/');
// $twig = new \Twig\Environment($loader, [
//     // 'cache' => $params->cacheDir . '/twig',
//     'debug' => true,
//     'cache' => false,
// ]);
// $twig->addExtension(new \Twig\Extension\DebugExtension());

// // init twig with Sugar power
// $twig = \Sugar\twig\initTwig($twig, $loader);

// // ensure we send an array to the renderer
// $data = \Sugar\convert\toArray($data);

// try {
//     $html = \Sugar\html\expandPleasantCssClassnames(
//         $twig->render($params->viewPath, $data)
//     );
//     // $html = \Sugar\classname\patchHtml($html);
//     print $html;
// } catch (Exception $e) {
//     print $e;
// }
