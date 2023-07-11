<?php

return function ($node) {
    $nodePath = __DIR__ . '/' . $node->uid . '.node.json';
    if (!file_exists($nodePath)) {
        return;
    }
    return json_decode(file_get_contents($nodePath));
};
