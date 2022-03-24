module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier',
        'airbnb-typescript',
        'plugin:import/errors',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    plugins: ['@emotion', 'react', 'react-hooks', 'import', '@typescript-eslint', 'jsx-a11y'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': [1],
        '@typescript-eslint/naming-convention': [
            2,
            {selector: 'enum', format: ['UPPER_CASE']},
            {selector: 'enumMember', format: ['UPPER_CASE']},
            {selector: 'typeParameter', format: ['UPPER_CASE']},
            {
                selector: 'class',
                format: ['PascalCase'],
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: false,
                },
            },
            {
                selector: 'typeLike',
                format: ['PascalCase', 'camelCase'],
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            2,
            {vars: 'all', args: 'after-used', ignoreRestSiblings: false, argsIgnorePattern: '^_'},
        ],
        '@typescript-eslint/no-explicit-any': [2],
        '@typescript-eslint/array-type': [
            2,
            {
                default: 'generic',
            },
        ],
        '@typescript-eslint/no-namespace': [1],

        'import/order': [
            2,
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'always-and-inside-groups',
            },
        ],
        'import/named': [1],
        'import/no-unresolved': [2],
        'import/prefer-default-export': [1],
        'import/extensions': [0],
        'import/no-cycle': [1],
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: 'react',
                        importNames: ['default'],
                        message: "Dont use 'import React from 'react''.",
                    },
                    {
                        name: 'react-router',
                        message: 'Please use the default import from react-router-dom instead.',
                    },
                ],
            },
        ],

        'react/react-in-jsx-scope': [0],
        'react/jsx-uses-react': [0],
        'react/jsx-indent': [0],
        'react/jsx-indent-props': [0],
        'react/jsx-props-no-spreading': [
            2,
            {
                html: 'enforce',
                custom: 'ignore',
            },
        ],
        'react/jsx-boolean-value': [2],
        'react/jsx-curly-brace-presence': [2],
        'react/jsx-curly-newline': [0],
        'react/jsx-one-expression-per-line': [1],
        'react/jsx-wrap-multilines': [1],
        'react/jsx-fragments': [0],
        'react/jsx-tag-spacing': [1, {beforeSelfClosing: 'always'}],
        'react/display-name': [0],
        'react/prop-types': [0],

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        '@emotion/jsx-import': 'error',
        '@emotion/no-vanilla': 'error',
        '@emotion/import-from-emotion': 'error',
        '@emotion/styled-import': 'error',

        'no-multiple-empty-lines': [2, {max: 1}],
        'max-lines': [1, {max: 300}],
        'no-console': [2],
        'no-empty': [2],
        'no-empty-pattern': [2],
        'no-redeclare': [1],
        'no-shadow': [1],
        'no-bitwise': [0],
        'default-case': [0],
        'no-param-reassign': [1],
        'no-nested-ternary': [1],
        'consistent-return': [1],
        'require-yield': [1],
        'prefer-object-spread': [1],
        'no-underscore-dangle': [0],
        'no-plusplus': [0],
        'no-await-in-loop': [1],
        'no-async-promise-executor': [1],
        radix: [1],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    globals: {
        _IS_DEV: 'readonly',
        _VERSION: 'readonly',
        _BUILD_DATE: 'readonly',
        _SYSTEM: 'readonly',
        _UNIQUE_STATE: 'readonly',

        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: 'readonly',
    },
};
