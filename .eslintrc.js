module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    eqeqeq: ['error', 'always'],
    'no-shadow': 'off',
    semi: 'off',
    'no-console': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'comma-dangle': ['error', 'never'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-restricted-syntax': 'off',
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-nested-ternary': 'off',
    'max-classes-per-file': 'off',
    'no-param-reassign': 'error',
    'default-case': 'off',
    'symbol-description': 'off',
    'no-empty': 'off',
    'no-void': 'off',
    'class-methods-use-this': 'off',
    'prefer-promise-reject-errors': 'error',
    'no-case-declarations': 'error',
    'react/button-has-type': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    '@typescript-eslint/import-name': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'import/extensions': 'off'
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ]
}
