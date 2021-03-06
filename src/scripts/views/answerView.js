import React from 'react'
import Header from './Header'
import STORE from '../store'
import ACTIONS from '../actions'
import ResponseView from './Response'
import {User, QuestionModel, QuestionCollection, AnswerCollection, AnswerModel} from '../models/models'
import Footer from './Footer'

const AnswerView = React.createClass ({

    getInitialState: function() {
        return STORE._getData()
    },

    componentWillMount: function() {

        var queryForSingleQuestion = {
            questionId: this.props.questionId
        }

        var queryForAnswers = {
            questionId: this.props.questionId
        }
        ACTIONS._fetchSingleQuestion(queryForSingleQuestion)
        ACTIONS._fetchAnswers(queryForAnswers)


        STORE.on('updateContent', () => {
            this.setState(STORE._getData())
        })

    },

    componentWillUnmount: function() {
        STORE.off('updateContent')
    },

    render: function() {
        // console.log(this.props)
        // console.log(this.state)
        return (
            <div className = 'dashboard'>
                <Header />
                <QuestionBody answerColl = {this.state.answerCollection}  model = {this.state.model} />
                <ResponseView model = {this.state.model}/>
                <Answer model = {this.state.model} answerColl = {this.state.answerCollection} />
                <Footer />
            </div>
        )
    }
})

const QuestionBody = React.createClass ({

    _getAnsweredStatus: function() {
        if(this.props.model.get('isAnswered') === null) {
            return 'NO'
        }
        else {
            return 'YES'
        }
    },

    _getPostedOn: function() {
        var dateString = this.props.model.get('createdAt')
        if (!dateString) {
            return ''
        }
        else {
            let date = new Date(dateString)
            return date.toLocaleString()
        }
    },

    render: function() {
        // console.log(this.props.model)
        return (
            <div className = 'dashboardBody'>
                <div className = 'left'>
                    <a href = {`#question/${this.props.model.get('_id')}`}>{this.props.model.get('question')}</a>
                    <p>{this.props.model.get('content')}</p>
                </div>
                <div className = 'right'>
                    <p className = 'username'>posted by: {this.props.model.get('username')}</p>
                        <div className = 'sendMessage'>
                            <button>Message</button>
                        </div>
                    <p>posted on: {this._getPostedOn()} </p>
                    <p>tags: {this.props.model.get('tags')}</p>
                    <p>answered: {this._getAnsweredStatus()}</p>
                    <p> # of answers: {this.props.answerColl.models.length}</p>
                </div>
                <hr />
            </div>
        )
    }
})


const Answer = React.createClass({

    _createAnswer: function(model) {
        return <AnswerBody model = {this.props.model} answerModel = {model} />
       },

    render: function() {
        // console.log(this.props.model)
        var answers = this.props.answerColl.map(this._createAnswer)
        // console.log(answers)
        return(
            <div>
                {answers}
            </div>
        )
    }
})

const AnswerBody = React.createClass ({

    _getPostedOn: function() {
        var dateString = new Date(this.props.answerModel.get('createdAt'))

        return dateString.toLocaleString()
    },

    _handleAnswerDelete: function() {
        ACTIONS._deleteAnswer(this.props.answerModel.get('_id'), this.props.model.get('numOfAnswers'))
        ACTIONS._minusAnswerNum()

        if(this.props.answerModel.get('_id') === this.props.model.get('isAnswered')) {
            ACTIONS._toggleAnswer(this.props.model.get('isAnswered'))
        }
    },

    _handleAnswerSelect: function() {
        ACTIONS._toggleAnswer(this.props.answerModel.get('_id'))
    },

    _handleButtonClass: function() {
        var buttonClass
        if(User.getCurrentUser()._id === this.props.answerModel.get('authorId')) {
            buttonClass = 'active'
        }
        else {
            buttonClass = 'inactive'
        }
        return buttonClass
    },

    _handleCheckboxClass: function() {
        var checkboxClass
        if(User.getCurrentUser()._id !== this.props.model.get('authorId') || (this.props.model.get('isAnswered') !== null)) {
            checkboxClass = 'inactive'
        }
        else {
            checkboxClass = 'active'
        }
        return checkboxClass
    },

    _handleAnswerMarkerClass: function() {
        var answerMarkerClass
        if(this.props.model.get('isAnswered') === this.props.answerModel.get('_id')) {
            answerMarkerClass = 'active'
        }
        else {
            answerMarkerClass = 'inactive'
        }
        return answerMarkerClass
    },

    _goToMessageCompose: function() {
        location.hash = 'messageCompose'
    },

    render: function() {
        // console.log('question>>', this.props.model)
        return (
            <div className = 'dashboardBody answers'>
                <button className = {this._handleButtonClass()} type= 'button' onClick = {this._handleAnswerDelete}>X</button>
                <div className = 'left'>
                    <p id = 'answer'>{this.props.answerModel.get('answer')}</p>
                </div>
                <div className = 'right'>
                    <p className = 'username'>Posted By:{this.props.answerModel.get('username')}</p>
                        <div className = 'sendMessage'>
                            <a href = '#messageCompose'>Message</a>
                        </div>
                    <p>Posted On: {this._getPostedOn()}</p>
                    <label className = {this._handleCheckboxClass()}><input type = 'checkbox' value = 'answer' name = 'answerCheck' onChange = {this._handleAnswerSelect}/>This is the answer</label>
                    <p className = {this._handleAnswerMarkerClass()} id = 'answerMarker'><i className = 'fa fa-check' aria-hidden = 'true'></i></p>
                </div>
                <hr/>
            </div>
        )
    }
})

export default AnswerView