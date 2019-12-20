module.exports = {
    "rules":{
        "require-jsdoc" : 0,
        "no-unused-vars": 1,
        "max-len": 1,
        "comma-dangle": 0
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "parserOptions": {
        "sourceType": "module",
    },
"extends": ["eslint:recommended", "google"]
};

