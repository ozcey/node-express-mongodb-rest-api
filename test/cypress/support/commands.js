// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createCustomer', (customer) => {
    cy.request({
            url: '/customer',
            method: 'POST',
            body: customer
        })
        .then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body).has.property('message', 'Customer created successfully!');
            expect(res.body.data).has.property('_id');
            expect(res.body.data).has.property('email', customer.email);
            Cypress.env('customerId', res.body.data._id)
        });
});

Cypress.Commands.add('login', (email, password) => {
    const url = '/customer/login';
    cy.request({
        url: url,
        method: 'POST',
        body: {
            email: email,
            password: password
        }
    }).then((res) => {
        expect(res.status).equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body).has.property('expiresIn', 3600);
        Cypress.env('token', res.body.token);
    });
});