import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PostList from './posts/PostList';
import SortSelect from './common/SortSelect';
import { getPosts } from '../actions/posts';
import { getPostsSelector } from '../selectors';


class Home extends Component {
  componentWillMount() {
        this.props.getPosts();
    }
    render() {
        const { posts } = this.props;
        return (
            <Row className="justify-content-center">
                <Col xs="6">
                    {posts.length > 0 && (
                        <SortSelect target="posts" />
                    )}
                    <PostList posts={posts} />
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: getPostsSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: () => dispatch(getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
