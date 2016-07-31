import React from 'react'
import Header from './Header'
import STORE from '../store'
import ACTIONS from '../actions'
import {User, QuestionModel, QuestionCollection} from '../models/models'
import DashboardView from './dashboardView'

const AnswerView = React.createClass ({


    render: function() {
        return (
            <div className = 'singleQuestion'>
                <DashboardView />
                <Answers />
            </div>
        )
    }
})

const Answers = React.createClass ({

    render: function() {
        return (
            <div className = 'responseView'>
                <textarea name = 'answer'>I have an answer for that!</textarea>
                <label><input type = 'checkbox' name = 'answer' />This is the answer</label>
            </div>
        )
    }
})

export default AnswerView