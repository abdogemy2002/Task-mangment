import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import './styles/Login.css';
import axios from 'axios'; 

const Register = () => {
  const navigate = useNavigate();
  const { setIsRegistered, setUserId, setUsername } = useAuth(); 

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: (values) => {
      // Fetch existing users and check if the username is already taken
      axios.get('https://api.jsonbin.io/v3/b/66e5dac3e41b4d34e4303818', {
        headers: {
          'X-Master-Key': '$2a$10$bq9ZR67rhOSPkUb8Mo2Yv.7HSltAjDzppL5QPHThIYluD2QkA6XWG' // Replace with your actual API key
        }
      })
      .then(response => {
        const users = response.data.record.users || [];  // Adjust to access the users array

        // Check if the username is already taken
        const userExists = users.some(user => user.name === values.name);
        if (userExists) {
          toast.error('Username is already taken. Please choose a different one.');
          return;
        }

        // If username is not taken, proceed with registration
        const newUser = {
          id: Math.random().toString(36).substring(2, 10),  // Generate a random ID
          name: values.name,
          password: values.password,
        };

        // Add the new user to the existing users array
        const updatedUsers = [...users, newUser];

        // Update the bin with the new user data
        axios.put('https://api.jsonbin.io/v3/b/66e5dac3e41b4d34e4303818', {
          users: updatedUsers,  // Ensure the correct key ('users')
          tasks: response.data.record.tasks  // Keep the tasks unchanged
        }, {
          headers: {
            'X-Master-Key': '$2a$10$bq9ZR67rhOSPkUb8Mo2Yv.7HSltAjDzppL5QPHThIYluD2QkA6XWG'  // Replace with your actual API key
          }
        })
        .then(() => {
          setIsRegistered(true);
          setUserId(newUser.id);
          setUsername(newUser.name);
          toast.success('Registration successful!');
          navigate('/tasks');
        })
        .catch(error => {
          toast.error(`Error registering user: ${error.message}`);
        });
      })
      .catch(error => {
        toast.error(`Error checking username availability: ${error.message}`);
      });
    },
  });

  return (
    <div className="container mt-4">
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      <div className="mt-3">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
