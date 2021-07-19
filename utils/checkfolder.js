const path = require('path');
const alert = require('cli-alerts');
const ShouldCancel = require('cli-should-cancel');

module.exports = async itype => {
	const currentDir = path.parse(process.cwd()).name;

	if (currentDir !== 'themes' && itype == 'Fresh Installation') {
		alert({
			type: `error`,
			msg: `You are not inside your WordPress themes folder.\nPlease navigate to your themes folder in the terminal before you use BootFlow.`,
			name: `Wrong Directory`
		});
		ShouldCancel();
	}elseif( true ){

    }
	return false;
};
