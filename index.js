#!/usr/bin/env node

/**
 * BootFlow
 * A zero configuration dev-toolkit for WordPress Theme Developers.
 *
 * @author vineetverma <www.blogohblog.com>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const inputs = require('./utils/inputs');
const generate = require('./utils/generate');
const themeDeps = require('./utils/themedeps');
const handleError = require('cli-handle-error');
const to = require('await-to-js').default;

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	// take user inputs
	const response = await inputs();

	// generate files
	const [err, themeDir] = await to(generate(response));

	handleError('INPUT', err);

	// installing NPM dependencies for our theme
	themeDeps(themeDir);

	debug && log(flags);
})();
