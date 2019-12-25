module.exports = {
  plugins: ["prettier"],
  rules: {
    "no-unused-vars": 1,
    "eslint linebreak-style": [0, "error", "windows"],
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['eslint:recommended',"plugin:prettier/recommended"]
};
