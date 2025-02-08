import { Page } from "page-objects/page";

class SearchResultsPage extends Page {
  // getters movements

  get heading() {
    return $('h1')
  }

  get mrn() {
    return $(
      '#main-content > div > div > dl:nth-child(4) > div:nth-child(1) > dd'
    )
  }

  get status() {
    return $('#main-content > div > div > dl > div:nth-child(2) > dd')
  }

  get tableItemNumber() {
    return $('#main-content > div > div > table > tbody > tr > th')
  }

  get commodityCode() {
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(2)')
  }

  get description() {
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(3)')
  }

  get quantity() {
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(4)')
  }

  get chedReference() {
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(5)')
  }

  get matchStatus() {
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(6)')
  }

  get decision() {
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(7)')
  }

  // getters import notifications

  get chedTableReference() {
    return $(
      '#main-content > div > div > dl:nth-child(7) > div:nth-child(1) > dd'
    )
  }

  get chedStatus() {
    return $(
      '#main-content > div > div > dl:nth-child(7) > div:nth-child(2) > dd'
    )
  }

  // ched actions

  async getChedTableHeadings() {
    return this.commonItemCollector('#main-content > div > div > dl:nth-child(7) div > dd')
  }

  async getChedTableRowIndex(index) {
    return this.commonItemCollector('#main-content > div > div > table:nth-child(8) > tbody > tr:nth-child(' + index + ') td')
  }

  // movement actions

  async getTableHeadings() {
    return this.commonItemCollector('#main-content > div > div > table > thead tr th')
  }

  async getTableRowIndex(index) {
    return this.commonItemCollector('#main-content > div > div > table > tbody > tr:nth-child(' + index + ') td')
  }

  async commonItemCollector(locator) {
    const items = []
    const locators = await $$(
      locator
    )

    for (let i = 0; i < locators.length; i++) {
      items.push(await locators[i].getText())
    }

    return items
  }

  // Possibly implement later as this aims to create a nice data structure to compare the data to.
  // async getHeadingRowMap(rowIndex) {
  //   const headingRowMap = new Map()(await this.getTableHeadings()).forEach(
  //     async (headerItem) => {
  //       (await this.getTableRowIndex(rowIndex)).forEach(async (rowItem) => {
  //         headingRowMap.set(await headerItem, await rowItem)
  //       })
  //     }
  //   )
  //
  //   return headingRowMap
  // }
}

export default new SearchResultsPage()
