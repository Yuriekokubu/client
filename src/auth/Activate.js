import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import Axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    Axios.post(`${process.env.REACT_APP_API}/account-activation`, { token })
      .then((response) => {
        console.log('Account Activation', response);
        setValues({
          ...values,
          show: false,
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log('Account Activation ERROR', error.response.data.error);
        toast.dark(`🦄 ${error.response.data.error}`);
      });
  };

  const activationLnk = () => (
    <div>
      <h1 className="text-center p-5">
        Hey {name}, Ready to activate your account?
      </h1>
      <button className="btn btn-outline-dark" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLnk()}
      </div>
    </Layout>
  );
};

export default Activate;
