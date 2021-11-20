import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';


test('Top Element', () => {
  const history = createMemoryHistory(); 
  render(
    <Router history={history} >
        <Header />
  </Router>
  ); 
  const note1 = screen.getByText(/Welcome to Oielly/ig);
  expect(note1).toBeInTheDocument();

  const note2 = screen.getByText(/Contact/ig);
  expect(note2).toBeInTheDocument();

  const note3 = screen.getByText(/Need Assistance/ig);
  expect(note3).toBeInTheDocument();

  const note4 = screen.getByText(/Sign in/ig);
  expect(note4).toBeInTheDocument();
});

test('Middle Element', () => {
  const history = createMemoryHistory(); 
  render(
    <Router history={history} >
        <Header />
  </Router>
  ); 
  const note1 = screen.getByPlaceholderText(/Search.../ig);
  userEvent.type(note1, "gtp");
  expect(note1).toHaveValue('gtp')

  const note2 = screen.getByText(/\(233\) 247-049-416/ig);
  expect(note2).toBeInTheDocument();

  const note3 = screen.getByText(/GHC 0.00/ig);
  expect(note3).toBeInTheDocument();

  const note4 = screen.getByText(/GHC 0.00/ig);
  note4.textContent = 'GHC 5.00';
  expect(note4).toHaveTextContent('GHC 5.00');
});


test('Bottom Element', () => {
  const history = createMemoryHistory(); 
  render(
    <Router history={history} >
        <Header />
  </Router>
  ); 
  const note1 = screen.getAllByText(/Home/ig)[0];
  expect(note1).toBeInTheDocument();

  const note2 = screen.getAllByText(/Material/ig)[0];
  expect(note2).toBeInTheDocument();

  const note3 = screen.getAllByText(/Blog/ig)[0];
  expect(note3).toBeInTheDocument();

  const note4 = screen.getAllByText(/About Us/ig)[0];
  expect(note4).toBeInTheDocument();
});