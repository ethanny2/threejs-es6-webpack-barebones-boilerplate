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

# Project Structure
```
|-- dist
|-- src
    |-- js
    |   |-- scripts
    |   |-- vendor
    |-- sass
    |-- static
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
|-- webpack.vendor.config.js
|-- README.md
|-- compressGltf.js
|-- dist
|-- package-lock.json
|-- package.json
|-- postcss.config.js
```

# Usage/NPM Scripts
## Installation steps:
```
1. git clone https://github.com/ethanny2/threejs-es6-webpack-barebones-boilerplate.git your-project 
2. cd your-project 
3. npm install
```

## NPM Scripts
Removes/cleans every file in the dist/ directory. This is used before each build to 
```
"clean": "rimraf dist/*"
```
```
 "lint": "eslint ."
```

```
"lint-fix": "eslint --fix ."
```

```
 "build": " npm run clean && webpack --config webpack.prod.js"
```

```
 "build-dll": "webpack --config webpack.vendor.config.js"
```

```
 "start-dev": "webpack-dev-server --open --config webpack.dev.js"
```

```
 "compress": "node compressGltf.js"
```


And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
