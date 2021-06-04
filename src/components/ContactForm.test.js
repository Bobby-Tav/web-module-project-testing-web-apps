import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    
    const firstNameInput = screen.getByLabelText(/first name/i) 
    userEvent.type(firstNameInput, "Stuf");
    
    const errorMessage = screen.getByTestId('error')


    await waitFor( ()=>{
        expect(errorMessage).toBeInTheDocument();
    })


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(()=> {
        const errorMessages = screen.getAllByTestId('error')
        expect(errorMessages).toHaveLength(3);
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i) 
    userEvent.type(firstNameInput, "Robert");
    
    const lastNameInput = screen.getByLabelText(/last name/i) 
    userEvent.type(lastNameInput, "Taveras");

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    
    
    await waitFor(() =>{
        const errorMessage = screen.getByTestId('error')
        expect(errorMessage).toBeInTheDocument();
    })



});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)


    const firstNameInput = screen.getByLabelText(/first name/i) 
    userEvent.type(firstNameInput, "Robert");
    
    const lastNameInput = screen.getByLabelText(/last name/i) 
    userEvent.type(lastNameInput, "Taveras");

    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "Taveras")

    const button = screen.getByRole("button");
    userEvent.click(button);
    
    await waitFor(()=>{
        const errorMessage = screen.getByTestId('error')
        expect(errorMessage).toBeInTheDocument();
    })



});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
   render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i) 
    userEvent.type(firstNameInput, "Robert");
    
    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "Robert@gmail.com")

    const button = screen.getByRole("button");
    userEvent.click(button);
    
    await waitFor(()=>{
        const errorMessage = screen.getByTestId('error')
        expect(errorMessage).toBeInTheDocument();
    })     
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    
    const firstNameInput = screen.getByLabelText(/first name/i) 
    userEvent.type(firstNameInput, "Robert");
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = screen.getByLabelText(/last name/i) 
    userEvent.type(lastNameInput, "Taveras");
    expect(lastNameInput).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "Robert@gmail.com")
    expect(emailInput).toBeInTheDocument();

    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(emailInput).toBeInTheDocument();



});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i) 
    userEvent.type(firstNameInput, "Robert");
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = screen.getByLabelText(/last name/i) 
    userEvent.type(lastNameInput, "Taveras");
    expect(lastNameInput).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "Robert@gmail.com")
    expect(emailInput).toBeInTheDocument();

    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(emailInput).toBeInTheDocument();


});