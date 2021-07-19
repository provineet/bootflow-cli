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
			folder: './{{src}}',
			scss: './{{src}}/scss',
			js: './{{src}}/js',
			images: './{{src}}/images',
			fonts: './{{src}}/webfonts',
			sprites: './{{src}}/sprite_images'
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
		'./{{src}}/**',
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
