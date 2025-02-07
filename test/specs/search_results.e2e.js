import { browser, expect } from '@wdio/globals'
import SearchPage from 'page-objects/search.page'
import SearchResultsPage from 'page-objects/search_results.page'
import { decisionToText } from '../../utils/data_mapper'

import noMatch from '../../data/movement/noMatch.json'

describe('Search Results page', () => {
  it('Should display the correct search results details', async () => {
    await SearchPage.open()
    await SearchPage.searchFor(noMatch._id)

    await expect(SearchResultsPage.heading).toBeDisplayed()
    await expect(SearchResultsPage.heading).toHaveText(noMatch._id)
    await expect(await SearchResultsPage.status).toHaveText(await decisionToText(noMatch.alvsDecisionStatus.context.decisionComparison.decisionMatched))
    // await SearchResultsPage.getTableHeadings()
    //table details
    console.log("*******")
    console.log((await SearchResultsPage.getTableHeadings()))
    console.log((await SearchResultsPage.getTableRowIndex(1)))
    console.log("******")
    // await expect(SearchResultsPage.heading).toHaveText(noMatch._id)

    // console.log(
    //   chedData.alvsDecisionStatus.context.decisionComparison.decisionMatched
    // )
    // console.log(
    //   decisionToText(
    //     chedData.alvsDecisionStatus.context.decisionComparison.decisionMatched
    //   )
    // )

    /*
    Refusal: 24GBDFLAQR9XLE0AR9
No match: 24GBCSKRBGODRIHAR5
Hold: 24GBDBRFKQWZIPBAR0
Match: 24GBCLGKDTMWAQ5AR3
Some example CHED references:
CHEDD.GB.2024.5019877
CHEDP.GB.2024.5130884
    */
  })
})
