const ShouldCancel = require('cli-should-cancel');
const { blue: b, dim: d, yellow: y, red: r } = require('chalk');

const { confirm, simpleText, choice } = require('./ask');
const validations = require('./validations');

let validate = validations.notEmpty;

const inputs = async () => {
	// Ask for installation type : Fresh or Exisiting
	const iType = await choice({
		name: 'itype',
		message: `Start a Fresh Installation or integrate in an exisiting theme?`,
		choices: ['Fresh Installation', 'Exisiting Theme Installation'],
		hint: `Use arrow key to change option type`
	});

	// take user inputs
	const userInputs =
		iType === 'Fresh Installation'
			? await freshInstall()
			: await existingInstall();

	// take confirmation on the user inputs
	const confirmInputs = await confirm({
		message: 'Do you want to proceed with the above config?'
	});

	if (confirmInputs === 'Yes') {
		userInputs.itype = iType;
		themeNameArr = userInputs.name.split(' ')[0];
		userInputs.namespace =
			themeNameArr[0].toUpperCase() + themeNameArr.slice(1);
		return userInputs;
	} else if (confirmInputs === 'Restart') {
		return 'Restart';
	} else {
		ShouldCancel();
	}
};

const freshInstall = async () => {
	const themeName = await simpleText({
		message: 'Name of your theme?',
		hint: null,
		validate
	});
	const version = await simpleText({
		message: 'Theme Version',
		validate: validations.version,
		initial: '1.0.0'
	});
	const textDomain = await simpleText({
		message: "Your theme's text domain",
		hint: null,
		validate
	});
	const themeUrl = await simpleText({
		message: 'Theme Url',
		hint: null
	});
	const description = await simpleText({
		message: 'Description',
		hint: null,
		initial: 'A custom WordPress Theme.'
	});
	const authorName = await simpleText({
		message: 'Author Name',
		hint: null
	});
	const authorUrl = await simpleText({
		message: 'Author Url',
		hint: null
	});
	const license = await simpleText({
		message: 'License',
		hint: null,
		validate,
		initial: 'GPL'
	});
	const proxy = await simpleText({
		message: 'Your local development URL to Proxy?',
		hint: 'This is your local development URL to access your WordPress locally',
		initial: 'localwp.test'
	});

	console.log(`
    ${y(
		`Configuring a fresh installation of Bootflow Developer Toolkit Theme.`
	)}}

    ${d(`Theme Name`)}: ${b(themeName)}
    ${d(`Version`)}: ${b(version)}
    ${d(`Text Domain`)}: ${b(textDomain)}
    ${d(`Theme Url`)}: ${b(themeUrl)}
    ${d(`Description`)}: ${b(description)}
    ${d(`Author Name`)}: ${b(authorName)}
    ${d(`Author Url`)}: ${b(authorUrl)}
    ${d(`License`)}: ${b(license)}
    ${d(`Local Development URL`)}: ${b(proxy)}

    `);

	return {
		name: themeName,
		version,
		textDomain,
		themeUrl,
		description,
		authorName,
		authorUrl,
		license,
		proxy
	};
};

const existingInstall = async () => {
	const themeName = await simpleText({
		message: 'Name of your theme?',
		hint: null,
		validate
	});
	const proxy = await simpleText({
		message: 'Your local development URL to Proxy?',
		hint: 'This is your local development URL to access your WordPress locally',
		initial: 'localwp.test'
	});
	console.log(`
${y(`Configuring Bootflow toolkit in your exisiting theme.`)}

${d(`Theme Name`)}: ${b(themeName)}
${d(`Local Development URL`)}: ${b(proxy)}
        `);

	return {
		name: themeName,
		proxy
	};
};

module.exports = inputs;
