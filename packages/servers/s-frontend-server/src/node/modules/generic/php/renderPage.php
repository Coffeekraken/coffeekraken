<?php

// require the vendors
$nodeModulesVendorsPath = realpath(
    __DIR__ . '/../../../../../../../../autoload.php'
);
require_once $nodeModulesVendorsPath;

// set some environment variables
$_ENV['S_SPECS_DATA'] = true;
$_ENV['ENV'] = 'development';

// $_SERVER data
if (isset($data['$_SERVER'])) {
    $_SERVER = array_merge($_SERVER, $data['$_SERVER']);
}

// $_ENV data
if (isset($data['$_ENV'])) {
    $_ENV = array_merge($_ENV, $data['$_ENV']);
}

// process the passed args... can be a lot better I know...
$pageFilePath = str_replace('"', '', explode(':', $argv[1])[1]);
$documentRoot = str_replace('"', '', explode(':', $argv[2])[1]);
$storeDir = str_replace('"', '', explode(':', $argv[3])[1]);

$_SERVER['DOCUMENT_ROOT'] = $documentRoot;

// handle if page file does not exists
if (!file_exists($pageFilePath)) {
    print 'The passed page file path "' .
        $pageFilePath .
        '" does not exists...';
    return;
}

// read the page json
$pageFileJson = json_decode(file_get_contents($pageFilePath));

$viewRenderer = new SViewRenderer();
$renderRes = $viewRenderer->renderPage($pageFileJson, function (
    $component
) use ($storeDir) {
    $data = json_decode(
        file_get_contents($storeDir . '/' . $component->id . '.json')
    );
    return $data;
});

print $renderRes;

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
