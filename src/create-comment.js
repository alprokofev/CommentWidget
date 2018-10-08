import React from 'react';

class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {author: '', text: ''};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const author = this.state.author.trim();
        const text = this.state.text.trim();
        if (!author || !text) {
            return;
        }
        
        const comment = {
            author: author,
            text: text,
            dtData: new Date()
        };
        this.props.onCommentSubmit(comment);
        this.setState({author: '', text: ''});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input
                        type='text'
                        placeholder='Ваше имя'
                        value={this.state.author}
                        onChange={ev => {
                            this.setState({author: ev.target.value});
                        }}                        
                    />
                </p>
                <p>
                    <textarea
                        type='text'
                        placeholder='Сообщение'
                        value={this.state.text}
                        onChange={ev => {
                            this.setState({text: ev.target.value});
                        }}
                    />
                </p>
                <input type='submit' value='Сохранить'/>
            </form>
        );
    }
}

export default CreateComment;