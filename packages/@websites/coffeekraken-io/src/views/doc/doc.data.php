<?php

$docmapInstance = new SDocmap();
$docmap = $docmapInstance->read();

$requestedDoc = $_SERVER['REQUEST_URI'];

$command =
    'sugard markdown.build --inPath "' .
    __DIR__ .
    '/../../doc/00-getStarted/00-overview.md.twig" --save false --target html --print';

$output = [];
// exec($command, $output);

return [
    'docmap' => $docmap,
    // 'body' => implode(PHP_EOL, $output),
];
