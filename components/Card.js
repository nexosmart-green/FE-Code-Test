import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    return (
        <View style={style.containerStyle}>
            {props.children}
        </View>
    );
};

const style = {
    containerStyle: {
        backgroundColor: '#FFFFFF',
        opacity: 1,
        flex: 1,
        borderRadius: 3,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: '#000000',
        shadowOpacity: 0.32,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};

export default Card;