<?php

namespace thorin;

/**
 * Render a view with the data passed to it and return it
 *
 * @param       {String}        $slug       The view slug to render relative to the path.views config
 * @param       {Array}         [$data=null]       The data array to pass as extracted variables to the view
 * @return      {String}                    The rendered view
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function render($slug, $data = []) {
    extract($data);
	$slug = rtrim($slug, '.php');
	ob_start();
	require \Thorin::str_tailslash(\Thorin::config('path.views')) . $slug . '.php';
	return ob_get_clean();
}
