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
- Cache-Busting:
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
}),
//new HtmlWebpackPlugin({...}) to make more html pages 
```
[preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) is a plugin that injects rel="preload" attributes into certain link tags created by the HtmlWebpackPlugin. This is used on fonts exclusively as they are most condusive to preload and support good user experience and preventing FOUC (flash of unstyled content/text). [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content).

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
Once your site has been deployed to a server a common technique is to add a hash within the file name (e.g script.7e2c49a622975ebd9b7e.js) and then change the hash value _ONLY IF_ the contents of the file changed. This ensures the visitor will only donwload files that change from build to build and have the rest served from their cache for better performance. This is a process known as _cache-busting_ and is very easy to configure and use in webpack 4. In combination with code splitting this is a very powerful tool to keep your live site fast for returning visitors. [Read more](https://webpack.js.org/guides/caching/)


#### Output substitutions
To automatically generate unique hashes for files webpack uses a feature called [**substitutions**](https://webpack.js.org/configuration/output/#outputfilename) that are able to add templating to the output of file names. There are several substitutions available, but the ones used in this project are
+ [name]: Interpreted as the name of the file used to create the output
+ [ext]: Interpreted as the extension of the file used to create the output
+ [hash]: Interpreted as a unique hash that changes each time any file in the build changes
+ [contenthash]: Interpreted as a unique hash that only changes if the content of a file does

[hash vs contenthash vs chunkhash](https://medium.com/@sahilkkrazy/hash-vs-chunkhash-vs-contenthash-e94d38a32208)


webpack has a default behavior that will change the [contenthash] even when nothing in that particular file has changed. This is because everytime you build webpack generates an unique piece of code that contains the manifest and the runtime environment responsible for linking the code together. If left on this means that the end-user will ultimately redownload whole files even when the content is identical to the one in their cache. In order to prevent this we use the following settings
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

# Development Environment/webpack.dev.js :computer:
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
The node_modules folder is separated and chunked into a group called vendor to prevent redownload. This is done by deafult in webpack 4 but included for clarity's sake.

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

# Production Environment/webpack.dev.js :tada:
### __Overview__
The production environment builds to dist/. There are a number of optimization in place that help produce the fastest most efficient production site such as... compression of image files, minification of .html, .js , .css files, gzip compression of all files, and automatic removal of unsued css styles through out the whole project. Each file is output with a [contenthash] substitution in order to facilitate proper hashing on file names that only change if a particular file's content does.

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
  + paths: Is used in conjunction with [glob](https://www.npmjs.com/package/glob) to specify a partern the searches the entire project for css to potentially delete.
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

To fix this we take it a step further we create a chunk for each individual NPM package within the node_modules/ folder so that if any dependency is altered it ensures the return visitor of the site only downloads the NPM packages that changed.

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


# Threejs Scene and Examples :three:
```
///
```

# Learning Resoruces :books:
### __Threejs__
+ [Threejs Resources Page](https://threejs.org/docs/#manual/en/introduction/Useful-links)
+ [Stanford 3D Scanning Repository](http://graphics.stanford.edu/data/3Dscanrep/): Free 3D models to experiment with
+ [Threejs loader](https://discoverthreejs.com/apps/loader/): Online app where you can test your glTF, FBX and dae 3D models.
+ [Gltf Viewer](https://gltf.insimo.com/): Online app where you can upload .glTF files and either convert them to .glb files or compress them with draco compression.
+ [Discover Threejs](https://discoverthreejs.com/): Good beginner resource and introduction to setting up a Threejs scene written by one of the libraries main contributors. (Not finished)
+ [Sketchfab](https://sketchfab.com/): Selection of free and paid 3D models in many formats. Models are usually licensed with [Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) which means you are free to adapt and share the model as long as you give credit.
+ [Google poly](https://poly.google.com/): Another curated selection of free 3D models available on a wide variety of formats.
+ [Turbosquid](https://www.turbosquid.com/): Collection of paid and free 3D models to experiment with.
+ [Threejs fundamentals](https://threejsfundamentals.org/): Excellent (if not one of the only) resources to learn modern threejs. Topics range from beginner to advanced.
### __webpack__
+ [webpack docs](https://webpack.js.org/guides/getting-started/): Great documentation and generally has everything you need to understand webpack.
+ [webpack beginner guide article](https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5): Article I found useful when learning webpack.
+ [More on webpack chunks](https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693): Good guide on webpack < 4 chunking mechanism

# Credits :bookmark_tabs:
+ Favicon Source: [pikpng](https://www.pikpng.com/pngvi/hRxThh_3d-silver-cube-3d-transparent-cube-png-clipart/)
+ Dragon 3D Model Source: [Sketchfab](https://sketchfab.com/3d-models/dragon-f4b218fb3b0d49e9b3a27367850517b8). Originally from the Stanford 3D scanning repository.
+ Fire Audio Source: [freesoundeffects](https://www.freesoundeffects.com/free-track/crackling-fireplace-89305/)
+ Loading Screen Code: [Threejs Forum](https://discourse.threejs.org/t/basic-loading-screen/2332)
+ Wedgie Font: [1001freefonts](https://www.1001freefonts.com/wedgie.font)


If there is something you feel you can explain better, or other fixes to this project feel free to do a PR.