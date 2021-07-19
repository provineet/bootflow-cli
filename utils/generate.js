const copy = require('copy-template-dir');
const path = require('path');
const { green: g, dim: d, red: r, yellow: y } = require('chalk');
const alert = require('cli-alerts');
const fs = require('fs');
const { simpleText, choice } = require('./ask');
const shouldCancel = require('cli-should-cancel');
const ora = require('ora');

const spinner = ora({ text: '' });

const setDirectories = async (vars, themeFolder = null) => {
	const outDir = themeFolder == null ? vars.name.split(' ')[0] : themeFolder;
	// version is available only in fresh installations
	if (vars.version) {
		outDirPath = path.join(process.cwd(), outDir);
		inDirPath = path.join(__dirname, '../', 'templates/fresh');
	} else {
		outDirPath =
			vars.isThemesFolder === false
				? path.join(process.cwd(), outDir)
				: process.cwd();
		inDirPath = path.join(__dirname, '../', 'templates/existing');
	}

	return [outDirPath, inDirPath];
};

module.exports = async vars => {
	vars = {
		reqWP: '5.3',
		reqPHP: '7.2',
		...vars
	};

	[outDirPath, inDirPath] = await setDirectories(vars);

	if (vars.itype == 'Fresh Installation' && fs.existsSync(outDirPath)) {
		const proceed = await choice({
			name: 'question',
			message: `${r(
				`\n\nTheme folder \"${outDir}\" already exists.`
			)}\n${y(
				`Do you want to continue, it will overwrite the existing folder?`
			)}`,
			choices: ['Overwrite', 'Rename', 'Cancel'],
			hint: `Use arrow key to change option type`
		});

		proceed === 'Cancel' && shouldCancel();

		if (proceed === 'Overwrite') {
			outDir = await simpleText({
				message: 'Theme Folder Name',
				hint: `Rename theme folder name.`,
				validate
			});
		}
	} else if (fs.existsSync(path.join(outDirPath, 'assets_src'))) {
		const proceed = await choice({
			name: 'question',
			message: `${r(
				`\n\nStatic Assets Source folder 'assets_src' already exists in your theme. `
			)}\n${y(
				`Choose Continue to overwrite | Rename to rename our assets source folder | Cancel to bail out.`
			)}`,
			choices: ['Overwrite', 'Rename', 'Cancel'],
			hint: `Use arrow key to change option type`
		});

		proceed === 'Cancel' && shouldCancel();

		if (proceed === 'Overwrite') {
			vars.assetssrc = await simpleText({
				message: 'Assets Folder Name',
				hint: `Rename 'assets_src' folder Name`,
				validate
			});
		}
	}
	console.log(outDirPath, inDirPath);
	shouldCancel();
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
