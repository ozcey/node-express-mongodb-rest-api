/// <reference types="cypress" />
import {
    customer,
    updatedCustomer
} from '../../fixtures/customerData';

describe('Customer API Tests', () => {

    it('Create customer', () => {
        cy.createCustomer(customer);
    });

    it('Login to account', () => {
        cy.login(customer.email, customer.password);

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
                expect(res.body.data).has.property('email', customer.email);
                expect(res.body.data).has.property('_id', Cypress.env('customerId'));
            })
    });

    it('Update customer ', () => {
        cy.request({
                url: `/customer/${Cypress.env('customerId')}`,
                method: 'PUT',
                body: updatedCustomer,
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