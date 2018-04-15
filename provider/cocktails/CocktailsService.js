import CocktailConfig from './CocktailConfig'

export default class CocktailService {

	static getCocktails() {
		return new Promise((resolve, reject) => {
			try {
				let endpoint = CocktailConfig.endpointGetCocktails;
				let response = CocktailConfig.APIConnector.get(endpoint);
				resolve(response);
			} catch (e) {
				reject(e);
			}

		})
	}

	static getDetailCocktails(id) {
		return new Promise((resolve, reject)=> {
			try{
				let endpoint = CocktailConfig.endpointGetDetailCocktail + "?i="+id;
				let response = CocktailConfig.APIConnector.get(endpoint);
			}
			catch(err) {
				reject(err);
			}
		})
	}

}
