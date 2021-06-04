module.exports = {
  env: {
    browser: true,
    // "es2021": true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/prettier',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 12,
    sourceType: 'module',
    // vueFeatures: {
    //   filter: true,
    //   interpolationAsNonHTML: false,
    // },
  },
  plugins: ['vue', 'prettier'],
  rules: {
    // 'vue/html-indent': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'vue/attribute-hyphenation': ['error', 'always'],
    // 'vue/html-closing-bracket-newline': [
    //   'error',
    //   {
    //     singleline: 'never',
    //     multiline: 'always',
    //   },
    // ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
      },
    ],
    // 'vue/html-indent': [
    //   'error',
    //   type,
    //   {
    //     attribute: 1,
    //     baseIndent: 0,
    //     closeBracket: 0,
    //     alignAttributesVertically: true,
    //   },
    // ],
    // 'vue/html-closing-bracket-newline': [
    //   'error',
    //   {
    //     singleline: 'never',
    //     multiline: 'always',
    //   },
    // ],
    // 'arrow-body-style': 'off',
    // 'prefer-arrow-callback': 'off',
  },
}
