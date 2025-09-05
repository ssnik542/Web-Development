import React, { Component } from 'react';

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            tag: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Submitted');
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='flex flex-col gap-2'>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Tag:
                    <input
                        type="text"
                        name="tag"
                        value={this.state.tag}
                        onChange={this.handleInputChange}
                    />
                </label>
                <button type='submit'>SUbmit</button>
            </form>
        );
    }
}

export default MyForm;