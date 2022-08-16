<?php

return new \Twig\TwigFunction('frontspecOg', function ($ogObj) {
    return \Sugar\frontspec\og($ogObj);
});
