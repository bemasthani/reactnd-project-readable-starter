import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Icon } from 'react-fa';
import TimeAgo from 'react-timeago';
import VoteScoreControls from '../common/VoteScoreControls';
import ConfirmModal from '../common/ConfirmModal';
import { receiveCurrentPost, setCurrentPost, deletePost, updatePostScore } from '../../actions/posts';
import { setConfirmModal } from '../../actions/actions';

class PostList extends Component {
    handlePostVoteScoreChange = (postId, option) => {
        this.props.updatePostScore({postId, option})
    }
    handleEditPost = postObj => {
        this.props.setCurrentPost(postObj.id);
        this.props.receiveCurrentPost(postObj);
        this.props.history.push(`/post-edit/${postObj.id}`);
    }
    handleDeletePost = () => {
        this.props.deletePost(this.props.confirmModal.id);
        this.props.setConfirmModal({
            isPostModalOpen: false,
            id: ''
        });
    }
    render() {
        const { posts, confirmModal, setConfirmModal } = this.props;
        console.log(this.props);
        return (
            <div>
                {posts.length ? (
                    <div>
                        <ul className="posts-list u-list-reset-styles">
                            {posts.map(post => (
                                <li className="posts-list__item post" key={post.id}>
                                    <h3 className="post__headline">
                                    {this.props.category ? (
                                      <Link to={`/${this.props.category}/${post.id}`}>{post.title}</Link>
                                    ) : (
                                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                                    )}

                                    </h3>
                                    <div>
                                        <div className="post__info">
                                            <div>
                                                Written <strong><TimeAgo date={post.timestamp} live={false} /></strong> by <strong>{post.author}</strong>
                                            </div>
                                            <div>
                                                <strong>{post.commentsCount}</strong> Comments, Score <strong>{post.voteScore}</strong>
                                            </div>
                                        </div>
                                        <div className="post__content">
                                            {post.body.length > 100 ? (
                                                post.body.substring(0, 100) + '...'
                                            ) : (
                                                post.body
                                            )}
                                        </div>
                                    </div>
                                    <div className="actions-block">
                                        <VoteScoreControls handleVoteScoreChange={option => this.handlePostVoteScoreChange(post.id, option)} />
                                        <div>
                                            <Icon name="pencil" onClick={() => this.handleEditPost(post)} />
                                            <Icon name="trash" onClick={() => setConfirmModal({isPostModalOpen: true, id: post.id})} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ConfirmModal
                            handleSubmit={this.handleDeletePost}
                            isOpen={confirmModal.isPostModalOpen}
                            action="delete this post"
                        />
                    </div>
                ) : (
                    <div>There are no posts to show.</div>
                )}
            </div>
        )
    }
}

function mapStateToProps({ confirmModal }) {
    return {
        confirmModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentPost: postId => dispatch(setCurrentPost(postId)),
        receiveCurrentPost: currentPost => dispatch(receiveCurrentPost(currentPost)),
        deletePost: postId => dispatch(deletePost(postId)),
        updatePostScore: changePostScoreObj => dispatch(updatePostScore(changePostScoreObj)),
        setConfirmModal: confirmModal => dispatch(setConfirmModal(confirmModal))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
