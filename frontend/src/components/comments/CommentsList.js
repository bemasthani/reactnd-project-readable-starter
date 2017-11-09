import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Icon } from 'react-fa';
import VoteScoreControls from '../common/VoteScoreControls';
import CommentsForm from './CommentsForm';
import ConfirmModal from '../common/ConfirmModal';
import { setConfirmModal } from '../../actions/actions';
import {
  deleteComment,
  updateCommentScore,
  editComment,
  toggleEditCommentModal,
  setEditCommentDraft
} from '../../actions/comments';

class CommentsList extends Component {
    handleCommentDelete = () => {
        this.props.deleteComment(this.props.confirmModal.id);
        this.props.setConfirmModal({
            isCommentModalOpen: false,
            id: ''
        });
    }
    handleCommentEdit = values => {
        this.props.editComment(values);
        this.props.toggleEditCommentModal(false);
    }
    handleCommentVoteScoreChange = (option, commentId) => {
        this.props.updateCommentScore({commentId, option})
    }
    openEditCommentModal(commentObj) {
        this.props.toggleEditCommentModal(true);
        this.props.setEditCommentDraft(commentObj);
    }
    componentWillUnmount() {
        this.props.toggleEditCommentModal(false);
    }
    render() {
        return (
            <div>
                <ul className="comments-list u-list-reset-styles">
                    {this.props.comments.map(comment => (
                        <li className="comments-list__item" key={comment.id}>
                            <div className="comments-list__content">{comment.body}</div>
                            <span className="comments-list__vote-score"><strong>{comment.author}</strong>, Score: <strong>{comment.voteScore}</strong></span>
                            <div className="actions-block">
                                <VoteScoreControls handleVoteScoreChange={(option) => this.handleCommentVoteScoreChange(option, comment.id)} />
                                <div>
                                    <Icon name="trash" onClick={() => this.props.setConfirmModal({isCommentModalOpen: true, id: comment.id})} />
                                    <Icon name="pencil" onClick={() => this.openEditCommentModal(comment)} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Modal isOpen={this.props.editCommentModalOpened} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit comment</ModalHeader>
                    <ModalBody>
                        <CommentsForm form="edit-comment" type="edit" handleCommentSubmit={this.handleCommentEdit} />
                    </ModalBody>
                </Modal>
                <ConfirmModal
                    handleSubmit={this.handleCommentDelete}
                    isOpen={this.props.confirmModal.isCommentModalOpen}
                    action="delete this comment"
                />
            </div>
        )
    }
}

function mapStateToProps({ comments, confirmModal }) {
    return {
        editCommentModalOpened: comments.editCommentModalOpened,
        editCommentDraft: comments.editCommentDraft,
        confirmModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteComment: commentId => dispatch(deleteComment(commentId)),
        editComment: commentObj => dispatch(editComment(commentObj)),
        updateCommentScore: changeScoreCommentObj => dispatch(updateCommentScore(changeScoreCommentObj)),
        toggleEditCommentModal: editCommentModalOpened => dispatch(toggleEditCommentModal(editCommentModalOpened)),
        setEditCommentDraft: editCommentDraft => dispatch(setEditCommentDraft(editCommentDraft)),
        setConfirmModal: confirmModal => dispatch(setConfirmModal(confirmModal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
