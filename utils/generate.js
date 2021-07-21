const fs = require('fs');
const ora = require('ora');
const path = require('path');
const copy = require('copy-template-dir');
const shouldCancel = require('cli-should-cancel');
const { green: g, dim: d, red: r, yellow: y } = require('chalk');
const { simpleText, choice } = require('./ask');

const spinner = ora({ text: '' });

const setDirectories = async (userInputs, themeFolder = null) => {
	const outDirName =
		themeFolder == null
			? userInputs.name.split(' ')[0].toLowerCase()
			: themeFolder;
	let inDirPath = '',
		outDirPath = '';
	// version is available only in fresh installations
	if (userInputs.version) {
		outDirPath = path.join(process.cwd(), outDirName);
		inDirPath = path.join(__dirname, '../', 'templates/fresh');
	} else {
		outDirPath = process.cwd();
		inDirPath = path.join(__dirname, '../', 'templates/existing');
	}

	return [inDirPath, outDirPath, outDirName];
};

const checkFolder = async (userInputs, outDirPath, outDirName) => {
	if (userInputs.itype == 'Fresh Installation' && fs.existsSync(outDirPath)) {
		const proceed = await choice({
			name: 'question',
			message: `${r(
				`\n\nTheme \"${outDirName}\" already exists in your wp-content/themes folder.`
			)}\n${y(
				`Do you want to continue, it will overwrite the existing folder?`
			)}`,
			choices: ['Overwrite', 'Cancel'],
			hint: `Use arrow key to change option type`
		});

		proceed === 'Cancel' && shouldCancel();
	} else if (fs.existsSync(path.join(outDirPath, 'assets_src'))) {
		const proceed = await choice({
			name: 'question',
			message: `${r(
				`\n\nStatic Assets Source folder 'assets_src' already exists within your theme folder. `
			)}\n${y(
				`Choose Continue to overwrite | Rename to rename the assets_src folder | Cancel to bail out.`
			)}`,
			choices: ['Overwrite', 'Rename', 'Cancel'],
			hint: `Use arrow key to change option type`
		});

		proceed === 'Cancel' && shouldCancel();

		if (proceed === 'Rename') {
			userInputs.src = await simpleText({
				message: 'Assets Folder Name',
				hint: `Rename 'assets_src' folder Name`
			});
		}
	} else if (fs.existsSync(path.join(outDirPath, 'package.json'))) {
		const proceed = await choice({
			name: 'question',
			message: `${r(
				`\n\nPackage.json file already exists within your theme folder. `
			)}\n${y(`Choose Continue to overwrite | Cancel to bail out.`)}`,
			choices: ['Overwrite', 'Cancel'],
			hint: `Use arrow key to change option type`
		});

		proceed === 'Cancel' && shouldCancel();
	}
};

module.exports = async userInputs => {
	userInputs = {
		reqWP: '5.3',
		reqPHP: '7.2',
		src: 'assets_src',
		inc: 'inc',
		...userInputs
	};

	[inDirPath, outDirPath, outDirName] = await setDirectories(userInputs);

	// check if the theme folder or files already exists
	await checkFolder(userInputs, outDirPath, outDirName);

	return new Promise((resolve, reject) => {
		console.log();
		spinner.start(`${y(`Generating your theme files...\n`)}`);
		copy(inDirPath, outDirPath, userInputs, (err, createdFiles) => {
			if (err) reject(err);

			spinner.succeed(`${g(`THEME FILES GENERATED!!!`)}\n`);
			resolve(outDirPath);
		});
	});
};
