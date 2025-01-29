import { Page } from 'page-objects/page'

class SearchResultsPage extends Page {
  // getters
  get heading() {
    return $('h1')
  }
}

export default new SearchResultsPage()
