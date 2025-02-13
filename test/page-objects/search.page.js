import { Page } from './page.js'

class SearchPage extends Page {
  // getters
  get searchTextBox() {
    return $('#search-term')
  }

  get searchButton() {
    return $('#btn-search')
  }

  // page object methods
  async searchFor(input) {
    await this.searchTextBox.waitForDisplayed({ timeout: 3000 })
    await this.searchTextBox.setValue(input)
    await this.searchButton.click()
  }

  open() {
    return super.open('/search')
  }
}

export default new SearchPage()
