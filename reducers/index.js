import { combineReducers } from "redux";

import cocktailsReducer from "./CocktailsReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    cocktails: cocktailsReducer,
    selectedCocktailId: SelectionReducer
});

export default rootReducer;
