const shell = require('shelljs');
const ora = require('ora');
const { red: r, yellow: y, green: g, dim: d } = require('chalk');
const alert = require('cli-alerts');

const spinner = ora({ text: '' });

module.exports = dirName => {
	// return new Promise((resolve, reject) => {
	spinner.start(
		`${y(`INSTALLING THEME DEPENDENCIES...`)}\n\n${d(
			`It may take moment…`
		)}`
	);

	// Run external tool Asynchronously
	shell.exec(
		`cd ${dirName} && npm i`,
		{ async: true, silent: true },
		function (code, stdout, stderr) {
			if (code == 0) {
				spinner.succeed(`${g(`THEME DEPENDENCIES INSTALLED...`)}`);

                alert({type: `success`, msg: `Alright Sparky, Now create something amazing.`, name: `ALL DONE`});
			} else {
				spinner.fail(
					`${r(
						`FAILED TO INSTALL DEPENDENCIES, KINDLY RESTART or CONTACT THE MAINTAINER @provineet...`
					)}`
				);
			}
		}
	);
};
