import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CardSection from './CardSection';
import Card from './Card';
import Stars from './stars';
import * as actions from '../actions';

class ListItem extends Component {

    render() {
        const { strDrink, strDrinkThumb, idDrink  } = this.props.cocktail;
        return (
            <Card>
                <TouchableOpacity
                    onPress={() => Actions.CocktailDetail({ detail: this.props.cocktailDetailId })}
                >
                    <CardSection>
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: strDrinkThumb }}
                        />
                    </CardSection>
                </TouchableOpacity>
                <CardSection>
                    <Text style={styles.textStyle} >
                        {strDrink}
                    </Text>
                </CardSection>
            </Card>

        );
    }
}

const styles = {
    imageStyle: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 200,
        flex: 1,
        width: null
    },
    textStyle: {
        fontSize: 18,
        fontFamily: 'Roboto Medium',
        color: 'black',
        fontWeight: '500'
    },
    viewStyleContent: {
        padding: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderColor: '#ddd',
        justifyContent: 'flex-start',
        flex: 1,
        position: 'relative'
    },
    viewStyleFirts: {
        padding: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        position: 'relative',
        justifyContent: 'space-around',
        borderRightWidth: 1,
        flex: 0.6
    },
    viewStyleSecond: {
        padding: 1,
        paddingLeft: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        flex: 0.4,
        justifyContent: 'space-around',
        position: 'relative'
    },
    textPriceStyle: {
        color: 'black',
        fontWeight: '700'
    }
};

const mapStateToProps = state => {
    return {
        cocktailDetailId: state.selectedCocktailId
    };
};

export default connect(mapStateToProps, actions)(ListItem);
