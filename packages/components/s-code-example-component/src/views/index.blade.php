@extends('layouts.main')
@section('title', $title)

@section('body')
  <div class="s-space-children">

    <s-code-example>
  const fs = require('fs');
const glob = require('glob');

const jsonPath = './packages/tools/sugar/package.json';
const packageJson = require(jsonPath);
const files = glob.sync(`${_dirname}/packages/tools/sugar/src/**/*.ts`);
const deps = packageJson.dependencies;

const usedPackages = [];

files.forEach((path) => {
  try {
    const content = fs.readFileSync(path, 'utf8');

    for (let i = 0; i < Object.keys(deps).length; i++) {
      const name = Object.keys(deps)[i];
      const reg = new RegExp(`'${name}(\/.*)?';`, 'gm');
      if (reg.test(content)) {
        console.log('exi', name);
        if (usedPackages.indexOf(name) === -1) usedPackages.push(name);
      }
    }
  } catch (e) {}
  // packagesJson
});

const newDeps = {};
usedPackages.forEach((packageName) => {
  if (!deps[packageName]) return;
  newDeps[packageName] = deps[packageName];
});

packageJson.dependencies = newDeps;

fs.writeFileSync(jsonPath, JSON.stringify(packageJson, null, 4));

console.log(newDeps);
    </s-code-example>

  </div>
@endsection
