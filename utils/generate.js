const copy = require('copy-template-dir');
const path = require('path');
const { green: g, dim: d, red: r, yellow: y } = require('chalk');
const alert = require('cli-alerts');
const fs = require('fs');
const { Confirm } = require('enquirer');
const shouldCancel = require('cli-should-cancel');
const ora = require('ora');

const spinner = ora({ text: '' });

module.exports = async vars => {
	const outDir = vars.name.split(' ')[0];
	const inDirPath = path.join(__dirname, '../', 'templates');
	let outDirPath = process.cwd();

	// if npm module is installed within wp-content directory output theme inside themes folder else output inside dist directory of the npm module
	outDirPath = path.join(outDirPath, 'themes', outDir);

	vars = {
		reqWP: '5.3',
		reqPHP: '7.2',
		...vars
	};

	if (fs.existsSync(outDirPath)) {
		const proceed = await new Confirm({
			name: 'question',
			message: `${r(
				`\n\nTheme folder \"${outDir}\" already exists.`
			)}\n${y(
				`Do you want to continue, it will overwrite the existing folder?`
			)}`
		})
			.on(`cancel`, () => shouldCancel())
			.run();

		!proceed && shouldCancel();
	}

	return new Promise((resolve, reject) => {
		console.log();
		spinner.start(`${y(`Generating your theme files...\n`)}`);
		copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
			if (err) reject(err);

			spinner.succeed(`${g(`THEME FILES GENERATED!!!`)}\n`);
			resolve(outDirPath);
		});
	});
};
