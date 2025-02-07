// import { browser, expect } from '@wdio/globals'
// import SearchPage from 'page-objects/search.page'
// import SearchResultsPage from 'page-objects/search_results.page'
// import noMatch from '../../data/movement/noMatch.json'

// describe('Search page', () => {
//   it('Should be on the search page', async () => {
//     await SearchPage.open()

//     await expect(browser).toHaveTitle(
//       'Search - Border Trade Matching Service'
//     )

//     await expect(SearchPage.searchTextBox).toBeDisplayed()
//     await expect(SearchPage.searchButton).toBeDisplayed()
//   })

//   it('Should navigate to the search results page for a valid MRN search', async () => {
//     await SearchPage.open()
//     await SearchPage.searchFor(noMatch._id)

//     await expect(browser).toHaveTitle(
//       'Search result - Border Trade Matching Service'
//     )
//     await expect(SearchResultsPage.heading).toBeDisplayed()
//   })
// })
