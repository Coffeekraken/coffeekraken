<?php

$docmapInstance = new SDocmap();
$docmap = $docmapInstance->read();

$requestedDoc = $_SERVER['REQUEST_URI'];

$searchResult = $docmapInstance->search(
    (object) [
        'slug' => $requestedDoc,
    ]
);

$markdownFilePath;
$output = [];

$item = \Sugar\object\firstItem($searchResult->items);
if ($item) {
    $markdownFilePath = $item->path;
    $command =
        'sugard markdown.build --inPath "' .
        $markdownFilePath .
        '" --save false --target html --print';
    exec($command, $output);
}

return [
    'docmap' => $docmap,
    'body' => implode(PHP_EOL, $output),
];
