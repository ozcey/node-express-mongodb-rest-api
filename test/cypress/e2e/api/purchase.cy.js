/// <reference types="cypress" />
import data from '../../fixtures/productData';
import purchaseData from '../../fixtures/purchaseData';

let purchaseId;

describe('Purchase API Tests', () => {
    before(() => {
        cy.createCustomer(data.CUSTOMER);
        cy.login(data.CUSTOMER.email, data.CUSTOMER.password);
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
                body: purchaseData.PURCHASE,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body).has.property('message', 'Purchase submitted successfully!');
                expect(res.body.data).has.property('discountCode', purchaseData.PURCHASE.discountCode);
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
                expect(res.body.data).has.property('discountCode', purchaseData.PURCHASE.discountCode);
            })
    });

    it('Update purchase ', () => {
        cy.request({
                url: `/purchase/${purchaseId}`,
                method: 'PUT',
                body: purchaseData.UPDATED_PURCHASE,
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