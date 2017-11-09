import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Label } from 'reactstrap';
import { setPostsSortingOption } from '../../actions/posts';
import { setCommentsSortingOption } from '../../actions/comments';

// Component used for sorting posts/comments
class SortSelect extends Component {
    handleSortChange(value) {
        this.props.target === 'posts' && this.props.setPostsSortingOption(value);
        this.props.target === 'comments' && this.props.setCommentsSortingOption(value);
    }
    render() {
        return (
            <div className="sort-select">
                <Form inline>
                    <Label>Sort {this.props.target} by:</Label>
                    <Input type="select" size="sm" onChange={(e) => this.handleSortChange(e.target.value)}>
                        <option value="voteScore">Vote score</option>
                        <option value="timestamp">Timestamp</option>
                    </Input>
                </Form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPostsSortingOption: (sortingOption) => dispatch(setPostsSortingOption(sortingOption)),
        setCommentsSortingOption: (sortingOption) => dispatch(setCommentsSortingOption(sortingOption))
    }
}

export default connect(null, mapDispatchToProps)(SortSelect);
