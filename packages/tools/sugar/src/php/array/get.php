<?php

namespace Sugar\ar;

function get($arr, $path, $separator = '.')
{
    $keys = explode($separator, $path);
    $value = $arr;

    foreach ($keys as $key) {
        $value = $value[$key];
    }

    return $value;
}
