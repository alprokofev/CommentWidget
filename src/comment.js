import React from 'react';

const Comment = (props) => {
    return (
        <div>
            <p><b>{props.comment.author}</b></p>
            <p>{props.comment.text}</p>
            <p>{props.comment.dtData.toLocaleString()}</p>
            <p><button onClick={props.onRemove}>Удалить</button></p>
        </div>
    )
}

export default Comment;