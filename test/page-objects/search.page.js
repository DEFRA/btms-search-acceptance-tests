import { Page } from "./page.js";
import { browser, $ } from "@wdio/globals";
import { analyse } from "../../dist/wcagchecker.cjs";

class SearchPage extends Page {
  // getters
  get searchTextBox() {
    return $("#search-term");
  }

  get searchButton() {
    return $("#btn-search");
  }

  get searchError() {
    return $("#search-term-error");
  }

  // page object methods
  async searchFor(input) {
    await analyse(browser, "");
    await this.searchTextBox.waitForExist({ timeout: 3000 });
    await this.searchButton.waitForClickable({ timeout: 3000 });
    await this.searchTextBox.setValue(input);
    await this.searchButton.click();
  }

  async searchClearedSearchField() {
    await analyse(browser, "");
    await this.searchTextBox.waitForExist({ timeout: 3000 });
    await this.searchButton.waitForClickable({ timeout: 3000 });
    await this.searchTextBox.clearValue();
    await this.searchButton.click();
  }

  async getSearchErrorMessage() {
    await this.searchError.waitForDisplayed({ timeout: 3000 });
    return Object.values(await this.searchError.getText()).join("");
  }

  open() {
    return super.open("/search");
  }
}

export default new SearchPage();
