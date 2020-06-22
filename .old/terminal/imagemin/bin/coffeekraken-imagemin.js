#!/usr/bin/env node

const imagemin = require("imagemin");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
const imageminWebp = require("imagemin-webp");
const fs = require("fs");
const path = require("path");
const spawnSync = require("child_process").spawnSync;

console.log("------------ Optimizing images...");

var program = require("commander");
program
  .version(require(path.resolve("package.json")).version)
  .option(
    "-s, --source [value]",
    "Source of images to minify",
    process.env.PWD + "/src/img"
  )
  .option(
    "-o, --output [value]",
    "Output folder where to put the minified images",
    process.env.PWD + "/dist/img"
  )
  .option(
    "-q, --quality [value]",
    "Targeted quality of the compressed images",
    90
  )
  .option(
    "--webp",
    "Generate webp version of the images instead of jpg, png, etc...",
    false
  )
  .parse(process.argv);

(async () => {
  // process quality
  let qualityMin = program.quality - 10;
  qualityMin = qualityMin <= 0 ? 0 : qualityMin;
  let qualityMax = program.quality + 10;
  qualityMax = qualityMax >= 100 ? 100 : qualityMax;

  const plugins = [];
  plugins.push(imageminJpegRecompress({
    accurate: true,
    quality: "veryhigh",
    target: program.quality / 100,
    min: qualityMin,
    max: qualityMax
  }));
  plugins.push(imageminPngquant({
    quality: [qualityMin / 100, qualityMax / 100]
  }));
  plugins.push(imageminGifsicle({}));
  plugins.push(imageminSvgo({}));
  if (program.webp) plugins.push(imageminWebp({ quality: program.quality }));

  let files = [];
  try {
    files = await imagemin([path.resolve(program.source) + "/**/*"],
      {
        destination: path.resolve(program.output),
        plugins: plugins
      }
    );
  } catch(error) {
    console.error(error);
  }

  const srcSizeSpawn = spawnSync("du", ["-sh", path.resolve(program.source)]);
  const srcSize = srcSizeSpawn.stdout.toString().split(/\t/)[0];
  const distSizeSpawn = spawnSync("du", [
    "-sh",
    path.resolve(program.output)
  ]);
  const distSize = distSizeSpawn.stdout.toString().split(/\t/)[0];
  console.log(`- ${program.source} folder size :  ` + srcSize);
  console.log(`- ${program.output} folder size : ` + distSize);
  console.log(`------------ Images optimized!`);

})();
