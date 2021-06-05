const { prompt } = require('enquirer');
const { copyTemp } = require('./copytemp');

const semver = require('semver');

const validVer = (value, state) => {
	if (!semver.valid(semver.coerce(value))) {
		return state.styles.danger(
			'Version should be a valid version number e.g. 1.0.2'
		);
	}
	return true;
};

const questions = [
	{
		type: 'text',
		name: 'name',
		message: 'Name of your theme?',
		initial: input => {
			if (input.state.input == '') {
				return 'BootFlow';
			} else {
				return input.state.input;
			}
		}
	},
	{
		type: 'text',
		name: 'version',
		message: 'Theme Version?',
		initial: '1.0.0',
		validate: validVer
	},
	{
		type: 'text',
		name: 'theme_url',
		message: 'Theme Url?'
	},
	{
		type: 'text',
		name: 'description',
		message: 'Description',
		initial: 'A Custom WordPress theme.'
	},
	{
		type: 'text',
		name: 'author',
		message: 'Author Name?',
		initial: 'wordpress'
	},
	{
		type: 'text',
		name: 'author_url',
		message: 'Author url?'
	},
	{
		type: 'text',
		name: 'license',
		message: 'License',
		initial: 'GPL-3'
	},
	{
		type: 'text',
		name: 'text_domain',
		message: 'Theme Text Domain?',
		initial: 'bootflow'
	}
];

const inputs = async () => {
	let response = await prompt(questions);

	response.namespace = response.name.split(' ')[0];
	response.namespace =
		response.namespace[0].toUpperCase() + response.namespace.slice(1);

	const { confirm } = await prompt({
		type: 'select',
		name: 'confirm',
		message: 'Do you want proceed with the above?',
		choices: [
			{
				title: 'Yes',
				value: true
			},
			{ title: 'Edit', value: 'edit' },
			{
				title: 'No',
				value: false
			}
		],
		initial: 0
	});

	if (confirm === 'Yes') {
		copyTemp(response);
	} else if (confirm === 'Edit') {
		inputs();
	}
};

module.exports = inputs;
