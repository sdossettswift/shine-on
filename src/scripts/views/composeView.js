import React from 'react'
import Header from './Header'

const ComposeView = React.createClass ({
    render: function() {
        return (
            <div className = 'compose'>
                <Header />
                <Compose />
            </div>
        )
    }
})

const Compose = React.createClass ({
    render: function() {
        return (
            <form className = 'composeBody'>
                <input type = 'text' placeholder = 'What is your question?' name = 'question' />
                <textarea placeholder = 'Tell us a little about it.'></textarea>
            </form>
        )
    }
})

export default ComposeView