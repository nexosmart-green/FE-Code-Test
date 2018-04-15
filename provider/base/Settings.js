let _sendAuthHeader = true;
let _env = "dev";


class Settings {
	static get env() {
		return _env;
	}

	static set env(value) {
		_env = value;
	}

	static get Server() {
		switch (_env) {
			case "dev":
				return "http://www.thecocktaildb.com/api";
				break;
			case "staging":
				return "http://www.thecocktaildb.com/api";
				break;
			default:
				return "http://www.thecocktaildb.com/api";
		}
	}
	static get sendAuthHeader() {
		return _sendAuthHeader;
	}

	static set sendAuthHeader(value) {
		_sendAuthHeader = value;
	}
}

module.exports = Settings;