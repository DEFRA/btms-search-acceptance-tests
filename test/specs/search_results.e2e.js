// import SearchPage from '../page-objects/search.page'
// import SearchResultsPage from '../page-objects/search_results.page'
// import { decisionToText } from "~/utils/data_mapper.js"
//
// import noMatch from '../../data/movement/nomatch.json'
// import refusalDoc from '../../data/movement/refusal.json'
// import chedRefusalDoc from '../../data/import_notifications/refusal.json'
// import matchedChedDoc from '../../data/import_notifications/matched_ched_ref.json'
// import holdDocument from '../../data/movement/hold.json'
// import matchDocument from '../../data/movement/match.json'
// import { expect } from "@wdio/globals"
//
// describe('Search Results page', () => {
//
//   it('Should display the correct search results details for a "no match" clearance request', async () => {
//     await SearchPage.open()
//     await SearchPage.searchFor(noMatch._id)
//
//     await expect(SearchResultsPage.heading).toBeDisplayed()
//     await expect(SearchResultsPage.heading).toHaveText(noMatch._id)
//     await expect(await SearchResultsPage.status).toHaveText(
//       await decisionToText(
//         noMatch.alvsDecisionStatus.context.decisionComparison.decisionMatched
//       )
//     )
//
//     const rowItems = await SearchResultsPage.getTableRowIndex(1)
//     const rowItemsTwo = await SearchResultsPage.getTableRowIndex(2)
//
//     await expect(rowItems[0]).toEqual(noMatch.clearanceRequests[0].items[0].itemNumber.toString())
//     await expect(rowItems[1]).toEqual(noMatch.clearanceRequests[0].items[0].taricCommodityCode.toString())
//     await expect(rowItems[2]).toEqual(
//       noMatch.clearanceRequests[0].items[0].goodsDescription
//     )
//     await expect(rowItems[3]).toEqual(
//       noMatch.clearanceRequests[0].items[0].itemNetMass
//     )
//     await expect(rowItems[4]).toEqual(
//       noMatch.clearanceRequests[0].items[0].documents[0].documentReference
//     )
//
//     await expect(rowItemsTwo[0]).toEqual(
//       noMatch.clearanceRequests[0].items[1].itemNumber.toString()
//     )
//     await expect(rowItemsTwo[1]).toEqual(
//       noMatch.clearanceRequests[0].items[1].taricCommodityCode
//     )
//     await expect(rowItemsTwo[2]).toEqual(
//       noMatch.clearanceRequests[0].items[1].goodsDescription
//     )
//     await expect(rowItemsTwo[3]).toEqual(
//       noMatch.clearanceRequests[0].items[1].itemNetMass
//     )
//     await expect(rowItemsTwo[4]).toEqual(
//       noMatch.clearanceRequests[0].items[1].documents[0].documentReference
//     )
//   })
//
//   it('Should display the correct search results details for a "hold" clearance request', async () => {
//     await SearchPage.open()
//     await SearchPage.searchFor(holdDocument._id)
//
//     await expect(SearchResultsPage.heading).toBeDisplayed()
//     await expect(SearchResultsPage.heading).toHaveText(holdDocument._id)
//
//     const rowItems = await SearchResultsPage.getTableRowIndex(1)
//
//     await expect(rowItems[0]).toEqual(
//       holdDocument.clearanceRequests[0].items[0].itemNumber.toString()
//     )
//     await expect(rowItems[1]).toEqual(
//       holdDocument.clearanceRequests[0].items[0].taricCommodityCode
//     )
//     await expect(rowItems[2]).toEqual(
//       holdDocument.clearanceRequests[0].items[0].goodsDescription
//     )
//     await expect(rowItems[3]).toEqual(
//       holdDocument.clearanceRequests[0].items[0].itemNetMass
//     )
//     await expect(rowItems[4]).toEqual(
//       holdDocument.clearanceRequests[0].items[0].documents[0]
//         .documentReference
//     )
//
//     // no import notification to verify details
//   })
//
//   it('Should display the correct search results details for a "refusal" clearance request', async () => {
//     await SearchPage.open()
//     await SearchPage.searchFor(refusalDoc._id)
//
//     await expect(SearchResultsPage.heading).toBeDisplayed()
//     await expect(SearchResultsPage.heading).toHaveText(refusalDoc._id)
//
//     const mrnRowItems = await SearchResultsPage.getTableRowIndex(1)
//
//     await expect(mrnRowItems[0]).toEqual(
//       refusalDoc.clearanceRequests[0].items[0].itemNumber.toString()
//     )
//     await expect(mrnRowItems[1]).toEqual(
//       refusalDoc.clearanceRequests[0].items[0].taricCommodityCode
//     )
//     await expect(mrnRowItems[2]).toEqual(
//       refusalDoc.clearanceRequests[0].items[0].goodsDescription
//     )
//     await expect(mrnRowItems[3]).toEqual(
//       refusalDoc.clearanceRequests[0].items[0].itemNetMass
//     )
//     await expect(mrnRowItems[4]).toEqual(
//       refusalDoc.clearanceRequests[0].items[0].documents[0].documentReference
//     )
//
//     // ched details
//     const chedHeadingRowItems = await SearchResultsPage.getChedTableHeadings()
//     const chedRowItems = await SearchResultsPage.getChedTableRowIndex(1)
//
//     await expect(chedHeadingRowItems[0]).toEqual(
//       chedRefusalDoc._id
//     )
//
//     await expect(chedRowItems[1]).toEqual(
//       chedRefusalDoc.commodities[0].commodityId
//     )
//
//     await expect(chedRowItems[2]).toEqual(
//       chedRefusalDoc.commodities[0].commodityDescription
//     )
//
//     await expect(chedRowItems[3]).toEqual(
//       chedRefusalDoc.commodities[0].additionalData.netWeight.toString()
//     )
//   })
//
//   it('Should verify the correct details for a "match" movement document', async () => {
//     await SearchPage.open()
//     await SearchPage.searchFor(matchDocument._id)
//
//     await expect(SearchResultsPage.heading).toBeDisplayed()
//     await expect(SearchResultsPage.heading).toHaveText(matchDocument._id)
//
//     const mrnMatchRowItems = await SearchResultsPage.getTableRowIndex(1)
//
//     await expect(mrnMatchRowItems[0]).toEqual(
//       matchDocument.clearanceRequests[0].items[0].itemNumber.toString()
//     )
//     await expect(mrnMatchRowItems[1]).toEqual(
//       matchDocument.clearanceRequests[0].items[0].taricCommodityCode
//     )
//     await expect(mrnMatchRowItems[2]).toEqual(
//       matchDocument.clearanceRequests[0].items[0].goodsDescription
//     )
//     await expect(mrnMatchRowItems[3]).toEqual(
//       matchDocument.clearanceRequests[0].items[0].itemNetMass
//     )
//     await expect(mrnMatchRowItems[4]).toEqual(
//       matchDocument.clearanceRequests[0].items[0].documents[0].documentReference
//     )
//   })
//
//   it('Should allow the user to perform a search based on a CHED reference', async () => {
//
//     await SearchPage.open()
//     await SearchPage.searchFor(matchedChedDoc._id)
//
//     await expect(SearchResultsPage.heading).toBeDisplayed()
//     await expect(SearchResultsPage.heading).toHaveText(matchedChedDoc._id)
//
//     const chedHeadingRowItems = await SearchResultsPage.getChedTableHeadings()
//     const chedRowItems = await SearchResultsPage.getChedTableRowIndex(1)
//
//     await expect(chedHeadingRowItems[0]).toEqual(
//       matchedChedDoc._id
//     )
//
//     await expect(chedRowItems[1]).toEqual(
//       matchedChedDoc.commodities[0].commodityId
//     )
//
//     await expect(chedRowItems[2]).toEqual(
//       matchedChedDoc.commodities[0].commodityDescription
//     )
//
//     await expect(chedRowItems[3]).toEqual(
//       matchedChedDoc.commodities[0].additionalData.netWeight.toString()
//     )
//   })
//
//   // // TODO: functionality is not complete yet.
//   // it('Should enable a partial CHED reference search', async () => {
//   //
//   // })
// })
