import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios';

class SingUpInput extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        password: '',
        industries: '',
        auth: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn = (e) => {
      e.preventDefault();
      let user = {
        email: this.state.email,
        password: this.state.password,
      };
      axios.post('/API/loginUser', user)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          this.setState({
            auth: data.auth,
          });
          if (data.auth) {
            let cookies = new Cookies();
            cookies.set("SUIRA_TOKEN_COOKIE", data.token, {path: '/'});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } 

    handleSignUp = (e) => {
      e.preventDefault();
      let newIndustries = this.state.industries.split(',');
      for(let i = 0; i < newIndustries.length; i++) {
        newIndustries[i] = newIndustries[i].trim();
      }
      let user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        industries: newIndustries,
      };
      axios.post('/API/signUpUser', user)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          this.setState({
            auth: data.auth,
          });
          if (data.auth) {
            let cookies = new Cookies();
            cookies.set("SUIRA_TOKEN_COOKIE", data.token, {path: '/'});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
          <div>
            <h1>Sign Up!</h1>
            <Form onSubmit={this.handleSignUp}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="name" type="text" placeholder="Nombre" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" placeholder="E-mail" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control name="password" type="password" placeholder="Contraseña" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>¿Qué áreas de las industrias creativas te interesan?</Form.Label>
                <Form.Control name="industries" type="text" placeholder="Arte, Música, Audiovisual, Diseño, Editorial, etc." onChange={this.handleChange}/>
              </Form.Group>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Form>
          <hr/>
            <h1>Log In</h1>
            <Form onSubmit={this.handleLogIn}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" placeholder="E-mail" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control name="password" type="password" placeholder="Contraseña" onChange={this.handleChange}/>
              </Form.Group>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Form>
          </div>
        );
    }
}

export default SingUpInput;