/// <reference types="cypress" />
import productData from '../../fixtures/productData';

let productId;

describe('Product API Tests', () => {
    before(() => {
        cy.createCustomer(productData.CUSTOMER);
        cy.login(productData.CUSTOMER.email, productData.CUSTOMER.password);
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
                body: productData.PRODUCT,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`
                }
            })
            .then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body).has.property('message', 'Product created successfully!');
                expect(res.body.data).has.property('name', productData.PRODUCT.name);
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
                expect(res.body.data).has.property('name', productData.PRODUCT.name);
            })
    });

        it('Retrieve product by name', () => {
            cy.request({
                    url: `/product/search/${productData.PRODUCT.name}`,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cypress.env('token')}`
                    }
                })
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.data).has.property('name', productData.PRODUCT.name);
                })
        });

    it('Update product ', () => {
        cy.request({
                url: `/product/${productId}`,
                method: 'PUT',
                body: productData.UPDATE_PRODUCT,
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