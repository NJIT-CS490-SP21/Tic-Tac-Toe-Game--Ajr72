module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    "jsx-a11y"
  ],
  rules: {
    'react/no-array-index-key': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'consistent-return': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['label'],
      },
    ],
    'jsx-a11y/no-static-element-interactions': [
  'error',
  {
    handlers: [
      'onClick',
      'onMouseDown',
      'onMouseUp',
      'onKeyPress',
      'onKeyDown',
      'onKeyUp',
    ],
  },
],
  },
};
