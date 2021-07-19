const { Input, Select } = require('enquirer');

const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');

const confirm = async ({ message }) => {
	const [err, response] = await to(
		new Select({
			message,
			choices: [
				{
					title: 'Yes',
					value: true
				},
				{ title: 'Restart', value: 'edit' },
				{
					title: 'Cancel',
					value: false
				}
			],
			initial: 0,
			hinr: 'this is some hint'
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError('INPUT', err);

	return response;
};

const choice = async ({ name, message, hint, choices }) => {
	const [err, response] = await to(
		new Select({
			name,
			message,
			choices,
			hint
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError('Choice Error: ', err);

	return response;
};

const simpleText = async ({ message, initial, hint, validate }) => {
	const [err, response] = await to(
		new Input({
			message,
			hint,
			initial,
			validate
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError('INPUT', err);

	return response;
};

module.exports = { confirm, simpleText, choice };
