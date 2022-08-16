<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2721aa943321803b7937f604b254cd1d
{
    public static $files = array (
        '320cde22f66dd4f5d3fd621d3e88b98f' => __DIR__ . '/..' . '/symfony/polyfill-ctype/bootstrap.php',
        '0e6d7bf4a5811bfa5cf40c5ccd6fae6a' => __DIR__ . '/..' . '/symfony/polyfill-mbstring/bootstrap.php',
        '78db8c28b14c7bfed69e96ff3e40df7b' => __DIR__ . '/..' . '/coffeekraken/sugar/src/php/autoload.php',
        'f2253d8f8098dc4b1a55127954feb7dc' => __DIR__ . '/..' . '/coffeekraken/s-twig/src/php/autoload.php',
    );

    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'Twig\\' => 5,
        ),
        'S' => 
        array (
            'Symfony\\Polyfill\\Mbstring\\' => 26,
            'Symfony\\Polyfill\\Ctype\\' => 23,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Twig\\' => 
        array (
            0 => __DIR__ . '/..' . '/twig/twig/src',
        ),
        'Symfony\\Polyfill\\Mbstring\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-mbstring',
        ),
        'Symfony\\Polyfill\\Ctype\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-ctype',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2721aa943321803b7937f604b254cd1d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2721aa943321803b7937f604b254cd1d::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit2721aa943321803b7937f604b254cd1d::$classMap;

        }, null, ClassLoader::class);
    }
}
