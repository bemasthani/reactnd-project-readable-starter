import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Icon } from 'react-fa';
import CategoriesList from '../categories/CategoriesList';
import { getCategories } from '../../actions/categories';

class Header extends Component {
    componentWillMount() {
        this.props.getCategories();
    }
    render() {
        const { categories, currentCategory } = this.props;
        return (
            <div className="header">
                <h1 className="logo"><Link to="/">Readable</Link></h1>
                <div className="header__links">
                    <CategoriesList categories={categories} currentCategory={currentCategory} />
                    <Button className="button button--submit"><Link to="/add-post"><Icon name="plus-circle" />Add new post</Link></Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { categories, currentCategory } = state.categories;
    return {
        categories,
        currentCategory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
