import * as Actions from "./ActionTypes";
import CocktailService from "../provider/cocktails/CocktailsService";

export const selectCocktail = (cockTailId) => {
    return {
        type: Actions.SELECTED_COCKTAIL,
        payload: cockTailId
    };
};

export function getCocktails() {
    return (dispatch, getStore) => {
        dispatch({
            type: Actions.CHANGE_APP_PROPS,
            props: true
        });
        CocktailService.getCocktails().then(resp => {
            dispatch({
                type: Actions.ACT_LOAD_COCKTAILS,
                props: resp
            });
            dispatch({
                type: Actions.CHANGE_APP_PROPS,
                props: false
            });
        }).catch(err =>{
            console.log("error getting cocktails", err);
            dispatch({
                type: Actions.CHANGE_APP_PROPS,
                props: false
            });
        })
    }
}
