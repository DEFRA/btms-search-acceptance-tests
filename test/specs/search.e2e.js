import { browser, expect } from "@wdio/globals";
import SearchPage from "../page-objects/search.page";
import SearchResultsPage from "../page-objects/search_results.page";
import noMatch from "../../data/movement/nomatch.json";

describe("Search page", () => {
  it('Should be on the search page', async () => {
    await SearchPage.open()

    await expect(browser).toHaveTitle('Search - Border Trade Matching Service')

    await expect(SearchPage.searchTextBox).toBeDisplayed()
    await expect(SearchPage.searchButton).toBeDisplayed()
  })

  it('Should navigate to the search results page for a valid MRN search', async () => {
    await SearchPage.open()
    await SearchPage.searchFor(noMatch._id)

    await expect(SearchResultsPage.pageHeading).toBeDisplayed()
    await expect(SearchResultsPage.pageTitle).toHaveTitle(
      'Search result - Border Trade Matching Service'
    )
  })

  it('Should present the correct error message when an invalid MRN is searched for', async () => {
    const searchTerm = 'invalid'
    const expectedErrorMessage = 'You must enter a valid MRN or CHED'

    await SearchPage.open()
    await SearchPage.searchFor(searchTerm)
    await expect(await SearchPage.getSearchErrorMessage()).toContain(expectedErrorMessage)
  })

  it('Should present the correct error message when an empty search is requested', async () => {
    const expectedErrorMessage = 'You must enter a valid MRN or CHED'

    await SearchPage.open()
    await SearchPage.searchClearedSearchField()
    await expect(await SearchPage.getSearchErrorMessage()).toContain(expectedErrorMessage)
  })

  it("Should present the correct error message when a search for a non-existing, but well formatted CHED is searched", async () => {
    const expectedErrorMessage = "This MRN or CHED reference cannot be found";
    const searchTerm = "CHEDD.GB.2026.0000000";

    await SearchPage.open();
    await SearchPage.searchFor(searchTerm);
    await expect(await SearchPage.getSearchErrorMessage()).toContain(expectedErrorMessage);
  });

  it("Should present the correct error message when a search is made for a well formatted, but non existent MRN is searched ", async () => {
    const searchTerm = "24GBDBRAAAAAAAAAA0";
    const expectedErrorMessage = "This MRN or CHED reference cannot be found";

    await SearchPage.open();
    await SearchPage.searchFor(searchTerm);
    await expect(await SearchPage.getSearchErrorMessage()).toContain(expectedErrorMessage);
  });
});
