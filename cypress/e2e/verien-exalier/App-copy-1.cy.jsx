describe("Login Form App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Menampilkan 10 user setelah fetch", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/users").as("fetchUsers");
    cy.get(".fetch-user-button").click();
    cy.wait("@fetchUsers");
    cy.get("[class^=user-]").should("have.length", 10);
  });

  it("Menolak submit jika input kosong", () => {
    cy.get(".post-user-button").click();
    cy.get(".fail-response").should("contain", "Masukan data user!");
  });

  it("Berhasil submit jika input terisi", () => {
    cy.get(".name-input").type("Chris");
    cy.get(".email-input").type("chris@example.com");
    cy.get(".phone-input").type("08123456789");

    cy.intercept("POST", "https://jsonplaceholder.typicode.com/users").as("postUser");
    cy.get(".post-user-button").click();
    cy.wait("@postUser");

    cy.get(".success-response").should("contain", "Berhasil membuat user!");
  });
});
