import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import CreateEditPostForm from './CreateEditPostForm';
import { editPost, setCurrentPost } from '../../actions/posts';
import { getCategories } from '../../actions/categories';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
    }
    componentWillMount() {
        this.props.getCategories();
    }
    handleSubmit = values => {
        this.props.editPost(values);
        this.props.history.push("/");
    }
    render() {
        return (
            <Row className="justify-content-center">
                <Col xs="6">
                    <h1>Edit Post</h1>
                    <CreateEditPostForm onSubmit={this.handleSubmit} categories={this.props.categories.categories} type="edit" />
                </Col>
            </Row>
        )
    }
}

function mapStateToProps({ categories }) {
    return {
        categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editPost: postObj => dispatch(editPost(postObj)),
        setCurrentPost: postId => dispatch(setCurrentPost(postId)),
        getCategories: () => dispatch(getCategories())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));
