module.exports = {
	env: {
		node: true,
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'no-console': 'error',
		'no-unused-vars': 'error',
		'prettier/prettier': [
			'error',
			{
				printWidth: 100,
				trailingComma: 'all',
				tabWidth: 2,
				semi: true,
				singleQuote: true,
				useTabs: true,
				endOfLine: 'auto',
			},
		],
	},
};
