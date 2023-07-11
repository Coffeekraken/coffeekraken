<?php

$versions = json_decode(file_get_contents(__DIR__ . '/../../versions.json'));

return [
    'versions' => $versions,
];

// export default function () {
//   const commitId = __childProcess
//     .execSync('git log -n1 --format="%h"')
//     .toString()
//     .trim();
//   const commitDate = __childProcess
//     .execSync('git log -1 --format=%cd ')
//     .toString()
