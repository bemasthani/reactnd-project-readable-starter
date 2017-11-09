import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, Button } from 'reactstrap';
import {
  renderInputField,
  renderTextareaField,
  renderSelectField,
  validateRequired
} from '../../utils/helpers';

// Reusable form component used for both create and edit posts
let CreateEditPostForm = props => {
    const { handleSubmit, categories, type, history } = props;
    return (
        <Form className="form form--post" onSubmit={handleSubmit}>
            {type === 'create' &&
                <FormGroup>
                    <Field name="author" component={renderInputField} label="Author" type="text" validate={validateRequired} />
                </FormGroup>
            }
            <FormGroup>
                <Field name="title" component={renderInputField} label="Title" type="text" validate={validateRequired} />
            </FormGroup>
            <FormGroup>
                <Field name="body" component={renderTextareaField} label="Content" type="text" validate={validateRequired} />
            </FormGroup>
            {type === 'create' &&
                <FormGroup>
                    <Field name="category" label="category" component={renderSelectField} options={categories} />
                </FormGroup>
            }
            <Button className="button button--cancel" onClick={history.goBack}>Cancel</Button>
            <Button className="button button--submit" type="submit">Submit</Button>
        </Form>
    );
}

function mapStateToProps({ posts }) {
    return {
        initialValues: posts.currentPost
    }
}

CreateEditPostForm = reduxForm({
    form: 'post-form'
})(CreateEditPostForm);

export default withRouter(connect(mapStateToProps)(CreateEditPostForm));
