import { Page } from 'page-objects/page'

class SearchResultsPage extends Page {
  // getters
  get heading() {
    return $('h1')
  }

  get mrn() {
    return $('#main-content > div > div > dl > div:nth-child(1) > dd')
  }

  get status() {
    return $('#main-content > div > div > dl > div:nth-child(2) > dd')
  }

  get tableItemNumber(){
    return $('#main-content > div > div > table > tbody > tr > th')
  }

  get commodityCode(){
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(2)')
  }

  get description(){
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(3)')
  }

  get quantity(){
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(4)')
  }

  get chedReference(){
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(5)')
  }

  get matchStatus(){
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(6)')
  }

  get decision(){
    return $('#main-content > div > div > table > tbody > tr > td:nth-child(7)')
  }
}

export default new SearchResultsPage()
