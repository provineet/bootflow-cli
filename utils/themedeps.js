const shell = require('shelljs');
const ora = require('ora');
const { red: r, yellow: y, green: g, dim: d } = require('chalk');
const alert = require('cli-alerts');

const spinner = ora({ text: '' });

module.exports = dirName => {
	// Bug Fix: escape space in directory path
	dirName = dirName.replace(/(\s+)/g, '\\$1');

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

				alert({
					type: `success`,
					msg: `Alright Sparky, Now create something amazing.\n\nTo start working with the theme checkout the Documentation here: https://github.com/provineet/bootflow/`,
					name: `ALL DONE`
				});
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
