import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Icon } from 'react-fa';
import TimeAgo from 'react-timeago';
import CommentsList from '../comments/CommentsList';
import CommentsForm from '../comments/CommentsForm';
import SortSelect from '../common/SortSelect';
import VoteScoreControls from '../common/VoteScoreControls';
import ConfirmModal from '../common/ConfirmModal';
import { setConfirmModal } from '../../actions/actions';
import { getCommentsSelector } from '../../selectors';
import { setCurrentPost, updatePostScore, deletePost } from '../../actions/posts';
import { getComments, addComment } from '../../actions/comments';
import { generateId } from '../../utils/helpers';

// Wrapper component for single post page
class Post extends Component {
    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
    }
    componentWillMount() {
        this.props.setCurrentPost(this.postId);
        this.props.getComments(this.postId);
    }
    handleCommentSubmit = values => {
        const id = generateId(),
              timestamp = Date.now(),
              voteScore = 1;
        this.props.addComment({...values, id, timestamp, voteScore, parentId: this.postId});
    }
    handlePostVoteScoreChange = option => {
        this.props.updatePostScore({postId: this.postId, option})
    }
    handleDeletePost = () => {
        this.props.deletePost(this.postId);
        this.props.setConfirmModal({
            isPostModalOpen: false,
            id: ''
        });
        this.props.history.push("/");
    }
    render() {
        const { currentPost, setConfirmModal } = this.props;
        return (
            <Row className="justify-content-center">
                <Col xs="6">
                    {Object.values(currentPost).length ? (
                        <div>
                            <div className="post">
                                <h3 className="post__headline">{currentPost.title}</h3>
                                <div>
                                    <div className="post__info">
                                        <div>
                                            Written <strong><TimeAgo date={currentPost.timestamp} live={false} /></strong> by <strong>{currentPost.author}</strong>
                                        </div>
                                        <div>
                                            <strong>{currentPost.commentsCount}</strong> Comments, Score <strong>{currentPost.voteScore}</strong>
                                        </div>
                                    </div>
                                    <div className="post__content">{currentPost.body}</div>
                                </div>
                                <div className="actions-block">
                                    <VoteScoreControls handleVoteScoreChange={this.handlePostVoteScoreChange} />
                                    <div>
                                        <Link className="u-mr-10" to={`/post-edit/${this.postId}`}><Icon name="pencil" /></Link>
                                        <Icon name="trash" onClick={() => setConfirmModal({isPostModalOpen: true, id: this.postId})} />
                                    </div>
                                </div>
                            </div>
                            <div className="post__comments">
                                <SortSelect target="comments" />
                                <CommentsList comments={this.props.comments} />
                            </div>
                            <CommentsForm form="create-comment" type="create" handleCommentSubmit={this.handleCommentSubmit} />
                            <ConfirmModal
                                handleSubmit={this.handleDeletePost}
                                isOpen={this.props.confirmModal.isPostModalOpen}
                                action="delete this post"
                            />
                        </div>
                    ) : (
                        <div>
                            Requested post doesnt exist.
                        </div>
                    )}
                </Col>
            </Row>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentPost: state.posts.currentPost,
        comments: getCommentsSelector(state),
        confirmModal: state.confirmModal
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setCurrentPost: postId => dispatch(setCurrentPost(postId)),
        getComments: postId => dispatch(getComments(postId)),
        addComment: commentObj => dispatch(addComment(commentObj)),
        updatePostScore: changeScorePostObj => dispatch(updatePostScore(changeScorePostObj)),
        deletePost: postId => dispatch(deletePost(postId)),
        setConfirmModal: confirmModal => dispatch(setConfirmModal(confirmModal))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
