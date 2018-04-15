import Logger from "./Logger";
//import { SettingsService } from '../../ArcorSettingsProvider';

const logger = new Logger("api-connector");
const guid = "mobile";
const Methods = {
	HEAD: "HEAD",
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	PATCH: "PATCH",
	DELETE: "DELETE"
};
let _defaultHeaders = {
	"Content-Type": "application/json",
	Accept: "application/json"
};

const Errors = {
	NO_CONNECTION: "000",
	NO_CONNECTION_MSG: "Network request failed",

	TIMEOUT: "001",
	TIMEOUT_MSG: "Request Timeout",

	SERVER_ERROR: "503",
	SERVER_ERROR_MSG: "Internal Server Error",

	// REQUEST_ENTITY_TOO_LARGE: 413,
	// REQUEST_ENTITY_TOO_LARGE_MSG: "Request entity too large",

	UNAUTHORIZED_ERROR: "401",
	UNAUTHORIZED_ERROR_MSG: "Acceso no autorizado",

	ID_DUPLICATED: 400,
	ID_DUPLICATED_MSG: "Nombre Duplicado",
	//
	CODE_NOT_FOUND: 404,
	CODE_NOT_FOUND_MSG: "El código no existe",

	UNAUTHORIZED_ERR: 403,
	UNAUTHORIZED_ERR_MSG: "NO AUTORIZADO"
};

export default class APIConnector {
	constructor(options = {}) {
		const { apikey = "", timeout = 0 } = options;
		// use the new fetch api
		this._fetch = fetch;

		/*this._defaultHeaders = APIConnector.DefaultHeaders;
		if (apikey) this._defaultHeaders["X-ApiKey"] = apikey;
		if (trackingId) this._defaultHeaders["X-TrackingId"] = trackingId;
*/
		if (timeout) this._timeout = timeout;

		logger.info(`APIConnector instance created for:  ${apikey}`);
	}

	static get defaultHeaders() {
		return _defaultHeaders;
	}
	static set defaultHeaders(value) {
		_defaultHeaders = value;
	}

	static get Methods() {
		return Methods;
	}

	static get Errors() {
		return Errors;
	}

	static get s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	static get generateUUID() {
		return (
			APIConnector.s4 +
			APIConnector.s4 +
			"-" +
			APIConnector.s4 +
			"-" +
			APIConnector.s4 +
			"-" +
			APIConnector.s4 +
			"-" +
			APIConnector.s4 +
			APIConnector.s4 +
			APIConnector.s4
		);
	}

	head(uri, args = {}) {
		return this._request(uri, { ...args, method: Methods.HEAD });
	}

	get(uri, args = {}) {
		return this._request(uri, { ...args, method: Methods.GET });
	}

	post(uri, args = {}) {
		return this._request(uri, { ...args, method: Methods.POST });
	}

	put(uri, args = {}) {
		return this._request(uri, { ...args, method: Methods.PUT });
	}

	patch(uri, args = {}) {
		return this._request(uri, { ...args, method: Methods.PATCH });
	}

	delete(uri, args = {}) {
		return this._request(uri, { ...args, method: Methods.DELETE });
	}

	_request(uri, args = {}) {
		let {
			method,
			headers = {},
			body,
			emptyResponse,
			checkResponseCode,
			uploadFormData,
			skipAuthHeader
		} = args;

		if (!uri || uri instanceof String)
			return logger.error(`No valid uri given for method ${method}`) && this;
		let options = {};
		options.method = method;
		options.headers = { ..._defaultHeaders, ...headers };

		//if (SettingsService.sendAuthHeader && skipAuthHeader !== true){
		if (skipAuthHeader !== true) {
			//options.headers['Authorization'] = 'Basic ' + SettingsService.base64User; //'Basic '+base64.encode(userPass);
		}
		/*
    let tempToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ0YmU2ZjRiMTQ5ZmNhMzZjYzY0MTM3Y2Y5YTViMjUxZWY1MWQzOWIifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHJhY2l0LWRlc2EiLCJhdWQiOiJ0cmFjaXQtZGVzYSIsImF1dGhfdGltZSI6MTUxMDI1NDExMiwidXNlcl9pZCI6ImNvbnRyYUBtYWlsLmNvbSIsInN1YiI6ImNvbnRyYUBtYWlsLmNvbSIsImlhdCI6MTUxMDI1NDExNiwiZXhwIjoxNTEwMjU3NzE2LCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7fSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.MYEGa9Ml520ydrg2QOO9nlmy5gxgLZEKhAtagaQG7Fla2PpkXyTb3jj4GMPqrNbWSSwFIXWyPnrPRTbYTGRweFDXAPQiWg85iAhwd_kS3riQYqa0G2urr97K1mPJZc92dn6Sb1oZ5L0tyflpEDWHWIjaNalL1-B9C16xp-1vVJbRbg540gkMxJS_esm_Hyw_eowJ25dhi7bI2HpzvzmoerNR6odd7BsLF7VKpObD71uc1kRaKFe_X4rxeCRAFihMfRLd9A08o06OsT_J3h-BF6zAbplfYwKcxa8ktTFLMp8m-sDPgj_8iUrW3LLVPhV_Xp5BVz-pp2ZaVqjpAL5A_A'
    options.headers['Authorization'] = 'Bearer ' + tempToken;
    */
		if (body) options.body = body;

		let time = +new Date();
		let bodyLog = options.body
			? ` & body: ${JSON.stringify(options.body).substr(0, 80)}...`
			: "";
		logger.info(
			`request ${options.method}: ${uri} sent, headers: ${JSON.stringify(
				options.headers
			)}${bodyLog}`
		);

		// Si es de tipo UPLOAD no lo llama a traves de FETCH
		if (uploadFormData) {
			//
			return this._requestUpload(uri, options, uploadFormData);
		}

		//credentials: 'include'
		//options.credentials = 'include';

		return new Promise((resolve, reject) => {
			//let request = this._fetch(uri, options);
			let request = fetch(uri, options);
			let timeoutReached = false;
			let requestDone = false;

			if (this._timeout) {
				setTimeout(() => {
					if (requestDone) return;
					timeoutReached = true;
					let err = new TypeError(Errors.TIMEOUT_MSG);
					err.code = Errors.TIMEOUT;
					logger.info(
						`request ${method}: ${uri} timeout after ${+new Date() - time}ms`
					);
					reject(err);
				}, this._timeout);
			}

			request
				.then(response => {
					requestDone = true;
					if (timeoutReached) return;
					logger.info(
						`request ${method}: ${uri} completed, took: ${+new Date() - time}ms`
					);

					// catch 503 gives a good response but fails on response.json
					if (!response.ok && response.status === 503) {
						return reject({ code: 503, message: Errors.SERVER_ERROR_MSG });
						//return reject(new Error({code:503, message:Errors.SERVER_ERROR_MSG}));
					}

					if (
						response &&
						response.status === 500
						// || response.status === 404
					) {
						//reject(response.json());
						checkResponseCode = true;
						if (
							checkResponseCode &&
							response._bodyInit &&
							response._bodyInit.indexOf('"code":') !== -1
						) {
							reject(response.json());
						} else {
							return reject({ code: 500, message: Errors.SERVER_ERROR_MSG });
						}
						//return reject(new Error({code:500, message:Errors.SERVER_ERROR_MSG}));
					}
					if (response.status === 404) {
						return reject({
							data: response._bodyInit
						});
					}
					if (response.status === 413) {
						return reject({
							message: response._bodyInit
						});
					}

					if (response.status === 200) {
						if (emptyResponse) {
							resolve({});
						} else {
							console.log("Response APIConnector:", response);
							resolve({
								data: response._bodyInit
							});
							// }
						}
					}
					if (response.status === 400) {
						return reject({
							data: response._bodyInit
						});
					}

					if (response.status === 403) {
						//Unauthorized
						return reject({
							code: Errors.UNAUTHORIZED_ERROR,
							message: Errors.UNAUTHORIZED_ERROR_MSG
						});
					}

					if (response.status === 204) {
						//Termino OK pero sin contenido
						resolve({});
					} else {
						resolve(response._bodyInit);
					}
				})
				.catch(err => {
					requestDone = true;
					if (timeoutReached) return;
					logger.error(
						`request ${method}: ${uri} raised error: ${err}, took ${+new Date() -
							time}ms`
					);
					if (err.message === Errors.NO_CONNECTION_MSG) {
						err.code = Errors.NO_CONNECTION;
					}
					reject(err);
				});
		});

		//return promise;
	}

	_requestUpload(uri, options, uploadFormData) {
		let { method, headers = {} } = options;
		let formData = uploadFormData;
		let time = +new Date();

		//      uploadFormData
		// Como mando el upload

		return new Promise(function(resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.open(options.method, uri);

			/*Object.keys(options.headers).forEach(function(key,index) {
                      xhr.setRequestHeader(key, options.headers[key]);
                  });*/

			if (options.headers["X-Session"])
				xhr.setRequestHeader("X-Session", options.headers["X-Session"]);
			xhr.setRequestHeader("X-ApiKey", options.headers["X-ApiKey"]);
			xhr.setRequestHeader("X-RequestId", options.headers["X-RequestId"]);
			xhr.setRequestHeader("X-TrackingId", options.headers["X-TrackingId"]);

			xhr.onload = () => {
				// Controlar todas las situaciones de error.
				logger.info(
					`request ${options.method}: ${uri} completed, took: ${+new Date() -
						time}ms`
				);
				if (xhr.status !== 200) {
					reject({ code: xhr.status, message: xhr.responseText });
				}
				if (!xhr.responseText) {
					reject({ code: 500, message: xhr.responseText });
				}
				var index = xhr.responseText.indexOf("arcor.com");
				if (index !== -1) {
					reject({ code: 500, message: xhr.responseText });
				}

				resolve(xhr.responseText);
			};

			if (xhr.upload) {
				xhr.upload.onprogress = event => {
					if (event.lengthComputable) {
					}
				};
			}
			xhr.send(formData);
		});

		//return promise;
	}
}