<?php

namespace SViews\twig;

/**
 * @name        registerFunctions
 * @namespace   php.twig.functions
 * @type        Function
 * @platform    php
 * @status      beta
 *
 * This function allows you to register only the functions on your twig instance
 *
 * @param       {Twig}      $twig           The twig instance on which to register the functions
 * @return      {Twig}                      The twig instance
 *
 * @snippet             \Sugar\twig\registerFunctions($1);
 *
 * @example        php
 * \Sugar\twig\registerFunctions($twig);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function registerFunctions($twig)
{
    // Array
    $toArray = require __DIR__ . '/cast/toArray.php';
    $twig->addFunction($toArray);

    // Cast
    $toObject = require __DIR__ . '/cast/toObject.php';
    $twig->addFunction($toObject);

    // Classmap
    $readClassmap = require __DIR__ . '/classmap/readClassmap.php';
    $twig->addFunction($readClassmap);

    // Css
    $classes = require __DIR__ . '/css/classes.php';
    $twig->addFunction($classes);

    $colorClasses = require __DIR__ . '/css/colorClasses.php';
    $twig->addFunction($colorClasses);

    $containerClasses = require __DIR__ . '/css/containerClasses.php';
    $twig->addFunction($containerClasses);

    $gapClasses = require __DIR__ . '/css/gapClasses.php';
    $twig->addFunction($gapClasses);

    $layoutCss = require __DIR__ . '/css/layoutCss.php';
    $twig->addFunction($layoutCss);

    $marginClasses = require __DIR__ . '/css/marginClasses.php';
    $twig->addFunction($marginClasses);

    $mediaQuery = require __DIR__ . '/css/mediaQuery.php';
    $twig->addFunction($mediaQuery);

    $paddingClasses = require __DIR__ . '/css/paddingClasses.php';
    $twig->addFunction($paddingClasses);

    $spacesClasses = require __DIR__ . '/css/spacesClasses.php';
    $twig->addFunction($spacesClasses);

    $spacingClasses = require __DIR__ . '/css/spacingClasses.php';
    $twig->addFunction($spacingClasses);

    // Frontspec
    $frontspecAssets = require __DIR__ . '/frontspec/assets.php';
    $twig->addFunction($frontspecAssets);

    $frontspecFavicon = require __DIR__ . '/frontspec/favicon.php';
    $twig->addFunction($frontspecFavicon);

    $frontspecOg = require __DIR__ . '/frontspec/og.php';
    $twig->addFunction($frontspecOg);

    $frontspecMetas = require __DIR__ . '/frontspec/metas.php';
    $twig->addFunction($frontspecMetas);

    $frontspecRead = require __DIR__ . '/frontspec/readFrontspec.php';
    $twig->addFunction($frontspecRead);

    // Html
    $attrs = require __DIR__ . '/html/attrs.php';
    $twig->addFunction($attrs);

    $id = require __DIR__ . '/html/id.php';
    $twig->addFunction($id);

    // Is
    $requestFromIframe = require __DIR__ . '/is/requestFromIframe.php';
    $twig->addFunction($requestFromIframe);

    // json
    $jsonDecode = require __DIR__ . '/json/jsonDecode.php';
    $twig->addFunction($jsonDecode);

    // lod (level of details)
    $lodClasses = require __DIR__ . '/lod/lodClasses.php';
    $twig->addFunction($lodClasses);

    // node
    $nodeDataTemplate = require __DIR__ . '/node/nodeDataTemplate.php';
    $twig->addFunction($nodeDataTemplate);

    // Object
    $deepDiff = require __DIR__ . '/object/deepDiff.php';
    $twig->addFunction($deepDiff);

    $filter = require __DIR__ . '/object/filter.php';
    $twig->addFunction($filter);

    $get = require __DIR__ . '/object/get.php';
    $twig->addFunction($get);

    $props = require __DIR__ . '/object/props.php';
    $twig->addFunction($props);

    // page
    $pageDataTemplate = require __DIR__ . '/page/pageDataTemplate.php';
    $twig->addFunction($pageDataTemplate);

    // picture
    $pictureSourcesFromMedia = require __DIR__ .
        '/picture/pictureSourcesFromMedia.php';
    $twig->addFunction($pictureSourcesFromMedia);

    // specs
    $markdownSpecsList = require __DIR__ . '/specs/markdownSpecsList.php';
    $twig->addFunction($markdownSpecsList);

    $readSpec = require __DIR__ . '/specs/readSpec.php';
    $twig->addFunction($readSpec);

    $readViewSpec = require __DIR__ . '/specs/readViewSpec.php';
    $twig->addFunction($readViewSpec);

    $specsToMarkdown = require __DIR__ . '/specs/specsToMarkdown.php';
    $twig->addFunction($specsToMarkdown);

    $specsDataAttribute = require __DIR__ . '/specs/specsDataAttribute.php';
    $twig->addFunction($specsDataAttribute);

    // String
    $idCompliant = require __DIR__ . '/string/idCompliant.php';
    $twig->addFunction($idCompliant);

    $replace = require __DIR__ . '/string/replace.php';
    $twig->addFunction($replace);

    $uniqid = require __DIR__ . '/string/uniqid.php';
    $twig->addFunction($uniqid);

    // Url
    $currentUrl = require __DIR__ . '/url/currentUrl.php';
    $twig->addFunction($currentUrl);

    return $twig;
}
