import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { setConfirmModal } from '../../actions/actions';


class ConfirmModal extends Component {
    handleCancel = () => {
        this.props.setConfirmModal({
            isPostModalOpen: false,
            isCommentModalOpen: false,
            id: ''
        });
    }
    render() {
        const { handleSubmit, isOpen, action } = this.props;
        return (
            <Modal isOpen={isOpen}>
                <ModalHeader>Are you sure you want to {action}?</ModalHeader>
                <ModalFooter className="text-right">
                    <Button className="button button--cancel" onClick={this.handleCancel}>Cancel</Button>
                    <Button className="button button--submit" onClick={handleSubmit}>Confirm</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setConfirmModal: confirmModal => dispatch(setConfirmModal(confirmModal))
    }
}

export default connect(null, mapDispatchToProps)(ConfirmModal);
