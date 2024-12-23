/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    '@bigcommerce/eslint-config/configs/react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prefer-read-only-props': 'off',
    'react/destructuring-assignment': 'off',
  }
};

module.exports = config;
