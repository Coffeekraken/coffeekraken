<?php

// get the current user request uri
$request = substr($_SERVER['REQUEST_URI'], 1);

// build the "$view" variable used in the layout
$view = __DIR__ . '/views/' . ($request ?: 'index') . '.php';

// require the layout
require __DIR__ . '/views/layout/default.php';
