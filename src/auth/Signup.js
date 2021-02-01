import React, { useState } from 'react';
import Layout from '../core/Layout';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { isAuth } from './helpers';
import { Redirect } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit',
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    Axios.post(`${process.env.REACT_APP_API}/signup`, values)
      .then((response) => {
        console.log('SIGN UP SUCCESS', response);
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          buttonText: 'Submitted',
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log('SIGN UP ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.dark(`🦄 ${error.response.data.error}`);
      });
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div>
        <button className="btn btn-primary mt-2" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="text-center p-5">Sign Up</h1>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
