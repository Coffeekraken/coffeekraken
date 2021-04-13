<?php
// require the vendors
$nodeModulesVendorsPath = realpath(__DIR__.'/../../../../vendor/autoload.php');
$monorepoVendorsPath = realpath(__DIR__.'/../../../../vendor/autoload.php');
if ($nodeModulesVendorsPath) require_once($nodeModulesVendorsPath);
else if ($monorepoVendorsPath) require_once($monorepoVendorsPath);
use Jenssegers\Blade\Blade;
// use eftec\bladeone\BladeOne;

// require the sugar toolkit
$nodeModulesSugarPath = realpath(__DIR__.'/../../../../../sugar/src/php/autoload.php');
$monorepoSugarPath = realpath(__DIR__.'/../../../../../../tools/sugar/src/php/autoload.php');
if ($nodeModulesSugarPath) require_once($nodeModulesSugarPath);
else if ($monorepoSugarPath) require_once($monorepoSugarPath);

function compile($viewsFolders, $view, $data, $tmpPath) {

  // prepare data to pass it to the template engine
	$data = json_decode(json_encode($data), FALSE);
  $data = (array) $data;
  // preparing the paths
  $viewName = str_replace('.blade.php', '', $view);
  $blade = new Blade($viewsFolders, $tmpPath);
  return $blade->render($viewName, $data);

}
