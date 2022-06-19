/// <reference types="cypress" />
import {
    customer
} from '../../fixtures/productData';
import {
    purchase,
    updatedPurchase
} from '../../fixtures/purchaseData';

let purchaseId;

describe('Purchase API Tests', () => {
    before(() => {
        cy.createCustomer(customer);
        cy.login(customer.email, customer.password);
    });

    after(() => {
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
    })

    it('Submit purchase', () => {
        cy.request({
                url: '/purchase',
                method: 'POST',
                body: purchase,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body).has.property('message', 'Purchase submitted successfully!');
                expect(res.body.data).has.property('discountCode', purchase.discountCode);
                expect(res.body.data).has.property('_id');
                expect(res.body.data).has.property('date');
                purchaseId = res.body.data._id;
            });
    });

    it('Retrieve all purchases', () => {
        cy.request({
                url: '/purchase',
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

    it('Retrieve purchase by id', () => {
        cy.request({
                url: `/purchase/${purchaseId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).has.property('discountCode', purchase.discountCode);
            })
    });

    it('Update purchase ', () => {
        cy.request({
                url: `/purchase/${purchaseId}`,
                method: 'PUT',
                body: updatedPurchase,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).has.property('message', 'Purchase updated successfully!');
            });
    });

    it('Delete purchase by id', () => {
        cy.request({
                url: `/purchase/${purchaseId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).has.property('message', 'Purchase deleted successfully!');
            })
    });
});