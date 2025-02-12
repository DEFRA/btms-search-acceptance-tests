import { browser } from '@wdio/globals'

describe('Search page', () => {
  it('Should be on the search page', async () => {
    await browser.url('/search');
  })
})
