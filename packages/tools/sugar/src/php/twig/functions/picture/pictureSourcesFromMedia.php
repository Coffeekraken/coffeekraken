<?php

/**
 * @name            pictureSourcesFromMedia
 * @namespace            php.twig.functions
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function takes as input an object of media object.
 * This object MUST be structured with the name of the media (or the media query) wanted as
 * the key, and on object with a "url" as value.
 * It will then sort the object medias depending on the frontspec.json "media" settings.
 *
 * @param       {String}        $media              The media name or query you want
 * @return      {String}                         The resulting media query string
 *
 * @snippet             __sourceFromMedia($1);
 *
 * @example         twig
 * {!! __pictureSourcesFromMedia({
 *     desktop: {
 *          url: 'something.jpg'
 *     },
 *     mobile: {
 *          url: 'else.jpg'
 *     }
 * }) !!}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__pictureSourcesFromMedia', function ($media) {
    $frontspecMedia = \Sugar\frontspec\get('media');

    $media = \Sugar\convert\toArray($media);

    $sortedMedias = \Sugar\frontspec\sortMedia($frontspecMedia);
    $sortedMedias = array_reverse((array) $sortedMedias->queries);

    $sources = [];

    foreach ($sortedMedias as $m => $v) {
        if (!isset($media[$m]['url'])) {
            continue;
        }

        array_push(
            $sources,
            '<source id="' .
                $m .
                '" srcset="' .
                str_replace(' ', '%20', $media[$m]['url']) .
                '" media="' .
                \Sugar\css\mediaQuery($m) .
                '">'
        );
    }

    return implode('', $sources);

    return 'coco';
});
