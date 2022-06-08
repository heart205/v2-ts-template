module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier', 'vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      module: true,
    },
  },
  rules: {
    'no-useless-concat': 0,
    'no-console': 0,
  },
}
