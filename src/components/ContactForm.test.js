import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    
    const firstNameInput = screen.getByLabelText(/First Name*/i) 
    userEvent.type(firstNameInput, "Stuf");
    
    const errorMessage = await screen.findAllByTestId('error')
    expect(errorMessage).toHaveLength(1);
    


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
        const errorMessage = screen.getAllByTestId('error')
        expect(errorMessage).toHaveLength(1);
    })



});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "Taveras")
    
    const errorMessage = await screen.findByText(/email must be a valid email address/i)
    expect(errorMessage).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
   render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i) 
    userEvent.type(firstNameInput, "Robert");
    
    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, "Robert@gmail.com")

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessage = await screen.findByText(/lastName is a required field/i)
    expect(errorMessage).toBeInTheDocument();    
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
    
    await waitFor(()=>{
        const firstDisplay = screen.queryByText('Robert')
        const lastDisplay = screen.queryByText('Taveras')
        const emailDisplay = screen.queryByText('Robert@gmail.com')
        
        const message = screen.queryByTestId('messageDisplay')
        expect(firstDisplay).toBeInTheDocument();
        expect(lastDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(message).not.toBeInTheDocument();
    })



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

    const messageInput = screen.getByLabelText(/message/i)
    userEvent.type(messageInput, "Robert@gmail.com")
    expect(messageInput).toBeInTheDocument();

    const button = screen.getByRole("button");
    userEvent.click(button);
 


});