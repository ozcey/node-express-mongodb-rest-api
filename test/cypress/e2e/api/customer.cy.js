/// <reference types="cypress" />
import customerData from '../../fixtures/customerData';

describe('Customer API Tests', () => {

    it('Create customer', () => {
        cy.createCustomer(customerData.CUSTOMER);
    });

    it('Login to account', () => {
        cy.login(customerData.CUSTOMER.email, customerData.CUSTOMER.password);

    });

    it('Retrieve all customers', () => {
        cy.request({
                url: '/customer',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).has.property('data');
            })
    });

    it('Retrieve customer by id', () => {
        cy.request({
                url: `/customer/${Cypress.env('customerId')}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).has.property('email', customerData.CUSTOMER.email);
                expect(res.body.data).has.property('_id', Cypress.env('customerId'));
            })
    });

    it('Update customer ', () => {
        cy.request({
                url: `/customer/${Cypress.env('customerId')}`,
                method: 'PUT',
                body: customerData.UPDATED_CUSTOMER,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).has.property('message', 'Customer updated successfully!');
            });
    });

    it('Delete customer by id', () => {
        cy.request({
                url: `/customer/${Cypress.env('customerId')}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).has.property('message', 'Customer deleted successfully!');
            })
    });
});