import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import processCreditCard, {luhnChk, identifyCard} from './ValidationRoutines.js';

//Front-end
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});



//General Tests for identifyCard()
it('Identifies AMEX correctly', () => {
  expect(identifyCard('378282246310005')).toBe('AMEX');
});
it('Identifies VISA correctly', () => {
  expect(identifyCard('4111111111111111')).toBe('Visa');
});
it('Identifies Unknown correctly', () => {
  expect(identifyCard('9111111111111111')).toBe('Unknown');
});
//...Can go with other types in the same way

//Edge cases for identifyCard()
it('Identifies Empty card correctly', () => {
  expect(identifyCard('')).toBe('Unknown');
});
it('Identifies Random string correctly', () => {
  expect(identifyCard('sfasdwd')).toBe('Unknown');
});
it('Identifies AMEX with spaces correctly', () => {
  expect(identifyCard('378 2822 4631 0005')).toBe('AMEX');
});


//Tests for luhnChk()
it('Validates Luhn for correct input', () => {
  expect(luhnChk('4408 0412 3456 7893')).toBe(true);
});
it('Validates Luhn for incorrect input', () => {
  expect(luhnChk('4417 1234 5678 9112')).toBe(false);
});

//Edge cases for luhnChk()
it('Validates Luhn for empty input', () => {
  expect(luhnChk('')).toBe(false);
});
it('Validates Luhn for non-card input', () => {
  expect(luhnChk('aomddiewjdioed wej fweifj')).toBe(false);
});


//Integration test for processCreditCard()
it('Processes Valid AMEX correctly', () => {
  let output = processCreditCard('378282246310005');
  expect(output.type).toBe('AMEX');
  expect(output.valid).toBe(true);
});

it('Processes InValid AMEX correctly', () => {
  let output = processCreditCard('378282246310007');
  expect(output.type).toBe('AMEX');
  expect(output.valid).toBe(false);
});

it('Processes Valid MasterCard correctly', () => {
  let output = processCreditCard('5105105105105100');
  expect(output.type).toBe('MasterCard');
  expect(output.valid).toBe(true);
});

it('Processes InValid MasterCard correctly', () => {
  let output = processCreditCard('5105105105105106');
  expect(output.type).toBe('MasterCard');
  expect(output.valid).toBe(false);
});
//...Can go with other types in the same way

//Edge cases
it('Processes Other card correctly', () => {
  let output = processCreditCard('9111111111111111');
  expect(output.type).toBe('Unknown');
  expect(output.valid).toBe(false);
});

it('Processes Random string correctly', () => {
  let output = processCreditCard('alkasiofiosa;djasiod');
  expect(output.type).toBe('Unknown');
  expect(output.valid).toBe(false);
});

it('Processes Valid card with other symbols correctly', () => {
  let output = processCreditCard('5105 1051 0510 5106');
  expect(output.type).toBe('MasterCard');
  expect(output.valid).toBe(false);
});

