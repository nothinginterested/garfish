/// <reference types="cypress" />

const basename = '/garfish_master';

const sleep = (time = 200)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    },time)
  })
}

describe('whole process vm sandbox set variable', () => {
  beforeEach(() => {
    Cypress.env({
      garfishRunConfig: {
        basename: basename,
        disablePreloadApp: true,
        sandbox: {
          snapshot: false,
        },
        protectVariable: ['dynamicScriptOnloadTag','dynamicScriptOnerrorTag'],
      },
    });
    cy.visit(`http://localhost:2333${basename}/react/vm-sandbox`);
  });

  it('add script onload event', () => {
    const ProxyVariableTitle = 'vm sandbox';

    cy.window().then((win) => {
      cy.contains('[data-test=title]', ProxyVariableTitle)
      .then(() => {
        return cy.get('[data-test=click-set-add-dynamic-script-onload]').click();
      })
      .then(async ()=> await sleep(2000))
      .then(() => {
        expect(win.dynamicScriptOnloadTag).to.equal(true);
      });
    });
  });

  it('add script onerror event', () => {
    cy.on('uncaught:exception', () => {
      return false;
    });

    const ProxyVariableTitle = 'vm sandbox';
    cy.window().then((win) => {
      cy.contains('[data-test=title]', ProxyVariableTitle)
      .then(() => {
        return cy.get('[data-test=click-set-add-dynamic-script-onerror]').click();
      })
      .then(async ()=> await sleep(2000))
      .then(() => {
        expect(win.dynamicScriptOnerrorTag).to.equal(true);
      });
    });
  });
});
