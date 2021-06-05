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

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
})();
