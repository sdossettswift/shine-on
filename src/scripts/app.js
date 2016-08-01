import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './views/homeView'
import AskView from './views/askView'
import DashboardView from './views/dashboardView'
import MyQuestionsView from './views/myQuestionsView'
import SignInView from './views/signInView'
import AnswerView from './views/answerView'


const app = function() {

    var AppRouter = Backbone.Router.extend ({

        routes: {
            'home': 'goHome',
            'ask': 'goToAsk',
            'question/dashboard': 'goToDashboard',
            'question/myQuestions': 'goToMyQuestions',
            'signIn': 'goToSignIn',
            'answer': 'goToAnswer',
            '*catchall': 'defaultDashboard'
        },

        goHome: function() {
            ReactDOM.render(<HomeView />, document.querySelector('.container'))
        },

        goToAsk: function() {
            ReactDOM.render(<AskView />, document.querySelector('.container'))
        },

        goToDashboard: function() {
            ReactDOM.render(<DashboardView />, document.querySelector('.container'))
        },

        goToMyQuestions: function() {
            ReactDOM.render(<MyQuestionsView />, document.querySelector('.container'))
        },

        goToSignIn: function() {
            ReactDOM.render(<SignInView />, document.querySelector('.container'))
        },

        goToAnswer: function() {
            ReactDOM.render(<AnswerView />, document.querySelector('.container'))
        },

        defaultDashboard: function() {
            location.hash = '/dashboard'
        },

        initialize: function() {
            Backbone.history.start()
        }
    })
    new AppRouter()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE.
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..