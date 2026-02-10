describe('Login Form E2E Testleri', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Başarılı form doldurulunca success sayfasına gider', () => {
    cy.get('[data-cy="email-input"]').type('test@test.com');
    cy.get('[data-cy="password-input"]').type('Test1234');
    cy.get('[data-cy="terms-checkbox"]').check();
    cy.get('[data-cy="submit-btn"]').click();
    cy.url().should('include', '/success');
    cy.contains('Login Successful');
  });

  it('Email yanlış girildiğinde 1 hata mesajı gösterir ve buton disabled olur', () => {
    cy.get('[data-cy="email-input"]').type('yanlisemail')
    cy.get('[data-cy="email-input"]').blur()
    cy.get('.invalid-feedback').should('have.length', 1)
    cy.contains('Geçerli bir email adresi giriniz').should('be.visible')
    cy.get('[data-cy="submit-btn"]').should('be.disabled')
  });

  it('Email ve password yanlış girildiğinde 2 hata mesajı gösterir', () => {
    cy.get('[data-cy="email-input"]').type('yanlis')
    cy.get('[data-cy="email-input"]').blur()

    cy.get('[data-cy="password-input"]').type('123')
    cy.get('[data-cy="password-input"]').blur()

    cy.get('.invalid-feedback').should('have.length', 2)
    cy.contains('Parola en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir').should('be.visible')
    cy.get('[data-cy="submit-btn"]').should('be.disabled')
  });

  it('Email ve password doğru ama kurallar kabul edilmezse buton disabled kalır', () => {
    cy.get('[data-cy="email-input"]').type('test@test.com');
    cy.get('[data-cy="password-input"]').type('Test1234');
    cy.get('[data-cy="terms-checkbox"]').click().click();
    cy.get('[data-cy="submit-btn"]').should('be.disabled');
    cy.contains('Lütfen şartları kabul edin').should('be.visible')
  });
});