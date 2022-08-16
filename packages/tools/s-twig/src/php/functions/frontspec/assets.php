<?php

return new \Twig\TwigFunction('frontspecAssets', function (
    $assets,
    $cacheBuster
) {
    return \Sugar\frontspec\assets($assets, $cacheBuster);
});
