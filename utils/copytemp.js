const copy = require('copy-template-dir');
const path = require('path');
const { green: g, dim: d } = require('chalk');
const alert = require('cli-alerts');

const outDir = 'Dirname';
const inDirPath = path.join(__dirname, '../', 'templates');
const outDirPath = path.join(process.cwd(), outDir);

const copyTemp = vars => {
	vars = {
		reqWP: '5.3',
		reqPHP: '7.2',
		...vars
	};
	copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
		if (err) throw err;
		console.log(
			d(`\nCreating ${createdFiles.length} files in ${g(`./${outDir}`)}`)
		);
		// createdFiles.forEach(filePath => {
		// 	fileName = path.basename(filePath);
		// 	console.log(`Created ${fileName}`);
		// });

		alert({
			type: 'success',
			name: 'All Done',
			msg: `\n\nCreated ${outDir} theme folder inside ${process.cwd()}.`
		});
	});
};

module.exports = { copyTemp };
