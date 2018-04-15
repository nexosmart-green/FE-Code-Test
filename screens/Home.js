import React, { Component, View } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import ListItem from './ListItem';
import { getCocktails } from "../actions";

class Home extends Component {
    componentWillMount() {
        this.props.getCocktails();
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.cocktails);
    }

    renderRow(cocktail) {
        return <ListItem cocktail={cocktail} />;
    }

    render() {
        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getCocktails
        },
        dispatch
    );
}
const mapStateToProps = store => {
    return { cocktails: store.cocktails };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);