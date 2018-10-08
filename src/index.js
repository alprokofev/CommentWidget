import React from 'react';
import ReactDOM from 'react-dom';
import CreateComment from './create-comment';
import Comment from './comment';

let comments = [];

function storageAvailable(type) {
    try {
        let storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

if (storageAvailable('localStorage')) {
    comments = JSON.parse(localStorage.getItem("Comments"));
    if (!comments) {
        comments = [];
    }
} else {
    comments = [];
    alert('Browser not support localStorage');
}

class CommentsApp extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: comments
        };
        this.onAddComment = this.onAddComment.bind(this);
        this.onRemoveComment = this.onRemoveComment.bind(this);
    }

    onAddComment(comment) {
        if (!comment)
            return;

        const comments = this.state.comments;
        comments.push(comment);
        this.setState({comments: this.state.comments});
    }

    onRemoveComment(key) {
        const comments = this.state.comments.filter((comment, i) => {
            return key !== i;
        });
        this.setState({comments});
    }

    componentDidUpdate() {
        var serialObj = JSON.stringify(this.state.comments);
        delete localStorage["Comments"];
        localStorage.setItem("Comments", serialObj);
    }

    getString() {
        return pluralize(this.state.comments.length);
    }

    render() {
        return (
            <div>
                <CreateComment onCommentSubmit={this.onAddComment}/>
                <h2>{this.getString()}</h2>
                <div>
                    {
                        this.state.comments.map((comment, i) => {
                            return (
                                <Comment
                                    key={i}
                                    comment={comment}
                                    onRemove={this.onRemoveComment.bind(this, i)}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<CommentsApp />, document.querySelector('#content'));

function pluralize(count) {
    let type = getPluralType(count);
    switch(type) {
        case 'zero':
            return 'Комментарии';
        case 'one':
            return count + ' Комментарий';
        case 'two':
            return count + ' Комментария';
        case 'many':
            return count + ' Комментариев';
        default:
            return 'ошибка, неизвестное количество';
    }
}

function getPluralType(n) {
    if (n === 0)
        return 'zero';

    // 1, 21, 31, 41, 51
    let one = (n % 10) == 1 && (Math.floor(n / 10)) != 1;
    if (one)
        return 'one';
    
    // [2-4], [22-24], [32-34], [42-44], [52-54]
    let two = (n % 10) >= 2 && (n % 10) <= 4 && (Math.floor(n / 10)) != 1;
    if (two)
        return 'two';

    // [5-20], [25-30], [35-40], [45-50], [55-0]
    if (!one && !two)
        return 'many';
    
    return 'other';
}