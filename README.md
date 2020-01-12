# threejs-webpack4-boilerplate

![Boilerplate default scene](https://i.imgur.com/zEYnIWY.png)

## About

**This project was created to provide a good starting point for learners who are new to [webpack](https://webpack.js.org/), javascript bundlers, and
[threejs](https://threejs.org/)**. I wanted to create an optimal development and production environment that was simple to understand and hassle-free to set up for experts and novices alike. Project key points:

1. Unobtrusive - No unecessary abstractions or imposed design patterns. Quickly get a threejs project up and running.
   
2. Beginner Friendly - Every decision and

3. Static Site Workflow -  This boilerplate provides a streamlined workflow and configuration that also works well for making static sites without threejs.

## Prerequisites

To install and run this boilerplate you must have and [node.js](https://nodejs.org/) and  [git](https://git-scm.com/) installed your computer before running.

# Project Structure :open_file_folder:
```
|-- dist --> Build output files; where files are built for production
|-- src  --> Source files; where you do developement
    |-- js
    |   |-- index.js --> Singular entry point for webpack
    |   |-- scripts  --> Any supplementary scripts or entry points go here
    |   |-- vendor   --> Any vendor code (e.g code you didn't write)
    |       --SPE.js
    |-- sass   --> write your css, sass, or scss files. All are formats are supported
        |-- style.scss
    |-- static  --> Where to place all of your static assets and html templates
        |-- audio
        |-- fonts
        |-- html
        |-- images
        |   |-- favicons
        |-- models
            |-- dragon
|-- webpack.common.js
|-- webpack.dev.js
|-- webpack.prod.js
|-- compressGltf.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- .eslintrc.js
|-- .browserslistrc
|-- .gitignore
```

# Usage/NPM Scripts :scroll:
## Installation steps:
```
1. git clone https://github.com/ethanny2/threejs-es6-webpack-barebones-boilerplate.git your-project 
2. cd your-project 
3. npm install
```

## NPM Scripts 
Removes/cleans every file in the dist directory. This is used before each build to remove all the previous build's files. The [rimraf](https://www.npmjs.com/package/rimraf) npm package gives cross-platform support for the UNIX rm -rf (remove files from a directory recursively).
```
"clean": "rimraf dist/*"
```
Runs the npm [eslint](https://www.npmjs.com/package/eslint) package on the current directory. (represented on UNIX by . ). ESlint will identify any incorrect patterns (expressed as either a warning or an error) and print to your terminal.

```
 "lint": "eslint ."
```
Runs ESlint on the current directory again, but this time fixable errors (errors that have to do with formatting rules) are fixed and saved. _Errors that deal with code quality (e.g unused variables, implict global variables) musted be fixed manually_.
```
"lint-fix": "eslint --fix ."
```
Sequentially runs the clean script then specifies the configuration file (--config) to start the webpack production build. These webpack commands are available via the already included [webpack-cli](https://github.com/webpack/webpack-cli).

```
 "build": " npm run clean && webpack --config webpack.prod.js"
```
Starts a live reloading development  server at localhost:9000. Hot module reloading is enabled for changes in any .css/.sass/.scss file. __Both the development and production configs both produce identical file structures in the dist directory, but the output files for development  are not written to disk, they are serverd from memory for better speed__. This is why the dist directory appears empty when in the developement environment.
To stop the server press CTRL+C on Windows or CMD+C on Macs.
```
 "start-dev": "webpack-dev-server --open --config webpack.dev.js"
```
Runs a script using the [gLTF Pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline) node api in order to apply  [Draco Compression](https://google.github.io/draco/) to all .gLTF models that reside in the src/models. This results in a smaller single .gLTF file with textures included.
```
 "compress": "node compressGltf.js"
```
# Table of Contents :book:
- [Glossary](#Glossary)
- [Configuration/Utility Files](tbd)
- [Development Environment/webpack.dev.js](tdb)
- [Production Environment/webpack.prod.js](tdb)
- [Threejs Scene and Examples](tdb)
- [Learning Resources](tdb)
- [Pitfalls](tbd)
- [Credits](tbd)


# Glossary :speech_balloon:
+ Javascript bundlers:
+ webpack:
+ Tree shakeable: 
+ gLTF:
+ glb:
+ Draco compression:
+ SASS: 
+ NPM Scripts: 
+ Threejs:
+ WebGL:
+ Minification:
+ Production Environment:
+ Development Environment:
+ Loaders: 
+ Regex:
+ Glob:
+ CommonJS:
+ ES Modules:
+ Defer attribute:
+ webpack loader order:
+ Source maps:
+ Vendor prefixes:
+ Chunks:
+ Transpilation:
+ Babel:
+ ES5:
+ ES6:
+ Browserlist:
+ Compression:
+ Preloading:
+ Cache-Bursting:
+ Caching:
+ webpack output file substitutions:
+ webpack [contenthash]:
+ webpack [hash]: 
+ HTTP 1:
+ HTTP 2:
+ Bundle Size:
+ Entry point:
+ Hot Module Reloading:
+ robots.txt:
+ Tweening:
+ Threejs Scene:
+ Threejs Mesh:
+ Threejs setAnimationLoop():
+ SPE:
+ Particle systems:

# Configuration/Utility Files :wrench:



