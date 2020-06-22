<?php

function compile($viewsPath, $view, $data, $tmpPath) {
	// prepare data to pass it to the template engine
	$data = json_decode(json_encode($data), FALSE);
	$data = (array) $data;
	// require the vendors
  require_once 'vendor/autoload.php';
  // preparing the paths
  $viewName = str_replace('.blade.php', '', $view);
  $viewName = str_replace('.php', '', $viewName);
  // render the view using blade
	$views = $viewsPath;
	$cache = $tmpPath;
	$blade = new Philo\Blade\Blade($views, $cache);
	return $blade->view()->make($viewName, $data)->render();
}
