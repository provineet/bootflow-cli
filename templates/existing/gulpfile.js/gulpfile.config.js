module.exports = {
	// development | production
	MODE: 'development',
	// compress CSS & Js files?
	COMPRESSION: true,
	// "concat | webpack"
	JSBUILD: 'concat',
	browserSyncOptions: {
		// localhost url to proxy
		proxy: '{{proxy}}',
		notify: false
	},
	watchFiles: {
		php: true,
		scss: true,
		js: true,
		images: true,
		sprites: true,
		assetsCSS: false,
		assetsJs: false,
		assetsImg: false
	},
	cssSprites: {
		retina: false,
		algorithm: 'binary-tree'
	},
	PATHS: {
		root: '/',
		assets: {
			folder: './assets',
			css: './assets/css',
			js: './assets/js',
			fonts: './assets/webfonts',
			images: './assets/images'
		},
		src: {
			folder: './assets_src',
			scss: './assets_src/scss',
			js: './assets_src/js',
			images: './assets_src/images',
			fonts: './assets_src/webfonts',
			sprites: './assets_src/sprite_images'
		},
		dist: './dist',
		devdist: './dev-dist',
		node: './node_modules/'
	},
	distIgnore: [
		'.*',
		'.**/*',
		'./node_modules/**',
		'./vendor/**',
		'./assets_src/**',
		'./assets/**/maps/**',
		'./assets/**/maps/**/*.map',
		'readme.md',
		'package.json',
		'package-lock.json',
		'CHANGELOG.md',
		'./gulpfile.js/**',
		'composer.*',
		'LICENSE',
		'./dist/**',
		'./dev-dist/**'
	],
	devDistIgnore: [
		'./node_modules/**',
		'./vendor/**',
		'./dist/**',
		'./dev-dist/**',
		'./.vscode/**',
		'./composer.json',
		'./composer.lock',
		'./.git/**'
	]
};
