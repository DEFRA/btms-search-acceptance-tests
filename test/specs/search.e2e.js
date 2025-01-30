import { browser, expect } from '@wdio/globals'

import SearchPage from 'page-objects/search.page'
import SearchResultsPage from 'page-objects/search_results.page'

describe('Search page', () => {
  it('Should be on on the search page', async () => {
    await SearchPage.open()

    await expect(browser).toHaveTitle(
      'Search - Border Trade Matching Service | Border Trade Matching Service'
    )

    await expect(SearchPage.searchTextBox).toBeDisplayed()
    await expect(SearchPage.searchButton).toBeDisplayed()
  })

  it('Should navigate to the search results page for a valid MRN search', async () => {
    await SearchPage.open()
    await SearchPage.searchFor('24GBDEJ61MOYFS8AR6')

    await expect(browser).toHaveTitle(
      'Search result - Border Trade Matching Service | Border Trade Matching Service'
    )
    await expect(SearchResultsPage.heading).toBeDisplayed()
  })
})
