module.exports = function (path, options) {
    console.log('path', path);

    // Call the defaultResolver, so we leverage its cache, error handling, etc.
    return options.defaultResolver(path, {
        ...options,
        // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
        packageFilter: (pkg) => {
            console.log(pkg);

            return {
                ...pkg,
                // Alter the value of `main` before resolving the package
                main: pkg.module || pkg.main,
            };
        },
    });
};
