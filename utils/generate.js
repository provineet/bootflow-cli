const copy = require('copy-template-dir');
const path = require('path');
const { green: g, dim: d, red: r, yellow: y } = require('chalk');
const alert = require('cli-alerts');
const fs = require('fs');
const { simpleText, choice } = require('./ask');
const shouldCancel = require('cli-should-cancel');
const ora = require('ora');

const spinner = ora({ text: '' });

const setDirectories = async (userInputs, themeFolder = null) => {
	const outDir =
		themeFolder == null
			? userInputs.name.split(' ')[0].toLowerCase()
			: themeFolder;
	// version is available only in fresh installations
	if (userInputs.version) {
		outDirPath = path.join(process.cwd(), outDir);
		inDirPath = path.join(__dirname, '../', 'templates/fresh');
	} else {
		outDirPath = process.cwd();
		inDirPath = path.join(__dirname, '../', 'templates/existing');
	}

	return [outDirPath, inDirPath];
};

module.exports = async userInputs => {
	userInputs = {
		reqWP: '5.3',
		reqPHP: '7.2',
		src: 'assets_src',
		inc: 'inc',
		...userInputs
	};

	[outDirPath, inDirPath] = await setDirectories(userInputs);

	if (userInputs.itype == 'Fresh Installation' && fs.existsSync(outDirPath)) {
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
	}

	console.log(outDirPath, inDirPath);

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
