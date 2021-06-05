const semver = require('semver');

const version = (value, state) => {
	if (!semver.valid(semver.coerce(value))) {
		return state.styles.danger(
			'Enter a valid version number e.g. 1.0.1 or 1.3.2-alpha'
		);
	}
	return true;
};

const notEmpty = value => {
	return value ? true : false;
};

module.exports = { version, notEmpty };
