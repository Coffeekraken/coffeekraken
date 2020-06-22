#!/usr/bin/env node

const fs = require("fs");
const favicons = require("favicons");
const program = require("commander");

// load package.json
let packageJson = {};
if (fs.existsSync("package.json")) {
  packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
}

// define api
program
  .version("1.0.0")
  .option(
    "-s, --source [value]",
    "Source file for favicon",
    "src/img/favicon.png"
  )
  .option(
    "-o, --output [value]",
    "Output folder for generated images paths",
    "dist/favicons"
  )
  .option(
    "-h, --html-output [value]",
    "File path in which to output the icons HTML",
    null
  )
  .option("-t, --theme [value]", "Theme color for browser chrome", "#fff")
  .option(
    "-b, --background [value]",
    "Background color for flattened icons",
    "#fff"
  )
  .option(
    "-p, --path [value]",
    "Path for overriding default icons path",
    "dist/favicons"
  )
  .parse(process.argv);

// app name
let appName = packageJson.name;
if (appName) {
  appName =
    appName.charAt(0).toUpperCase() + appName.slice(1).replace(/-/g, " ");
}
// description
let appDescription = packageJson.description;
// author
let author = packageJson.author;
let developerName, developerURL;
if (author) {
  if (author instanceof Array) {
    author = author[0];
  }
  if (typeof author === "string") {
    developerName = author
      .replace(/\(.+\)/, "")
      .replace(/\<.+\>/, "")
      .trim();
    const matches = author.match(/\((.+)\)/);
    developerURL = matches && matches.length >= 2 ? matches[1] : null;
  } else if (typeof author === "object") {
    developerName = author.name;
    developerURL = author.url;
  }
}

const configuration = {
    appName, // Your application's name. `string`
    appDescription, // Your application's description. `string`
    developerName,
    developerURL, // Your (or your developer's) URL. `string`
    dir: "auto", // Primary text direction for name, short_name, and description
    lang: "en-US", // Primary language for name and short_name
    background: program.background, // Background colour for flattened icons. `string`
    theme_color: program.theme, // Theme color for browser chrome. `string`
    appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
    path: program.path, // Path for overriding default icons path. `string`
    display: "standalone", // Android display: "browser" or "standalone". `string`
    orientation: "portrait", // Android orientation: "portrait" or "landscape". `string`
    scope: "/", // set of URLs that the browser considers within your app
    start_url: "/?homescreen=1", // Android start application's URL. `string`
    version: packageJson.version || "1.0", // Your application's version number. `number`
    logging: false, // Print logs to console? `boolean`
    icons: {
      // Platform Options:
      // - offset - offset in percentage
      // - shadow - drop shadow for Android icons, available online only
      // - background:
      //   * false - use default
      //   * true - force use default, e.g. set background for Android icons
      //   * color - set background for the specified icons
      //
      android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
      appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }`
      appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }`
      coast: true, // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
      favicons: true, // Create regular favicons. `boolean`
      firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background }`
      windows: true, // Create Windows 8 tile icons. `boolean` or `{ background }`
      yandex: true // Create Yandex browser icon. `boolean` or `{ background }`
    }
  },
  callback = function(error, response) {
    if (error) {
      console.log(error.status); // HTTP error code (e.g. `200`) or `null`
      console.log(error.name); // Error name e.g. "API Error"
      console.log(error.message); // Error description e.g. "An unknown error has occurred"
      return;
    }

    // create output folder if needed
    if (!fs.existsSync(program.output)) {
      fs.mkdirSync(program.output);
    }

    // write all files on disk
    response.images.forEach(image => {
      fs.writeFileSync(
        `${program.output.replace(/\/+$/, "")}/${image.name}`,
        image.contents
      );
      console.log(
        `Image saved: ${program.output.replace(/\/+$/, "")}/${image.name}`
      );
    });
    response.files.forEach(file => {
      fs.writeFileSync(
        `${program.output.replace(/\/+$/, "")}/${file.name}`,
        file.contents
      );
      console.log(
        `File saved: ${program.output.replace(/\/+$/, "")}/${file.name}`
      );
    });

    // save the html
    if (program.htmlOutput) {
      fs.writeFileSync(program.htmlOutput, response.html.join("\n"));
      console.log(`HTML saved: ${program.htmlOutput}`);
    }
  };

favicons(program.source, configuration, callback);
