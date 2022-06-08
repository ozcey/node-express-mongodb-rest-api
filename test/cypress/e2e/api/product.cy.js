/// <reference types="cypress" />
import {
    product,
    updatedProduct,
    customer
} from '../../fixtures/productData';

let productId;

describe('Customer API Tests', () => {
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

    it('Create product', () => {
        cy.request({
                url: '/product',
                method: 'POST',
                body: product,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body).has.property('message', 'Product created successfully!');
                expect(res.body.data).has.property('name', product.name);
                expect(res.body.data).has.property('_id');
                productId = res.body.data._id;
                cy.log('p id', productId)
            });
    });

    it('Retrieve all products', () => {
        cy.request({
                url: '/product',
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

    it('Retrieve product by id', () => {
        cy.log('p id', productId)
        cy.request({
                url: `/product/${productId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).has.property('name', product.name);
            })
    });

    it('Update product ', () => {
        cy.request({
                url: `/product/${productId}`,
                method: 'PUT',
                body: updatedProduct,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).has.property('message', 'Product updated successfully!');
            });
    });

    it('Delete product by id', () => {
        cy.request({
                url: `/product/${productId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).has.property('message', 'Product deleted successfully!');
            })
    });
});