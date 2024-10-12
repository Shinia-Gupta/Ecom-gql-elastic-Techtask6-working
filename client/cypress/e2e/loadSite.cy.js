describe("URL Load Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should open the homepage URL", () => {
    // Visit the homepage
    // Assert that the correct URL is loaded
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should find and interact with the search input form", () => {
    const searchTerm = "iphone cover";
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    // Check if search bar is visible
    cy.viewport("macbook-16");

    cy.get("#search-navbar").should("be.visible").type(searchTerm);

    cy.url().should("not.include", `/search/${encodedSearchTerm}`);

    // Click the search button
    cy.getDataTest("search-button").click();

    // Assert that the URL has changed to the expected search page
    cy.url({ timeout: 50000 }).should(
      "include",
      `/search/${encodedSearchTerm}`
    );

    cy.get("#categories", { timeout: 10000 }).click();
    cy.getDataTest("Cell Phone Cases & Clips", { timeout: 10000 }).click();

    cy.getDataTest("Data Cables", { timeout: 10000 }).click();

    cy.get("#manufacturers", { timeout: 10000 }).click();
    cy.getDataTest("OtterBox", { timeout: 10000 }).click();

    cy.getDataTest("Belkin", { timeout: 10000 }).click();

    cy.getDataTest("apply-filters-button", { timeout: 10000 }).click();
    cy.getDataTest("sort-dropdown-button", { timeout: 10000 }).click();
    cy.getDataTest("most-popular-sort-button", { timeout: 10000 }).click();

    cy.getDataTest("review-count-span", { timeout: 10000 }).then(
      ($reviewCount) => {
        const reviewValues = [...$reviewCount].map((rc) =>
          parseFloat(rc.innerText.replace(/[^0-9.-]+/g, ""))
        );

        const sortedReviews = [...reviewValues].sort((a, b) => b - a);
        expect(reviewValues).to.deep.equal(sortedReviews);
      }
    );
    cy.getDataTest("sort-dropdown-button", { timeout: 10000 }).click();
    cy.getDataTest("low-high-sort-button", { timeout: 10000 }).click();
    cy.get(".product-price", { timeout: 10000 }).should("be.visible");

    cy.get(".product-price", { timeout: 10000 }).then(($prices) => {
      const priceValues = [...$prices].map((price) =>
        parseFloat(price.innerText.replace(/[^0-9.-]+/g, ""))
      );

      const sortedPrices = [...priceValues].sort((a, b) => a - b);
      expect(priceValues).to.deep.equal(sortedPrices);
    });
  });

  it("should find and interact with the search input form in mobile view", () => {
    const searchTerm = "iphone cover";
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    // Check if search bar is visible
    cy.viewport("iphone-8");
    cy.getDataTest("search-icon-button", { timeout: 10000 }).click();
    cy.get("#search-navbar").should("be.visible").type(searchTerm);

    cy.url().should("not.include", `/search/${encodedSearchTerm}`);

    // Click the search button
    cy.getDataTest("search-button-mobile", { timeout: 10000 }).click();

    // Assert that the URL has changed to the expected search page
    cy.url({ timeout: 50000 }).should(
      "include",
      `/search/${encodedSearchTerm}`
    );

    cy.getDataTest("filters-mobile-button", { timeout: 10000 }).click();

    cy.getDataTest("categories-div", { timeout: 10000 }).click();

    cy.getDataTest("Cell Phone Cases & Clips", { timeout: 10000 }).click();

    cy.getDataTest("Data Cables", { timeout: 10000 }).click();

    cy.getDataTest("manufacturers-div", { timeout: 10000 }).click();

    cy.getDataTest("OtterBox", { timeout: 10000 }).click();

    cy.getDataTest("Belkin", { timeout: 10000 }).click();

    cy.getDataTest("apply-filters-button-mobile", { timeout: 10000 }).click();

    cy.getDataTest("sort-dropdown-button", { timeout: 10000 }).click();
    cy.getDataTest("most-popular-sort-button", { timeout: 10000 }).click();

    cy.getDataTest("review-count-span", { timeout: 10000 }).then(
      ($reviewCount) => {
        const reviewValues = [...$reviewCount].map((rc) =>
          parseFloat(rc.innerText.replace(/[^0-9.-]+/g, ""))
        );

        const sortedReviews = [...reviewValues].sort((a, b) => b - a);
        expect(reviewValues).to.deep.equal(sortedReviews);
      }
    );
    cy.getDataTest("sort-dropdown-button", { timeout: 10000 }).click();
    cy.getDataTest("low-high-sort-button", { timeout: 10000 }).click();
    cy.get(".product-price", { timeout: 10000 }).should("be.visible");

    cy.get(".product-price", { timeout: 10000 }).then(($prices) => {
      const priceValues = [...$prices].map((price) =>
        parseFloat(price.innerText.replace(/[^0-9.-]+/g, ""))
      );

      const sortedPrices = [...priceValues].sort((a, b) => a - b);
      expect(priceValues).to.deep.equal(sortedPrices);
    });
  });
});
