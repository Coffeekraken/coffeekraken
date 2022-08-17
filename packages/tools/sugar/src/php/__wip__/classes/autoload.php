<?php

// quick function to require all files inside a specific folder
function t_require_classes_folder($folder) {
    foreach (scandir(dirname(__FILE__) . '/' . $folder) as $filename) {
        $path = dirname(__FILE__) . '/' . $folder . '/' . $filename;
        if (is_file($path) && $filename !== '.DS_Store') {
			// require the file
			require $path;
        }
    }
}

print 'COCOCOCOCCO';

// core
t_require_classes_folder('core');

// util
t_require_classes_folder('util');
