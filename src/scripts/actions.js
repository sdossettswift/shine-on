import {User, QuestionCollection, QuestionModel} from './models/models'

const ACTIONS = {

    _registerUser: function(userObj) {
        User.register(userObj).then( () => this._logIn(userObj.email, userObj.password),
            (error) => {
                console.log(error)
            }
        )
    },

    _logIn: function(email, password) {
        User.login(email, password).then(
            (response) => {
                location.hash = '/dashboard'
            },
            (error) =>{
                console.log(error)
            }
        )
    },

    _submitQuestion: function(questionObj) {
        var question = new QuestionModel(questionObj)
        question.save().then(
            (response) => {
                console.log(response)
                location.hash = '/dashboard'
            },
            (error) => {
                console.log(error)
            }
        )
    }
}

export default ACTIONS