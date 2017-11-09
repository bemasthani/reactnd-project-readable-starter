import React from 'react';
import { Icon } from 'react-fa';

// Component used for vote up/down posts/comments
function VoteScoreControls(props) {
    return (
        <div className="vote-score-controls">
            <Icon name="thumbs-o-up" onClick={() => props.handleVoteScoreChange('upVote')} />
            <Icon name="thumbs-o-down" onClick={() => props.handleVoteScoreChange('downVote')} />
        </div>
    )
}

export default VoteScoreControls;
