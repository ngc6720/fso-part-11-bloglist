module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    "vitest-globals/env": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:vitest-globals/recommended",
  ],
  ignorePatterns: ["dist", "node_modules", "test-results", ".eslintrc.cjs"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "linebreak-style": ["error", "unix"],
    eqeqeq: "error",
    "no-trailing-spaces": "warn",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
  },
};
