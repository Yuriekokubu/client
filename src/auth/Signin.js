import React, { useState } from 'react';
import Layout from '../core/Layout';
import Axios from 'axios';
import { authenticate, isAuth } from './helpers';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: 'jubbb123@gmail.com',
    password: '123456',
    buttonText: 'Submit',
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    Axios.post(`${process.env.REACT_APP_API}/signin`, values)
      .then((response) => {
        console.log('SIGN IN SUCCESS', response);

        authenticate(response, () => {
          setValues({
            ...values,
            email: '',
            password: '',
          });
          toast.success(`Hey ${response.data.user.name},Welcome back!`);
          isAuth() && isAuth().role === 'admin'
            ? history.push('/admin')
            : history.push('/private');
        });
      })
      .catch((error) => {
        console.log('SIGN IN ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.dark(`🦄 ${error.response.data.error}`);
      });
  };

  const signInForm = () => (
    <form>
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
        <button className="btn btn-primary mt-2 w-100" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="text-center p-5">Sign In</h1>
        {signInForm()}
      </div>
    </Layout>
  );
};

export default Signin;
