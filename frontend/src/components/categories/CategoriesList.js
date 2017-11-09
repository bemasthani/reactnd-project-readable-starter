import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { setCurrentCategory } from '../../actions/categories';

class CategoriesList extends Component {
    goToCategory = category => {
        this.props.setCurrentCategory(category);
        this.props.history.push(`/${category}`);
    }
    render() {
        const { categories, currentCategory } = this.props;
        return (
            <ul className="categories-list u-list-reset-styles">
                {categories.map(category => {
                    const linkClass = classNames({
                        'u-orange': category.name === currentCategory
                    });
                    return (
                        <li className="categories-list__item" key={category.name}>
                            <a onClick={() => this.goToCategory(category.name)} className={linkClass}>{category.name}</a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentCategory: currentCategory => dispatch(setCurrentCategory(currentCategory))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CategoriesList));
