const ShouldCancel = require('cli-should-cancel');
const { confirm, ask } = require('./ask');
const validations = require('./validations');
const { blue: b, dim: d } = require('chalk');

let validate = validations.notEmpty;

const inputs = async () => {
	const name = await ask({
		message: 'Name of your theme?',
		hint: null,
		validate
	});
	const version = await ask({
		message: 'Theme Version',
		validate: validations.version,
		initial: '1.0.0'
	});
	const textDomain = await ask({
		message: "Your theme's text domain",
		hint: null,
		validate
	});
	const themeUrl = await ask({
		message: 'Theme Url',
		hint: null
	});
	const description = await ask({
		message: 'Description',
		hint: null,
		initial: 'A custom WordPress Theme.'
	});
	const authorName = await ask({
		message: 'Author Name',
		hint: null
	});
	const authorUrl = await ask({
		message: 'Author Url',
		hint: null
	});
	const license = await ask({
		message: 'License',
		hint: null,
		validate,
		initial: 'GPL'
	});

	const vars = {
		name,
		version,
		textDomain,
		themeUrl,
		description,
		authorName,
		authorUrl,
		license
	};

	console.log(`

    ${d(`Theme Name`)}: ${b(name)}
    ${d(`Version`)}: ${b(version)}
    ${d(`Text Domain`)}: ${b(textDomain)}
    ${d(`Theme Url`)}: ${b(themeUrl)}
    ${d(`Description`)}: ${b(description)}
    ${d(`Author Name`)}: ${b(authorName)}
    ${d(`Author Url`)}: ${b(authorUrl)}
    ${d(`License`)}: ${b(license)}

    `);

	const proceed = await confirm({
		message: 'Do you want to proceed witht the above config?'
	});

	vars.namespace = name.split(' ')[0];
	vars.namespace = vars.namespace[0].toUpperCase() + vars.namespace.slice(1);

	if (proceed === 'Yes') {
		return vars;
	} else if (proceed === 'Restart') {
		return await inputs();
	} else {
		ShouldCancel();
	}
};

module.exports = inputs;
