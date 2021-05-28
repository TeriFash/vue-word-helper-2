module.exports = {
  root: true,
  "env": {
    "es6": true,
    "node": true
  },
  extends: [
    "eslint:recommended",
    'plugin:prettier/recommended',
    'plugin:vue/essential',
    // 'prettier',
    // "@vue/prettier"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "prettier/prettier": ["error", {"singleQuote": true, "parser": "flow"}],
    "prettier/prettier": ["error", {
      "endOfLine":"auto"
    }],
  },
  
  "plugins": [
    "vue",
    // 'prettier',
  ],
}