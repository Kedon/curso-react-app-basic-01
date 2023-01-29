import React from 'react';
import './post-comments.scss';

const PostComments = ({comments, handleClick, id}) => {

    return <div className="post-comments-container">
    {comments.length === 0 ?
    <div class="see-commets" onClick={() => handleClick(id)}>
        Ver comemrtários
    </div> :
    <div className="post-comments">
        {comments.map(c =>
            <div key={c.id} className="post-comment">
                <h5>{c.name}</h5>
                <p>{c.body}</p>
                <small>{c.email}</small>
            </div>
        )}
    </div>
}
</div>;
}

export default PostComments