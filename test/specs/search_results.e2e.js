import SearchPage from 'page-objects/search.page'
import SearchResultsPage from 'page-objects/search_results.page'
import { decisionToText } from '../../utils/data_mapper'

import noMatch from '../../data/movement/nomatch.json'
import refusalDoc from '../../data/movement/refusal.json'
import chedRefusalDoc from '../../data/import_notifications/refusal.json'
import holdDocument from '../../data/movement/hold.json'
import { expect } from '~/node_modules/@wdio/globals/build/index'

describe('Search Results page', () => {
  
  it('Should display the correct search results details for a no match clearance request', async () => {
    await SearchPage.open()
    await SearchPage.searchFor(noMatch._id)

    await expect(SearchResultsPage.heading).toBeDisplayed()
    await expect(SearchResultsPage.heading).toHaveText(noMatch._id)
    await expect(await SearchResultsPage.status).toHaveText(
      await decisionToText(
        noMatch.alvsDecisionStatus.context.decisionComparison.decisionMatched
      )
    )

    await expect(SearchResultsPage.getTableRowIndex(1)[0]).toHaveText(
      noMatch.clearanceRequests[0].items[0].itemNumber
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[1]).toHaveText(
      noMatch.clearanceRequests[0].items[0].taricCommodityCode
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[2]).toHaveText(
      noMatch.clearanceRequests[0].items[0].goodsDescription
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[3]).toHaveText(
      noMatch.clearanceRequests[0].items[0].itemNetMass
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[4]).toHaveText(
      noMatch.clearanceRequests[0].items[0].documents[0].documentReference
    )

    await expect(SearchResultsPage.getTableRowIndex(2)[0]).toHaveText(
      noMatch.clearanceRequests[0].items[1].itemNumber
    )
    await expect(SearchResultsPage.getTableRowIndex(2)[1]).toHaveText(
      noMatch.clearanceRequests[0].items[1].taricCommodityCode
    )
    await expect(SearchResultsPage.getTableRowIndex(2)[2]).toHaveText(
      noMatch.clearanceRequests[0].items[1].goodsDescription
    )
    await expect(SearchResultsPage.getTableRowIndex(2)[3]).toHaveText(
      noMatch.clearanceRequests[0].items[1].itemNetMass
    )
    await expect(SearchResultsPage.getTableRowIndex(2)[4]).toHaveText(
      noMatch.clearanceRequests[0].items[1].documents[0].documentReference
    )
  })
    
  it('Should display the correct search results details for a held clearance request', async () => {
    await SearchPage.open()
    await SearchPage.searchFor(holdDocument._id)

    await expect(SearchResultsPage.heading).toBeDisplayed()
    await expect(SearchResultsPage.heading).toHaveText(holdDocument._id)

    await expect(SearchResultsPage.getTableRowIndex(1)[0]).toHaveText(
      holdDocument.clearanceRequests[0].items[0].itemNumber
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[1]).toHaveText(
      holdDocument.clearanceRequests[0].items[0].taricCommodityCode
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[2]).toHaveText(
      holdDocument.clearanceRequests[0].items[0].goodsDescription
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[3]).toHaveText(
      holdDocument.clearanceRequests[0].items[0].itemNetMass
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[4]).toHaveText(
      holdDocument.clearanceRequests[0].items[0].documents[0]
        .documentReference
    )

    // no import notification to verify details
  })

  it('Should display the correct search results details for a refusal clearance request', async () => {
    await SearchPage.open()
    await SearchPage.searchFor(refusalDoc._id)

    await expect(SearchResultsPage.heading).toBeDisplayed()
    await expect(SearchResultsPage.heading).toHaveText(refusalDoc._id)

    await expect(SearchResultsPage.getTableRowIndex(1)[0]).toHaveText(
      refusalDoc.clearanceRequests[0].items[0].itemNumber
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[1]).toHaveText(
      refusalDoc.clearanceRequests[0].items[0].taricCommodityCode
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[2]).toHaveText(
      refusalDoc.clearanceRequests[0].items[0].goodsDescription
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[3]).toHaveText(
      refusalDoc.clearanceRequests[0].items[0].itemNetMass
    )
    await expect(SearchResultsPage.getTableRowIndex(1)[4]).toHaveText(
      refusalDoc.clearanceRequests[0].items[0].documents[0].documentReference
    )

    // ched details

    await expect(SearchResultsPage.getChedTableHeadings()[0]).toHaveText(
      chedRefusalDoc._id
    )

    await expect(SearchResultsPage.getChedTableRowIndex(1)[0]).toHaveText(
      chedRefusalDoc.commodities[0].commodityId
    )
    await expect(SearchResultsPage.getChedTableRowIndex(1)[1]).toHaveText(
      chedRefusalDoc.commodities[0].commodityDescription
    )
    await expect(SearchResultsPage.getChedTableRowIndex(1)[2]).toHaveText(
      chedRefusalDoc.commodities[0].additionalData.netWeight
    )
  })
})
