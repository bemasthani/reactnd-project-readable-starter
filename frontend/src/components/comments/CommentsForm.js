import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup } from 'reactstrap';
import { toggleEditCommentModal } from '../../actions/comments';
import { renderInputField, renderTextareaField, validateRequired } from '../../utils/helpers';

// Reusable form component used for both create and edit comment
class CommentsForm extends Component {
    submit = values => {
        const { handleCommentSubmit, reset } = this.props;
        handleCommentSubmit(values);
        reset();
    }
    render() {
        const { handleSubmit, type } = this.props;
        return (
            <Form className="form form--comment" onSubmit={handleSubmit(values => this.submit(values))}>
                {type === 'create' && (
                    <div className="u-mb-10 u-text-light">Add comment</div>
                )}
                <FormGroup>
                    <Field name="author" label="Author" component={renderInputField} type="text" validate={validateRequired} />
                </FormGroup>
                <FormGroup>
                    <Field name="body" label="Comment text" component={renderTextareaField} type="text" validate={validateRequired} />
                </FormGroup>
                <div className="text-right">
                    {type === 'edit' && (
                        <Button className="button button--cancel" onClick={() => this.props.toggleEditCommentModal(false)}>Cancel</Button>
                    )}
                    <Button className="button button--submit" type="submit">Submit</Button>
                </div>
            </Form>
        );
    }
}

function mapStateToProps({ comments }, { type }) {
    return {
        type,
        // setting different initial values for create or edit comment
        initialValues: type === 'create' ? {} : comments.editCommentDraft,
        editCommentModalOpened: comments.editCommentModalOpened
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleEditCommentModal: editCommentModalOpened => dispatch(toggleEditCommentModal(editCommentModalOpened))
    }
}

CommentsForm = reduxForm({
    enableReinitialize: true
})(CommentsForm);

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);
