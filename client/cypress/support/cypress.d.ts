declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select DOM element by data-test attribute.
       * @example cy.getDataTest('submit-button')
       */
      getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
  