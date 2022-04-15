import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import './App.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(1);

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    age: false
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(responce => setUsers(responce.data));
  }, []);

  const addUser = async (event) => {
    event.preventDefault();

    cleanInputs();
    cleanErrors();

    await axios.post(
      'http://localhost:3001/users',
      {
        name,
        phone,
        gender,
        age
      }
    );

    axios.get('http://localhost:3001/users')
      .then(responce => setUsers(responce.data));
  }

  const validate = () => ({
      name: name.length === 0,
      phone: phone.length === 0,
      age: age <= 0 && age > 122,
  });

  const cleanInputs = () => {
    setName('');
    setPhone('');
    setGender(null);
    setAge('');
  };

  const cleanErrors = () => {
    setTouched({
      name: false,
      phone: false,
      age: false
    });
  };

  const errors = validate();

  const isDisabled = Object.keys(errors).some(x => errors[x]);

  return (
    <div className='App'>
      <h1>SoftIndex TT</h1>
      <form
        onSubmit={addUser}
        className='form'
      >
        <label
          className={classNames(
            'form__label',
            { 'form__label--error': errors.name && touched.name }
          )}
        >
          Name :&nbsp;
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            onBlur={() => setTouched({ ...touched, name: true })}
            required
            className={classNames(
              'form__text-input',
              { 'form__text-input--error': errors.name && touched.name }
            )}
          />
        </label>
        <label
          className={classNames(
            'form__label',
            { 'form__label--error': errors.phone && touched.phone }
          )}
        >
          Phone :&nbsp;
          <input
            type='tel'
            value={phone}
            onChange={event => setPhone(event.target.value)}
            onBlur={() => setTouched({ ...touched, phone: true })}
            required
            className={classNames(
              'form__text-input',
              { 'form__text-input--error': errors.phone && touched.phone }
            )}
          />
        </label>
        <span className='form__radio-buttons'>
          <label
            className='form__label'
          >
            Male :&nbsp;
            <input
              name='gender'
              type='radio'
              value={true}
              onChange={event => setGender(event.target.value)}
              required
            />
          </label>
          <label
            className='form__label'
          >
            Female :&nbsp;
            <input
              name='gender'
              type='radio'
              value={false}
              onChange={event => setGender(event.target.value)}
            />
          </label>
        </span>
        <label
          className={classNames(
            'form__label',
            { 'form__label--error': errors.age && touched.age }
          )}
        >
          Age :&nbsp;
          <input
            type="number"
            value={age}
            onChange={event => setAge(event.target.value)}
            onBlur={() => setTouched({ ...touched, age: true })}
            required
            className={classNames(
              'form__text-input',
              { 'form__text-input--error': errors.age && touched.age }
            )}
          />
        </label>
        <button
          type='submit'
          className='form__button'
          disabled={isDisabled}
        >
          Add
        </button>
      </form>
      <table className='table'>
        <tr className='table__row'>
          <th className='table__head'>Name</th>
          <th className='table__head'>Phone</th>
          <th className='table__head'>Gender</th>
          <th className='table__head'>Age</th>
        </tr>
        {users.map(user => (
          <tr key={user._id} className='table__row'>
            <td className='table__data'>{user.name}</td>
            <td className='table__data'>{user.phone}</td>
            <td className='table__data'>{user.gender === true ? 'Male' : 'Female'}</td>
            <td className='table__data'>{user.age}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
