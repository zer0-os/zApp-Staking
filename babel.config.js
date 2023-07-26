const path = require('path');

module.exports = {
	presets: [
		'@babel/typescript',
		['@babel/preset-react', { runtime: 'automatic' }],
		[
			'@babel/preset-env',
			{
				modules: 'commonjs',
				targets: {
					esmodules: true,
				},
			},
		],
	],
	plugins: [
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				root: [path.resolve('./src')],
				alias: {
					'@': './src',
				},
			},
		],
		[
			'transform-rename-import',
			{ original: '^(.+?)\\.scss$', replacement: '$1.css' },
		],
		'@babel/plugin-proposal-function-bind',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-transform-destructuring',
		'@babel/plugin-transform-spread',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-transform-classes',
	],
};
