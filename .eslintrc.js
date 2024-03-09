module.exports = {
  root: true,
  extends: ["airbnb", "prettier"],
  env: {
    browser: true,
    es6: true,
  },
  ignorePatterns: ["dist", "node_modules/", ".eslintrc.js"],
  settings: { react: { version: "18.2" } },
  plugins: ["import"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    "react/require-default-props": 0,
    "import/prefer-default-export": "off",
    "react/jsx-sort-props": 1,
    "react/jsx-props-no-spreading": "off",
  },
};
