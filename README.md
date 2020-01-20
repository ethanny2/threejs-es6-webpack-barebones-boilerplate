# threejs-es6-webpack-barebones-boilerplate


[![Build Status](https://travis-ci.com/ethanny2/threejs-es6-webpack-barebones-boilerplate.svg?branch=master)](https://travis-ci.com/ethanny2/threejs-es6-webpack-barebones-boilerplate)
[![GitHub issues](https://img.shields.io/github/issues/ethanny2/threejs-es6-webpack-barebones-boilerplate)](https://github.com/ethanny2/threejs-es6-webpack-barebones-boilerplate/issues)
[![GitHub forks](https://img.shields.io/github/forks/ethanny2/threejs-es6-webpack-barebones-boilerplate)](https://github.com/ethanny2/threejs-es6-webpack-barebones-boilerplate/network)
[![GitHub stars](https://img.shields.io/github/stars/ethanny2/threejs-es6-webpack-barebones-boilerplate)](https://github.com/ethanny2/threejs-es6-webpack-barebones-boilerplate/stargazers)
[![GitHub license](https://img.shields.io/github/license/ethanny2/threejs-es6-webpack-barebones-boilerplate)](https://github.com/ethanny2/threejs-es6-webpack-barebones-boilerplate/blob/master/LICENSE)
[![Twitter Badge](https://img.shields.io/badge/chat-twitter-blue.svg)](https://twitter.com/ArrayLikeObj)

![Default scene](https://i.imgur.com/NuDNzFG.png)
## About

**This project was created to provide a good starting point for learners who are new to [webpack](https://webpack.js.org/), JavaScript bundlers, and
[three.js](https://threejs.org/)**. I wanted to create an optimal development and production environment that was simple to understand and hassle-free to set up for experts and novices alike. Project key points:

1. Unobtrusive - No unnecessary abstractions or imposed design patterns. Quickly get a three.js project up and running.

2. Beginner Friendly - Well documented with numerous explanations of concepts and of code.

3. Static Site Workflow - This boilerplate provides a streamlined workflow and configuration that also works well for making static sites without three.js.

## Prerequisites

To install and run this boilerplate you must have and [node.js](https://nodejs.org/) and [git](https://git-scm.com/) on your computer before running.

# Project Structure 
:open_file_folder:

```
|-- dist --> Build output files; where files are built for production
|-- src  --> Source files; where you do development
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
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- .eslintrc.js
|-- .browserslistrc
|-- .gitignore
|--  robots.txt
|--  .travis.yml
```

# Usage/NPM Scripts
 :scroll:

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

Runs ESlint on the current directory again, but this time fixable errors (errors that have to do with formatting rules) are fixed and saved. _Errors that deal with code quality (e.g unused variables, implicit global variables) must be fixed manually_.

```
"lint-fix": "eslint --fix ."
```

Sequentially runs the clean script then specifies the configuration file (--config) to start the webpack production build. These webpack commands are available via the already included [webpack-cli](https://github.com/webpack/webpack-cli).

```
 "build": " npm run clean && webpack --config webpack.prod.js"
```

Starts a live reloading development  server at localhost:9000. Hot module reloading is enabled for changes in any .css/.sass/.scss file. **Both the development and production configs both produce identical file structures in the dist directory, but the output files for development  are not written to disk, they are served from memory for better speed**. This is why the dist directory appears empty when in the development environment.
To stop the server press CTRL+C on Windows or CMD+C on Macs.

```
 "start-dev": "webpack-dev-server --open --config webpack.dev.js"
```

Example using [gLTF Pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline) CLI and [Draco Compression](https://google.github.io/draco/) to compress a .gltf file 
.This results in a smaller single .gLTF file with textures included. (Change args to compress new models)

```
"compress-draco": "gltf-pipeline -i ./src/static/models/dragon/scene.gltf -o ./src/static/models/dragon/dracoDragon.gltf -d",
```
Example using [gLTF Pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline) CLI to convert a .gltf file to a .glb file. This results in a single .glb file but doesn't result in a file size reduction. (Change args to compress new models)
```
"compress-glb": "gltf-pipeline -i ./src/static/models/dragon/scene.gltf -o ./src/static/models/dragon/scene.glb"
```

# Table of Contents
:book: 

- [Glossary](#glossary)
- [Configuration and Utility Files](#configuration-and-utility-files)
- [Development Environment](#development-environment)
- [Production Environment](#production-environment)
- [three.js Scene and Examples](#threejs-scene-and-examples)
- [Learning Resources](#learning-resources)
- [Credits](#credits)

# Glossary 
:speech_balloon:

- [Polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill): Piece of code (js file in the context of the web) used to provide modern functionality to older browsers that don't natively support it.
- [JavaScript bundlers](https://medium.com/@gimenete/how-javascript-bundlers-work-1fc0d0caf2da): Tools that gather your javascript files and dependencies into (usually) one js file.
- [webpack](https://webpack.js.org/):  A static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles. 
- [Transpilation](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them): Type of compiler that takes source code written in a specific programming language and produces the equivalent source code in the same or a different programming language.
- [Tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking): Is a term (in the context of JavaScript) used to describe the removal of dead/unused code. Bundlers such as webpack and Rollup automatically remove dead code when bundling multiple JavaScript files.   
- [gLTF](https://wiki.fileformat.com/3d/gltf/): A one-size fits all file format that stores 3D model information in a JSON format. This results in a reduction of the size of the 3D asset and the time needed to unpack those assets. (Format optimized for web)
- [glb](https://wiki.fileformat.com/3d/glb/): A binary file format representation of 3D models saved in the GL Transmission Format (glTF). This binary format stores all of the .gLTF's assets (JSON, .bin, textures) in the binary blob.
- [Draco compression](https://google.github.io/draco/): An open source library for compression and decompressing 3D assets.
- [Threejs](https://github.com/mrdoob/three.js/): A 3D JavaScript library that abstracts obtuse webGL concepts into streamlined code base.
- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API): A JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins
- [Minification](https://developer.mozilla.org/en-US/docs/Glossary/minification): The process of removing unnecessary or redundant data without affecting how a resource is processed by the browser 
- [Production Environment](https://dev.to/flippedcoding/difference-between-development-stage-and-production-d0p): An environment that represents the finished website live on the internet. Usually this environment prioritizes minification, compression and optimization of assets to produce the best site.
- [Development Environment](https://dev.to/flippedcoding/difference-between-development-stage-and-production-d0p): An environment that resides locally on your computer where you can test features and code. Usually has some mechanism in place to run the project on localhost with live reloading. 
- [Loaders](https://webpack.js.org/concepts/): Community written packages that make it possible to add file types other than .js to webpack's dependency graph building
- [Regular Expression](https://developer.mozilla.org/en-US/docs/Glossary/Regular_expression): Rules that govern which sequence of character come up in a search. (Also known as regex)
- [Glob](https://gulpjs.com/docs/en/getting-started/explaining-globs): A string of literal and/or wildcard characters used to match file paths. Globing is the act of locating files on a filesystem using one or more globs.
- [CommonJS](https://flaviocopes.com/commonjs/): Standard module specification used in Node.js used to break JavaScript programs into smaller more managable pieces called modules. (e.g require(...) is the CommonJS format)
- [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules): Standard module specification used/supported by most modern browsers. webpack recognizes both CommonJS and ES Module syntax. 
- [Script defer attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script): Boolean attribute set on script tags that indicates to a browser that the script is meant to be executed after the document has been parsed, but before firing DOMContentLoaded.
- [Source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map): A file that maps from the transformed source to the original source, enabling the browser to reconstruct the original source and present the reconstructed original in the debugger. (Babel/transpilation and minification are two examples of processes that transform your code)
- [Vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix): Prefixes specified by browser vendors to enable the use of experimental modern/cutting-edge CSS features. Developers should wait to include the un-prefixed property until browser behavior is standardized
- [Chunk](https://webpack.js.org/guides/code-splitting/): A  name used by webpack to  represents a module of code that is the result code-splitting your program 
- [Linter](https://sourcelevel.io/blog/what-is-a-linter-and-why-your-team-should-use-it): Is a tool that analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs
- [Compression](https://developer.mozilla.org/en-US/docs/Web/HTTP/Compression): A method used in software development to decrease the size and redundancy of a particular file to make it more compact and efficient to serve over the web.
- [HTTP/1](https://developer.mozilla.org/en-US/docs/Glossary/HTTP): Network protocol that enables transfer of hypermedia documents on the Web, typically between a browser and a server so that humans can read them. Characterized by making multiple requests per asset needed (not so efficient)
- [HTTP 2](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2): A major revision of the HTTP network protocol. The primary goals for HTTP/2 are to reduce latency by enabling full request and response multiplexing, minimize protocol overhead via efficient compression of HTTP header fields.
- [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/): Exchanges, adds, or removes modules while an application is running, without a full reload. This is particularly useful for a development environment where you can maintain application state while changing the application source.
- [Tweening](https://www.webopedia.com/TERM/T/tweening.html): Short for in-betweening, the process of generating intermediate frames between two images to give the appearance that the first image evolves smoothly into the second image. (e.g Animation of an object/mesh from one position to another)

# Configuration and Utility Files
:wrench:

## .browserslistrc

[Browserlist](https://github.com/browserslist/browserslist) is a configuration settings file that is shared across multiple different tools used to build the front-end of websites. In this configuration file you can specify which browsers you wish to support. In this project the NPM packages [Autoprefixer](https://github.com/postcss/autoprefixer) and [Babel](https://github.com/babel/babel/tree/master/packages/babel-preset-env) are reliant on this configuration file to produce an output that is usable on the browsers specified in this file.

For instance the contents of my file specify -> (not IE 11), so any features needed to support IE 11 browsers that would normally be added by Autoprefixer and Babel are excluded during the build process.

Each line in this file represents a new browser query:

- "defaults" is provided by Browserlist and represents a reasonable starting configuration for most projects
- "maintained node versions" means _target all nodejs versions still maintained by the Node.js foundation_.

The full list and how to make construct advanced queries can be found on the Browserlist github page.

```
defaults
not IE 11
not IE_Mob 11
maintained node versions
```


## .eslintrc.js

[ESLint](https://eslint.org/) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs. Through the use of this configuration file you can specify rules that propagate one of the following things...

- **Nothing** (0): ESLint ignores any rule with 0
- **Warning** (1): ESLint prints warning to terminal if rule is broken
- **Error** (2): ESLint creates an error and the program will not compile if this rule is broken

In this configuration I set the rule "no-unused-vars" to 1, so it will warn if there are any unused variables but it will still allow my program to compile. "eslint linebreak-style" is a fix for Windows computers. Normally this eslint configuration will propagate an error every time you hit the enter key on a computer running Windows because the enter key returns CRLF, whereas on UNIX environments hitting enter will just produce an LF character. This line supresses that error on Windows. [Read More](https://github.com/diegohaz/arc/issues/171)

```
...
  rules: {
    "no-unused-vars": 1,
    "eslint linebreak-style": [0, "error", "windows"],
  }
...
```

While you could definitely have ESLint handle both formatting styles and code-quality rules a very common configuration (and the one used by this project) is using ESLint in combination with another code formatter called [Prettier](https://prettier.io/). Prettier handles the formatting of your code, and ESlint handles the code-quality rules. You can read more about these rules at the following [link](https://prettier.io/docs/en/comparison.html).

However if you have both ESLint and Prettier installed ESLint will attempt to both handle formatting styles and code-quality rules by default; this may led to an annoying situation where your prettier formatter is breaking your ESLint or vice-versa. In order to prevent this we use a combination of [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) and [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier).

The extends fields allows you to use a predefined/shared set of ESlint rules from another configuration. This is where the majority of the ESLint rules come from as I have only explicity declared 2 rules as seen above. The order of this array is processed from right to left so it will gather rules from "plugin:prettier/recommended" first then extend/supplement that rule set with the rules found in "eslint:recommended". [Read more](https://stackoverflow.com/questions/46544082/it-this-the-correct-way-of-extending-eslint-rules)

```
...
plugins: ["prettier"]
...
extends: ["eslint:recommended","plugin:prettier/recommended"]
```

## postcss.config.js

This configuration file is used by the [postcss-loader](https://github.com/postcss/postcss-loader) NPM package. Postcss-loader is a webpack loader that is used to transform your CSS while adding a number of beneficial features such as increased readability, vendor-prefixes and polyfills. [Read more](https://postcss.org/)

In this case we want to add vendor-prefixes automatically to our CSS code so we specify the postcss-loader to use the [Autoprefixer](https://github.com/postcss/autoprefixer) in this configuration file.

```
  plugins: [require("autoprefixer")]
```

## robots.txt

A common file included on websites that specifies which pages of your site can be accessed/indexed by a web crawler (bot that indexes content for search engines). Below we allow all web crawlers (User-agent) to access our site with the wild card (\*) symbol. Additionally, we allow all web crawlers to access all parts of our site; note this is the configuration is used by default and doesn't even require a robots.txt file. [Read more](https://support.google.com/webmasters/answer/6062596?hl=en)

```
User-agent: *
Allow: /
```

## webpack.common.js

webpack is a static module bundler for JavaScript applications. It uses configuration files to determine how to bundle your files and build its [dependency graph](https://webpack.js.org/concepts/dependency-graph/). As per the webpack documentation, it is best to have different files for both development and production environment as the needs/goals of these builds greatly differ. Of course, in order to keep the config files as DRY as possible the files are separated into their respective environments and the settings shared between the two environments are placed in this common file. Later the settings from this file will be combined separately with both the dev and production config files through the use of [webpack-merge](https://github.com/survivejs/webpack-merge).

### __Entry/Output__

Here there is a singular entry point of the program (where the bundle starts) at index.js and singular bundle produced in dist/js called [name].bundle.js which will contain most of your JS code needed to run your application.

```
const entry = path.resolve(__dirname, "./src/js/index.js");
entry: {
    main: entry
},
output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist")
}
```

Many people also specify an entry point for vendor code (nodeModules and other code) as well but according to the official webpack documentation...

_In webpack version < 4 it was common to add vendors as a separate entry point to compile it as a separate file (in combination with the CommonsChunkPlugin).
This is discouraged in webpack 4. Instead, the optimization.splitChunks option takes care of separating vendors and app modules and creating a separate file. Do not create an entry for vendors or other stuff that is not the starting point of execution._ [Read more](https://webpack.js.org/concepts/entry-points/)

### __Loaders and Rules__

By default webpack is only able to create dependency graphs and bundle JavaScript files; in order to load all your assets through webpack (images, audio, 3d models, css, html) we rely on the rich ecosystem of community written webpack loaders available on NPM. **Note: webpack loaders are evaluated from the bottom up. This means the last loader (furthest toward the bottom) specified in a particular ruleset is the first to run.**

In this a regular expression (in test) targets all .js files (except node_modules) in the project and runs it through these loaders. 
+ [eslint-loader](https://github.com/webpack-contrib/eslint-loader) lints all .js files 
+ babel (which requires 3 NPM packages to function [babel-loader](https://www.npmjs.com/package/babel-loader/v/8.0.0-beta.1) ,[@babel/core](https://www.npmjs.com/package/@babel/core) and [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)) transpiles ES6 code to ES5 so older browsers can use your code as well. 
  + Enabling the caching options on both loaders greatly speeds up build times in both prod and dev.

```
...
{
        test: /\.m?js$/i,
        exclude: nodePath,
        use: [
          // Transplies from ES6 to ES5.
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env"],
              cacheCompression: true
            }
          },
          // Lint javascript before transpiling
          {
            loader: "eslint-loader",
            options: {
              cache: true
            }
          }
        ]
      }
...
```

This rule is used to process CSS/SASS styles. The regex matches all SASS, SCSS and CSS files so you may write your styles in any of those formats. 
+ [sass-loader](https://www.npmjs.com/package/sass-loader) compiles your SASS/SCSS code (if applicable) to CSS.
+ postcss-loader is used to add vendor-prefixes to your CSS.
+ [css-loader](https://www.npmjs.com/package/css-loader) translates CSS to CommonJS webpack can understand; this loader interprets @import and url() like import/require() and will resolve them.
+ Finally [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) is extract CSS into separate files if you wish. 
  + hmr enables styles to be updated on the dev server without having to reload the page.
  + public path specifies what path the loader should use to resolve assets that are used within CSS files (e.g import() a font in a stylesheet) after the project is built.(*This is not the path to your static assets in src/*)
  + sourceMap is enabled for most loaders for easier debugging
```
 {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // Path all assets AFTER build process
              publicPath: "../",
              hmr: true
            }
          },
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          // Adds vendor prefixes with Autoprefixer
          "postcss-loader",
          {
            // Compiles SASS to CSS
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
```
### __Plugins__
Another feature of webpack that enables you to add helpful tooling to your build process.


[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) is a plugin used to generate html files either through your templating engine of choice or from an html file you supply. This plugin also automatically places your bundled .js output file, and CSS output file in the html file automatically. _This plugin alone will NOT allow you to include images in your html file (img src=... ) that are detected by the webpack build process._ This is accomplished through a combination of html-loader and file-loader.
+ fileName: is the name of the output file
+ template: is where to find the html template use as a base.
+ favicon: sets the favicon of the generated page. If you want more options to generate multiple favicons try the [favicons-webpack-plugin](https://www.npmjs.com/package/favicons-webpack-plugin). _Be aware including this plugin adds a lot of overhead to build times._
+ inject: tells the plugin where to place the bundled JavaScript files; in this case we place them in the head as opposed to right before the end of the body tag for performance gain reasons (in combination with the "defer" attribute on script tags).
```
new HtmlWebpackPlugin({
    title: "Threejs ES6 Simple Boilerplate",
    filename: "index.html",
    template: "./src/static/html/index.html",
    favicon: "./src/static/images/favicons/favicon.ico",
    inject: "head"
}),
//new HtmlWebpackPlugin({...}) to make more html pages 
```
[preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) is a plugin that injects rel="preload" attributes into certain link tags created by the HtmlWebpackPlugin. This is used on fonts exclusively as they are most conducive to preload and support good user experience and preventing FOUC (flash of un-styled content/text). [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content).

+ rel: indicates what attribute we wish to add. (can also be prefetch)
+ fileWhiteList: array of values of which file types to whitelist. One regex is used to match all font file types.
+ as: Is a key that returns the type of resource (font,script are possible vals) that will be targeted by this plugin. This function uses a regex to check all font types and return "font" if any are matched. 
+ include: "allAssets" ensures this preloads fonts also resolved using file-loader. 
  [Read more](https://github.com/GoogleChromeLabs/preload-webpack-plugin/issues/89)

```
new PreloadWebpackPlugin({
    rel: "preload",
    as(entry) {
        if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return "font";
    },
    fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
    //Includes all assets; needs more clarification
    include: "allAssets"
})
```
[script-ext-html-webpack-plugin](https://github.com/numical/script-ext-html-webpack-plugin) similar to PreloadWebpackPlugin but this one adds the defer attribute to the script tags in your html files. In conjunction with placing the all bundled .js files in head this increases performance. [Read more](https://flaviocopes.com/javascript-async-defer/)
```
new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: "defer"
}),
```

### __Optimizations and Chunking__

#### Chunks/ Code Splitting
To avoid the issue of duplicate code and dependencies webpack has a feature that allows you to break you code up into chunks (also known as code splitting). As of webpack version < 4 code splitting into separate chunks is achieved through optimization.splitChunks property of a webpack config file. 

*Side Note: In webpack < 4 there are already intelligent defaults in place for creating chunks that fit web performance best practices. [Learn more](https://webpack.js.org/plugins/split-chunks-plugin/)
#### Caching
If a new build produces a new file name that differs from the version in the user's cache it will trigger a redownload of that content. Once your site has been deployed to a server a common technique is to add a hash within the file name (e.g script.7e2c49a622975ebd9b7e.js) and then change the hash value _ONLY IF_ the contents of the file changed. 

This ensures the visitor will only download files that change from build to build and have the rest served from their cache for better performance. Using unique hashes to explicitly force the user to redownload certain files is called _cache-busting_ and is very easy to configure and use in webpack 4. In combination with code splitting this is a very powerful tool to keep your live site fast for returning visitors. [Read more](https://webpack.js.org/guides/caching/)


#### Output substitutions
To automatically generate unique hashes for files webpack uses a feature called [**substitutions**](https://webpack.js.org/configuration/output/#outputfilename) that are able to add templating to the output of file names. There are several substitutions available, but the ones used in this project are
+ [name]: Interpreted as the name of the file used to create the output
+ [ext]: Interpreted as the extension of the file used to create the output
+ [hash]: Interpreted as a unique hash that changes each time any file in the build changes
+ [contenthash]: Interpreted as a unique hash that only changes if the content of a file does

[hash vs contenthash vs chunkhash](https://medium.com/@sahilkkrazy/hash-vs-chunkhash-vs-contenthash-e94d38a32208)


webpack has a default behavior that will change the [contenthash] even when nothing in that particular file has changed. This is because every time you build webpack generates an unique piece of code that contains the manifest and the runtime environment responsible for linking the code together. If left on this means that the end-user will ultimately redownload whole files even when the content is identical to the one in their cache. In order to prevent this we use the following settings
+ runtimeChunk:"single" -> Tells webpack to take the runtime code needed build project and offload it into a runtime .js file so on subsequent builds if no content changed their contenthashes will remain the same.
+ moduleIds:"hashed" -> Without this option set webpack will increment the module.id field of each all chunks when a build is triggered; this often leads to the vendor/node_modules folder chunk changing its contenthash value (even though no vendor code was changed or added) and triggering a large redownload of data for the user. 
+ splitChunks: In conjunction with cacheGroups is how to perform chunking in webpack. In the example below I name a chunk styles and target all .css via a regex.

```
...
optimization: {
    runtimeChunk: "single",
    moduleIds: "hashed",
    splitChunks: {
        cacheGroups: {
            styles: {
                name: "styles",
                test: /\.css$/,
                chunks: "all",
                enforce: true
            }
        }
    }
}
...
```

# Development Environment
:computer:
### __Overview__
The development environment builds to dist/. It includes a development server with live-reload, loaders for static files, and basic chunking optimizations. Hashing is not needed instead files are output with this simple substitution [name].[ext]

### __Loaders__
+ [file-loader](https://webpack.js.org/loaders/file-loader/): is used to load most static assets including images, html files, fonts, 3D models and audio. Add to the regex to suit your own needs.
  + esModule: false -> This setting is critical to getting this library to work with html-loader. This turns off file-loaders ES2015 module syntax and reverts it to CommonJS so it will correctly parse image src attributes with html-loader. [Read More](https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module) html-loader doesn't yet support es module syntax and it is a known [issue](https://github.com/webpack-contrib/html-loader/issues/203).

```
{
    test: /\.(png|svg|jpe?g|gif|ico)$/i,
        use: {
            loader: "file-loader",
            options: {
                outputPath: "images/",
                name: "[name].[ext]",
                esModule: false
            }
        }
}
```

### __Dev Server__
Spins up a development server at the specified port using [webpack-dev-server](https://webpack.js.org/configuration/dev-server/).
  + hot:true -> Enables hot module reloading of the server
  + compress:true -> Serves development build via compressed formats for better performance. 
  + contentBase -> Specifies path to build/output directory.

```
 devServer: {
    contentBase: "./dist",
    compress: true,
    hot: true,
    port: 9000
  }
```

### __Plugins__
Styles are loaded in the webpack.common.js config file and the mini-extract-css-plugin is used to configure the output of the .css file created by the development build.
```
new MiniCssExtractPlugin({
      filename: "css/style.css",
      chunkFilename: "css/style.[id].css"
})
```
### __Optimizations__ 
The node_modules folder is separated and chunked into a group called vendor to prevent redownload. This is done by default in webpack 4 but included for clarity's sake.

```
...
cacheGroups: {
    vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "all",
        reuseExistingChunk: true
    },
}
...
```

# Production Environment
 :tada:
### __Overview__
The production environment builds to dist/. There are a number of optimization in place that help produce the fastest most efficient production site such as... compression of image files, minification of .html, .js , .css files, gzip compression of all files, and automatic removal of unused css styles through out the whole project. Each file is output with a [contenthash] substitution in order to facilitate proper hashing on file names that only change if a particular file's content does.

### __Loaders__
+ [file-loader](https://webpack.js.org/loaders/file-loader/): Loads in the same manner as the development environment and is used to include most static assets including images, html files, fonts, 3D models and audio. Add to the regex to suit your own needs.

```
{
    test: /\.(png|svg|jpe?g|gif|ico)$/i,
        use: {
            loader: "file-loader",
            options: {
                outputPath: "images/",
                name: "[name].[contenthash].[ext]",
                esModule: false
            }
        }
}
```

### __Plugins__
+ mini-css-extract-loader: Styles are loaded in the webpack.common.js config file and the mini-extract-css-plugin is used to configure the output of the .css file created by the production build.
```
new MiniCssExtractPlugin({
      filename: "css/style.css",
      chunkFilename: "css/style.[id].css"
})
```
+ [imagemin-webpack-plugin](https://www.npmjs.com/package/imagemin-webpack-plugin): Used to compress your image files that are produced by your production build process. By default this plugin has a set a default compression methods that compresses gif, png and jpg files. The [imagemin-mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg) package is a plugin for Imagemin that offers a wide range of options for compression quality of jpeg images.
```
new ImageminPlugin({
    optipng: {
        optimizationLevel: 6
    },
    plugins: [
        imageminMozjpeg({
            quality: 100,
            progressive: true
        })
    ]
})
```
+ [compression-webpack-plugin](https://www.npmjs.com/package/compression-webpack-plugin): Used to gzip all files that match the specified test regex. In this case all html, css, and js files are gziped. _Note both the normal version of the file and the zipped version are produced. When served over a network that accepts gzipped content the zipped version will be sent_.
```
 new CompressionPlugin({
      test: /\.(html|css|js)(\?.*)?$/i
})
```
+ [purgecss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin): [Purgecss](https://www.purgecss.com/) is a tool that detects any unused css code in your project and deletes it so you are not serving unnecessary styles; this is particularly helpful when using a styling framework like Bootstrap that includes a lot of extraneous code.
  + paths: Is used in conjunction with [glob](https://www.npmjs.com/package/glob) to specify a pattern that searches the entire project for css to potentially delete.
```
 new PurgecssPlugin({
    paths: glob.sync("src/**/*", { nodir: true })
})
```
_Note: These plugins are included in the optimization.minimizer section because they deal with minification of code._
+ [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin): Is a tool used to minify all .js files (target by default) in the project. Running cache, and parallel speeds up the minification process.
```
new TerserJSPlugin({
    cache: true,
    parallel: true,
    sourceMap: true
})
```
+ [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin): A webpack plugin to optimize and minimize CSS assets. Set of defaults is used so no configuration is needed.
```
new OptimizeCSSAssetsPlugin({})
```

### __Optimizations__ 
In the production environment is really where chunking optimizations matter. A common tactic (and the one used in the development environment) is to create a custom chunk for all node_modules code. This is a good first step to reducing the end-users bundle size as they will only redownload those node_modules dependencies if any of the code within them changes. However, with this configuration the user has to download the _whole vendor chunk if any of the files in node_modules changes_. This could incur redownloading of data that is identical to the one in the end user's cache. 

To fix this we take it a step further we create a chunk for each individual NPM package within the node_modules/ folder so that if any dependency is altered it ensures the return visitor of the site only download the NPM packages that changed.

This results in a js file for each NPM package included in the dependencies of your project. In the past where most websites were served via HTTP/1 more requests meant an overall slower site and a longer load time. Today most site serve requests via [HTTP/2](https://kinsta.com/learn/what-is-http2/) which allows parallel multiplexed requests and is generally fast regardless of the number of requests.
 [Source](https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)
[Source2](https://calendar.perfplanet.com/2019/bundling-javascript-for-performance-best-practices/)


```
...
cacheGroups: {
    vendor: {
        test: /[\\/]node_modules[\\/]/,
        reuseExistingChunk: true,
        name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendor/npm.${packageName.replace("@", "")}`;
          }
    },
}
...
```


# three.js Scene and Examples
 :three:

## Basic Scene Setup 
There are already a number of good resources detailing how to setup a basic three.js scene. In this project I used [discoverthreejs.com](https://discoverthreejs.com/book/first-steps/first-scene/)'s code to create the scene and cube mesh. Similarly the [offical three.js documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) has a great guide for setting up a scene. For beginners I recommend reading both.

## Imports
At the top of the file is where you import all dependencies and vendor code you need in your program. webpack is able to recognize a wide variety of different module formats (AMD, CommonJS etc...) but for source files I choose ES2015 module syntax.
### Library/Vendor Code 
_Note: Since the three.js npm package is based on the module version many features must be explicitly exported to be used as they are not included in the main module file._ These are features are found in the node_modules/three/examples/... path. Many tutorials online are written using the non-module version of three.js where loaders are included under the THREE namespace (e.g THREE.GLTFLoader(...)), so if there is an error always check if you imported the specific component first.
[Read more](https://threejs.org/docs/#manual/en/introduction/Import-via-modules)

Internally the [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) and [DRACOLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader) rely on ES6 promises to work. The promise polyfill is included to support these loaders on IE11.

```
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as Stats from "stats.js";
import "promise-polyfill/src/polyfill";
import { SPE } from "./vendor/SPE.js";
```
### Static Assets
Thanks to the included loaders we are now able to parse nearly any type of static resource and add it to the dependency graph. Below audio, images and a 3D model are parsed via fileLoader so we are able to import static resources in the same way as any other ES2015 module.
```
import fireSfx from "../static/audio/fire_compressed.mp3";
import modelTexture from "../static/images/grass-texture.jpg";
import particleTexture from "../static/images/lightning-texture.png";
import dragonModel from "../static/models/dragon/dracoDragon.gltf";
```
Here we import our html and style files. We do this to make webpack aware of these resources (they are added to the dependency graph) so that html-loader can be parse img src tags from our html file. 
```
import "../sass/style.scss";
import "../static/html/index.html";
```
now in index.html ... the src attribute of img tags are able to be replaced by html-loader.
```
<img src="../images/flame-texture.png" />
```
## Loading Screen
Loaders in three.js load models asynchronously. This means that the other components of the scene are not blocked by the loading of a model. However, loading a 3D model may take some time and a solution many sites opt for is to display a loading screen until the model is fully loaded. The loading screen code from this boilerplate is from the [three.jsforum](https://discourse.threejs.org/t/basic-loading-screen/2332) and the loading animation is from [this codepen](https://codepen.io/ZyrianovViacheslav/pen/wWVrLQ). There are 3 step when creating a loading screen in three.js:
1. Add the loading screen html markup and styles. On initial load have the load screen cover the entire viewport.
   ```
    <div id="loader-wrap">
      <div class="loader">
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
      </div>
    </div>
    ...
    .loader{
      z-index:2;
	    $loader-size: 8;
	    $animation-duration: 2s;
	    $animation-speed: 10;
    ...
   ```
2. Set up a [LoadingManager](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager) and give it callbacks for what happens for its onLoad() event. This callback is triggered when the model is fully loaded; indicating its time to remove the loading screen by lowering its opcaity. (fade-out class)
   ```
    manager = new THREE.LoadingManager();
    manager.onLoad = function() {
    const loadingScreen = document.getElementById("loader-wrap");
    loadingScreen.classList.add("fade-out");
    loadingScreen.addEventListener("transitionend", onTransitionEnd);
    };
   ```
3. Pass the created manager instance into the constructor of your loader
   ```
   loader = new GLTFLoader(manager);
   ```
## Tween.js + three.js
It is entirely possible to animate your three.js scene by incrementing values in the update() function of the render loop.
```
function update() {
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}
```
This is good for simple animations but for a more robust animation experience Tween.js is a library that pairs well with three.js. A tween (from in-between) is a concept that allows you to change the values of the properties of an object in a smooth way. Tween.js works well with three.js because many of the Objects in your scene have their properties (Object3D .position, .rotation, .scale etc...) expressed via a three.js class called [vector3](https://threejs.org/docs/#api/en/math/Vector3). 

Tweens take in 3D vectors by default so we can easily animate the rotation or a similar property.
+ Here a tween is set on the cube's (called mesh) rotation. It is rotated over a course of 8s (duration = 8000) from the position (x:0, y:0, z:0) to (x:Math.PI, y:Math.PI, z:Math.PI) a full rotation. 
+ After starting the tween, be sure to call TWEEN.update(); in update() so the tween is updated on every frame
```
cubeRotateTweenA = new TWEEN.Tween(mesh.rotation)
    .to(rotateCoords, duration)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
    });
  // Start the tween
  cubeRotateTweenA.start();
  cubeRotateTweenA.repeat(Infinity);

  function update(){
    ...
      TWEEN.update();
    ...
  }
```
For the full options see the [tween documentation user's guide](https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md).

## Loading a Model
This boilerplate currently only supports the loading of 3D models that can be contained into a single file. For example many .gLTF files can come with upwards of 3 files needed to properly render the model.
+ scene.gltf (JSON file that describes structure and composition of scene)
+ scene.bin (Binary data that contains geometry or animation data)
+ textures (Image files that contain texture data for the model)
  
[Read More about GLTF](https://www.khronos.org/files/gltf20-reference-guide.pdf)
  
In webpack there really is not an elegant way to associate all 3 files with each other while having each of the files added to webpack's dependency graph. One solution would be to just statically copy the necessary files using the [CopyWebpackplugin](https://webpack.js.org/plugins/copy-webpack-plugin/) and just reference them as static resources. This works but the assets are not added to the dependency graph which is the main feature for bundling these assets with webpack.

Instead its better to just combine all the necessary files into a single file (if possible for your 3D model format). For .gltf files they are able to be combined into a single .glb file which includes the textures and binary data for the .gltf model. Similarly compressing a .gltf file with Draco compression results in a single .gltf file that has the binary data and textures embedded into that single file. Because the .gltf format is optimized for the web _you should generally always be using .glb or draco compressed .gltf models_

### Gltf-pipeline compression
[gltf-pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline) is a tool made for changing .gltf files to .glb files (size doesn't change; but model is contained in a single .glb file) and compressing .gltf files to draco compressed .gltf files. The package offers a node.js API but there seems to be [issues](https://github.com/AnalyticalGraphicsInc/cesium/issues/8452) with the latest release that prevent the API from working correctly on newer versions of node. 

The CLI-tool works correctly and here is a sample command to convert .gltf -> draco compressed .gltf
+ -i input file: model.gltf
+ -o output file: modelDraco.gltf 
+ -d Runs draco compression
```
gltf-pipeline -i model.gltf -o modelDraco.gltf -d
```
To get an idea of how well this compression works I have included both the uncompressed scene.gltf and scene.bin and the resultant draco compressed file.

##### Uncompressed dragon
_Nearly 30MB_
```
scene.bin (~30,000kb) + scene.gltf(~20kb) = 30,020kb
```
##### Draco Compressed dragon
_1.3MB!_
```
dracoDragon.gltf(~1300kb) = 1300kb
```
### Loading a draco compressed .gltf
In three.js the draco loader is used for loading pure .drc (draco) files. In order to load a draco compressed .gtlf we need instances of both GLTFLoader and DRACOLoader.



_You must pass the correct decoding algorithm path to the draco loader in order to correctly display the model._ This decoding files are located at the path location node_modules/three/examples/js/libs/draco. webpack doesn't currently have a way to import a whole directory so the best solution is use CopyWebpackPlugin to copy the draco decoding directory on builds in both dev/prod and link to the path statically.
```
   new CopyPlugin([
      {
        from: path.resolve(__dirname, "./src/js/vendor/draco"),
        to: "js/vendor/draco"
      }
    ])
```


Once both loaders have been instantiated; pass the draco loader to be used internally by the gltf loader via the .setDRACOLoader() method. Now you may load the model normally.
```
  loader = new GLTFLoader(manager);
  dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(dracoDecodePath);
  loader.setDRACOLoader(dracoLoader);
```
#### Adding a texture to a loaded 3D model
In order to apply your own custom textures to your loaded models you first need to create a new instance of TextureLoader() and pass in your image. In order to correctly orient the texture on a .gltf model
```
texture = new THREE.TextureLoader().load(modelTexture);
// these settings are needed to correctly apply a texture to a .gLTF model
texture.encoding = THREE.sRGBEncoding;
texture.flipY = false;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
```
[Read more](https://stackoverflow.com/questions/54033037/need-help-on-imported-gltf-model-with-changing-texture-of-it')

Once the .gltf is loaded we use Object3D's [Traverse](https://threejs.org/docs/#api/en/core/Object3D.traverse) method that takes a callback and executes it on all of the model's descendants. We specifically look at each descendant and if it is a mesh we change the map and metalness property of [MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)
```
gltf.scene.traverse(function(child) {
  if (child instanceof THREE.Mesh) {
    //child.material is an instance of MeshStandardMaterial
    child.material.map = texture;
    child.material.metalness = 1;
  }
});
```
### [Shader Particle Engine](http://squarefeet.github.io/ShaderParticleEngine/)
Since three.js doesn't have a native particle system implementation I included this particle library as good starting point for learning particles. This library is rather dated and a [rewrite](https://github.com/squarefeet/ShaderParticleEngine/issues/50) was in the works at one point... Running the engine will produce console warnings similar to
```
THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead
```
but the core functionality of the particle system still works great. This library was intended to be included after three.js as a script tag so that the THREE namespace would be in the global scope. This works well for the script tags, but **the npm package/build of SPE doesn't work as Three is no longer in the global scope**.

To solve this I just imported three into SPE.js and used ES2015 syntax to export the SPE class. So the module version of this library that works is located in src\js\vendor\SPE.js. This is the only file you need so you may remove the NPM dependency from package.json. 

The library has an excellent API and documentation and the example particle stream in this boilerplate is taken from [this example](https://github.com/squarefeet/ShaderParticleEngine/blob/master/examples/basic.html).

That being said the library is open source and desperately in need a of ES6 rewrite if anyone wants to contribute.

# Learning Resources 
:books:
### __three.js__
+ [Threejs Resources Page](https://threejs.org/docs/#manual/en/introduction/Useful-links)
+ [Threejs in browser editor](https://threejs.org/editor/): Online app to experiment with Threejs
+ [Stanford 3D Scanning Repository](http://graphics.stanford.edu/data/3Dscanrep/): Free 3D models to experiment with
+ [Threejs loader](https://discoverthreejs.com/apps/loader/): Online app where you can test your glTF, FBX and dae 3D models.
+ [Gltf Viewer](https://gltf.insimo.com/): Online app where you can upload .glTF files and either convert them to .glb files or compress them with draco compression.
+ [Discover Threejs](https://discoverthreejs.com/): Good beginner resource and introduction to setting up a Threejs scene written by one of the libraries main contributors. (Not finished)
+ [Sketchfab](https://sketchfab.com/): Selection of free and paid 3D models in many formats. Models are usually licensed with [Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) which means you are free to adapt and share the model as long as you give credit.
+ [Google poly](https://poly.google.com/): Another curated selection of free 3D models available on a wide variety of formats.
+ [Turbosquid](https://www.turbosquid.com/): Collection of paid and free 3D models to experiment with.
+ [Threejs fundamentals](https://threejsfundamentals.org/): Excellent (if not one of the only) resource to learn modern threejs. Topics range from beginner to advanced.
### __webpack__
+ [webpack docs](https://webpack.js.org/guides/getting-started/): Great documentation and generally has everything you need to understand webpack.
+ [webpack beginner guide article](https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5): Article I found useful when learning webpack.
+ [More on webpack chunks](https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693): Good guide on webpack < 4 chunking mechanism
+ [webpack starter kits](https://webpack.js.org/starter-kits/): Collection of user created boilerplates curated by webpack that offer good starting webpack configs for a variety projects.

# Credits
:bookmark_tabs:
+ Favicon Source: [pikpng](https://www.pikpng.com/pngvi/hRxThh_3d-silver-cube-3d-transparent-cube-png-clipart/)
+ Dragon 3D Model Source: [Sketchfab](https://sketchfab.com/3d-models/dragon-f4b218fb3b0d49e9b3a27367850517b8). Originally from the Stanford 3D scanning repository.
+ Fire Audio Source: [freesoundeffects](https://www.freesoundeffects.com/free-track/crackling-fireplace-89305/)
+ Loading Screen Code: [Threejs Forum](https://discourse.threejs.org/t/basic-loading-screen/2332)
+ Wedgie Font: [1001freefonts](https://www.1001freefonts.com/wedgie.font)
+ Particle images pack: [opengameart](https://opengameart.org/content/particle-pack-80-sprites)
  

If there is something you feel you can explain better, or other fixes to this project feel free to do a PR.