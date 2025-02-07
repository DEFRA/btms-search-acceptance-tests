import { Page } from 'page-objects/page'

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
    return $('//*[@id="main-content"]/div/div/dl/div[2]/dd')
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
    const headers = []
    const headings = await $$(
      '#main-content > div > div > dl:nth-child(7) div > dd'
    )

    await headings.forEach(async (element) => {
      headers.push(await element.getText())
    })

    return headers
  }

  async getChedTableRowIndex(index) {
    const cellItems = []
    const tableRowCells = await $$(
      '#main-content > div > div > table:nth-child(8) > tbody > tr:nth-child(' +
        index +
        ') td'
    )

    await tableRowCells.forEach(async (tableHeading) => {
      cellItems.push(await tableHeading.getText())
    })

    return cellItems
  }

  // movement actions

  async getTableHeadings() {
    const headers = []
    const headings = await $$('#main-content > div > div > table > thead tr th')

    await headings.forEach(async (element) => {
      headers.push(await element.getText())
    })

    return headers
  }

  async getTableRowIndex(index) {
    const cellItems = []
    const tableRowCells = await $$(
      '#main-content > div > div > table > tbody > tr:nth-child(' +
        index +
        ') td'
    )

    await tableRowCells.forEach(async (tableHeading) => {
      cellItems.push(await tableHeading.getText())
    })

    return cellItems
  }

  async getHeadingRowMap(rowIndex) {
    const headingRowMap = new Map()(await this.getTableHeadings()).forEach(
      async (headerItem) => {
        (await this.getTableRowIndex(rowIndex)).forEach(async (rowItem) => {
          headingRowMap.set(await headerItem, await rowItem)
        })
      }
    )

    return headingRowMap
  }
}

export default new SearchResultsPage()
