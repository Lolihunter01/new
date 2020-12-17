import React, { Component } from 'react';
import './massagesModel.css';

class MyMassageModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            massages: [],
            users: [],
            activeItem: {
                id: null,
                text: '',
                picture: null,
                sender: null,
                reciever: null,
            }
        }

        this.getCookie = this.getCookie.bind(this)
        this.fetchMassages = this.fetchMassages.bind(this)
        this.fetchUsers = this.fetchUsers.bind(this)

    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    componentDidMount() {
        this.fetchUsers()
    }


    fetchUsers(e) {
        console.log('Fetching users ...')

        fetch('http://127.0.0.1:8000/u')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    users: data
                })
            )
    }

    fetchMassages(e) {
        let userId = e.target.value
        console.log('Fetching msgs ...', userId)

        fetch(`http://127.0.0.1:8000/p/${userId}`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    massages: data
                })
            )
    }

    
    fetchMassages(e) {
        let userId = e.target.value
        console.log('Fetching msgs ...', userId)

        fetch(`http://127.0.0.1:8000/p/${userId}`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    massages: data
                })
            )
    }


    render() {

        var massages = this.state.massages
        var users = this.state.users
        var self = this

        return (
            <div>
                <div className="users">
                    {users.map(function (user, index) {
                        return (
                            <div className="user" key={index}>

                                <button value={user.id} onClick={self.fetchMassages} className="UsernameButton">
                                    {user.username}
                                </button>
                            </div>)
                    })}
                </div>
                <div className="msgBox">
                    {massages.map(function (msg, id) {
                        return (
                            <div className="msg" key={id}>
                                <p className='author'>{msg.sender} -> </p>
                                <p className='value'>| {msg.text} |</p>
                            </div>
                        )
                    })}
                </div>
            </div>);
    }
}

export default MyMassageModel;