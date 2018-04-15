import { APIConnector, Settings } from "../base";

const apiConnector = new APIConnector({ timeout: 30000 });

export default class CocktailConfig {
	static get APIConnector() {
		return apiConnector;
	}

	static get base() {
		return Settings.server;
    }
    
    static get endpointGetCocktails(){
        return `${CocktailConfig.base}/json/v1/1/filter.php?g=Cocktail_glass`;
    }

    static get endpointGetDetailCoctails() {
        return `${CocktailConfig.base}/json/v1/1/lookup.php`;
    }
}
