import { browser, $ } from '@wdio/globals'
import { analyse } from "../../test/dist/wcagchecker.cjs";

class Page {
  get pageHeading() {
    return $('h1')
  }

  open(path) {
    return browser.url(path)
  }
}

export { Page }
