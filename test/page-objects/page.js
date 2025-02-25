import { browser, $ } from '@wdio/globals'

class Page {
  get pageHeading() {
    return $('h1')
  }

  get pageTitle(){
    return $('head > title')
  }

  open(path) {
    return browser.url(path)
  }
}

export { Page }
