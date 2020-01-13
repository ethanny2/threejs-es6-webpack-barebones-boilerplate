# threejs-webpack4-boilerplate

![Boilerplate default scene](https://i.imgur.com/zEYnIWY.png)

## About

**This project was created to provide a good starting point for learners who are new to [webpack](https://webpack.js.org/), javascript bundlers, and
[threejs](https://threejs.org/)**. I wanted to create an optimal development and production environment that was simple to understand and hassle-free to set up for experts and novices alike. Project key points:

1. Unobtrusive - No unecessary abstractions or imposed design patterns. Quickly get a threejs project up and running.

2. Beginner Friendly - Well documented with numerous explainations of concepts and of code.

3. Static Site Workflow - This boilerplate provides a streamlined workflow and configuration that also works well for making static sites without threejs.

## Prerequisites

To install and run this boilerplate you must have and [node.js](https://nodejs.org/) and [git](https://git-scm.com/) installed your computer before running.

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
|--  robots.txt
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

Starts a live reloading development  server at localhost:9000. Hot module reloading is enabled for changes in any .css/.sass/.scss file. **Both the development and production configs both produce identical file structures in the dist directory, but the output files for development  are not written to disk, they are serverd from memory for better speed**. This is why the dist directory appears empty when in the developement environment.
To stop the server press CTRL+C on Windows or CMD+C on Macs.

```
 "start-dev": "webpack-dev-server --open --config webpack.dev.js"
```

Runs a script using the [gLTF Pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline) node api in order to apply [Draco Compression](https://google.github.io/draco/) to all .gLTF models that reside in the src/models. This results in a smaller single .gLTF file with textures included.

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

- Polyfil:
- Javascript bundlers:
- webpack:
- Transpilation:
- Tree shakeable:
- gLTF:
- glb:
- Draco compression:
- SASS:
- NPM Scripts:
- Threejs:
- WebGL:
- Minification:
- Production Environment:
- Development Environment:
- Loaders:
- Regex:
- Glob:
- CommonJS:
- ES Modules:
- Defer attribute:
- webpack loader order:
- Source maps:
- Vendor prefixes:
- Chunks:
- Transpilation:
- Babel:
- ES5:
- ES6:
- Browserlist:
- Compression:
- Preloading:
- Cache-Bursting:
- Caching:
- webpack output file substitutions:
- webpack [contenthash]:
- webpack [hash]:
- HTTP 1:
- HTTP 2:
- Bundle Size:
- Entry point:
- Hot Module Reloading:
- robots.txt:
- Tweening:
- Threejs Scene:
- Threejs Mesh:
- Threejs setAnimationLoop():
- SPE:
- Particle systems:
- Frustum:
- Linter:

# Configuration/Utility Files :wrench:

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

## compressGltf.js

```
//
```

TBD

## .eslintrc.js

[ESLint](https://eslint.org/) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs. Through the use of this configuration file you can specify rules that propagate one of the following things...

- **Nothing** (0): ESLint ignores any rule with 0
- **Warning** (1): ESLint prints warning to terminal if rule is broken
- **Error** (2): ESLint creates an error and the program will not compile if this rule is broken

In this configuration I set the rule "no-unused-vars" to 1, so it will warn if there are any unused variables but it will still allow my program to compile. "eslint linebreak-style" is a fix for Windows computers. Normally this eslint configuration will propagate an error everytime you hit the enter key on a computer running Windows because the enter key returns CRLF, whereas on UNIX environments hitting enter will just produce an LF character. This line supresses that error on Windows. [Read More](https://github.com/diegohaz/arc/issues/171)

```
...
  rules: {
    "no-unused-vars": 1,
    "eslint linebreak-style": [0, "error", "windows"],
  }
...
```

While you could definately have ESLint handle both formatting styles and code-quality rules a very common configuration (and the one used by this project) is using ESLint in combination with another code formatter called [Prettier](https://prettier.io/). Prettier handles the formatting of your code, and ESlint handles the code-quality rules. You can read more about these rules at the following [link](https://prettier.io/docs/en/comparison.html).

However if you have both ESLint and Prettier installed ESLint will attempt to both handle formatting styles and code-quality rules by default; this may led to an annoying situation where your prettier formatter is breaking your ESLint or vice-versa. In order to prevent this we use a combination of [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) and [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier).

The extends fields allows you to use a predefined/shared set of ESlint rules from another configuration. This is where the majority of the ESLint rules come from as I have only explictly declared 2 rules as seen above. The order of this array is processed from right to left so it will gather rules from "plugin:prettier/recommended" first then extend/supplement that rule set with the rules found in "eslint:recommended". [Read more](https://stackoverflow.com/questions/46544082/it-this-the-correct-way-of-extending-eslint-rules)

```
...
plugins: ["prettier"]
...
extends: ["eslint:recommended","plugin:prettier/recommended"]
```

## postcss.config.js

This configuration file is used by the [postcss-loader](https://github.com/postcss/postcss-loader) NPM package. Postcss-loader is a webpack loader that is used to transform your CSS while adding a number of benefical features such as increased readability, vendor-prefixes and polyfills. [Read more](https://postcss.org/)

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

webpack is a static module bundler for JavaScript applications. It uses configuration files to determine how to bundle your files and build its [dependency graph](https://webpack.js.org/concepts/dependency-graph/). As per the webpack documentation, it is best to have different files for both developement and production environment as the needs/goals of these builds greatly differ. Of course, in order to keep the config files as DRY as possible the files are separated into their respective environments and the settings shared between the two environments is placed in this common file. Later the settings from this file will be combined separately with both the dev and production config files through the use of [webpack-merge](https://github.com/survivejs/webpack-merge).

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

Many people also specify an entry point for vendor code (nodeModules and other code) as well but according to the offical webpack documentation...

_In webpack version < 4 it was common to add vendors as a separate entry point to compile it as a separate file (in combination with the CommonsChunkPlugin).
This is discouraged in webpack 4. Instead, the optimization.splitChunks option takes care of separating vendors and app modules and creating a separate file. Do not create an entry for vendors or other stuff that is not the starting point of execution._ [Read more](https://webpack.js.org/concepts/entry-points/)

### __Loaders and Rules__

By default webpack is only able to create dependecy graphs and bundle JavaScript files; in order to load all your assets through webpack (images, audio, 3d models, css, html) we rely on the rich ecosystem of community written webpack loaders available on NPM. **Note: webpack loaders are evaluated from the bottom up. This means the last loader (furthest toward the bottom) specified in a particular ruleset is the first to run.**

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
Another feature of webpack that enables you to add new features to your build process.


[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) is a plugin used to generate html files either through your templating engine of choice or from an html file you supply. This plugin also automatically places your bundled .js output file, and CSS output file in the html file automatically. _This plugin alone will NOT allow you to include images in your html file (img src=... ) that are detected by the webpack build process._ This is accomplished through a combination of html-loader and file-loader.
+ fileName: is the name of the output file
+ template: is where to find the html template use as a base.
+ favicon: sets the favicon of the generated page. If you want more options to generate multiple favicons try the [favicons-webpack-plugin](https://www.npmjs.com/package/favicons-webpack-plugin). _Be aware including this plugin adds a lot of overhead to build times._
+ inject: tells the plugin where to place the bundled Javascript files; in this case we place them in the head as opposed to right before the end of the body tag for performance gain reasons (in combination with the "defer" attribute on script tags).
```
new HtmlWebpackPlugin({
    title: "Threejs ES6 Simple Boilerplate",
    filename: "index.html",
    template: "./src/static/html/index.html",
    favicon: "./src/static/images/favicons/favicon.ico",
    inject: "head"
})
```
[preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) is a plugin that injects rel="preload" attributes into certain link tags created by the HtmlWebpackPlugin. This is used on fonts exclusively as they are most condusive to preload and support good user experience and preventing FOUC (flash of unstyled content/text). [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content).

+ rel: indicates what attribute we wish to add. (can also be prefetch)
+ fileWhiteList: array of values. One regex is used to match all font file types.
+ as: Is a key that returns the type of resource (font,script are possible vals) that will be targeted by this plugin. This function uses a regex to check all font types and return "font" if any are matched. 
+ include: "allAssets" ensures this preloads fonts also resolved using file-loader. [Read more](https://github.com/GoogleChromeLabs/preload-webpack-plugin/issues/89)
  
* *

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

```
//
```

# Development Environment/webpack.dev.js :computer:
```
///
```

# Production Environment/webpack.dev.js :tada:
```
///
```