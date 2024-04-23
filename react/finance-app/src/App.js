import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const response = await api.get('/transactions');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransactions();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };

  return(
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href="#">
            C . R . U . D - Application
          </a>
        </div>
      </nav>

      <div className='container'>
        <form onSubmit={handleFormSubmit}>

          <div class="mb-3 mt-3">
            <label htmlFor='amount' className='form-Label'>
              Amount
            </label>
            <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}/>
          </div>

          <div class="mb-3">
            <label htmlFor='category' className='form-Label'>
              Category
            </label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
          </div>

          <div class="mb-3">
            <label htmlFor='description' className='form-Label'>
              Description
            </label>
            <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}/>
          </div>

          <div class="mb-3">
            <label htmlFor='is_income' className='form-Label'>
            Income        
            </label>
            <input type='checkbox' id='is_income'  name='is_income' onChange={handleInputChange} value={formData.is_income}/>
          </div>

          <div class="mb-3">
            <label htmlFor='date' className='form-Label'>
            Date
            </label>
            <input type='text' className='form-control' id='date' name='date' onChange={handleInputChange} value={formData.date}/>
          </div>


          <button type='submit' className='btn btn-primary'>submit</button>

        </form>


        <br />
        <br />
        <h2> Showing all observations on database ! </h2>
        <table className='table table-striped table-borderred table-hover'>
          <thead>
            <tr>
              <th scope='col'>Amount</th>
              <th scope='col'>Category</th>
              <th scope='col'>Description</th>
              <th scope='col'>Is Income</th>
              <th scope='col'>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


}


export default App;
