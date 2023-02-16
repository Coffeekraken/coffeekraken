<?php
// require the vendors
$nodeModulesVendorsPath = realpath(__DIR__ . '/../../vendor/autoload.php');
$monorepoVendorsPath = realpath(__DIR__ . '/../../../vendor/autoload.php');

if ($nodeModulesVendorsPath) {
    require_once $nodeModulesVendorsPath;
} elseif ($monorepoVendorsPath) {
    require_once $monorepoVendorsPath;
}

// require the sugar toolkit
$nodeModulesSugarPath = realpath(
    __DIR__ . '/../../../sugar/src/php/autoload.php'
);
$monorepoSugarPath = realpath(
    __DIR__ . '/../../../../tools/sugar/src/php/autoload.php'
);
if ($nodeModulesSugarPath) {
    require_once $nodeModulesSugarPath;
} elseif ($monorepoSugarPath) {
    require_once $monorepoSugarPath;
}

$params = json_decode($argv[1]);

if (!file_exists($params->filePath)) {
    print json_encode([
        'filePath' => $params->filePath,
        'error' => 'File not found',
    ]);
} else {
    // loading the file
    $data = require $params->filePath;

    // print json
    print json_encode($data);
}
