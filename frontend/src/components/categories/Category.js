import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import PostsList from '../posts/PostList';
import SortSelect from '../common/SortSelect';
import { getPostsByCategorySelector } from '../../selectors';
import { getPostsByCategory, setCurrentCategory } from '../../actions/categories';

class Category extends Component {
    componentWillMount() {
        let currentCategory = this.props.match.params.currentCategory;
        this.props.setCurrentCategory(currentCategory);
        this.props.getPostsByCategory(currentCategory);
    }
    componentWillReceiveProps(nextProps, a, d) {
        const currentCategory = this.props.match.params.currentCategory,
              newCategory = nextProps.match.params.currentCategory;
        if (newCategory !== currentCategory) {
            this.props.setCurrentCategory(newCategory);
            this.props.getPostsByCategory(newCategory);
        }
    }
    componentWillUnmount() {
        this.props.setCurrentCategory('');
    }
    render() {

        return (
            <Row className="justify-content-center">
                <Col xs="6">
                    {this.props.postsByCategory.length > 0 && (
                        <div>
                            <h1>{this.props.match.params.currentCategory}</h1>
                            <SortSelect target="posts" />
                        </div>
                    )}
                    <PostsList posts={this.props.postsByCategory} category={this.props.match.params.currentCategory}/>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        postsByCategory: getPostsByCategorySelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsByCategory: currentCategory => dispatch(getPostsByCategory(currentCategory)),
        setCurrentCategory: currentCategory => dispatch(setCurrentCategory(currentCategory))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
