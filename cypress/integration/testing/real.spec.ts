/// <reference types="cypress"/>

describe('Test on real page', function () {
    it('Simple black screen', function () {
        cy.visit('http://localhost:7910/');
        cy.get('canvas');
    });
    it('Cube', function () {
        cy.visit('http://localhost:7910/cube');
        cy.get('canvas');
    });
});