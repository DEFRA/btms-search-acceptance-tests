import fs from "node:fs";
import { init, getHtmlReportByCategory } from "./dist/wcagchecker.cjs";

const oneMinute = 60 * 1000;

let baseUrl;

if (process.env.ENVIRONMENT === "local") {
  baseUrl = "http://localhost:8080";
} else if (process.env.ENVIRONMENT === "dev") {
  baseUrl = "https://btms-portal-frontend.dev.cdp-int.defra.cloud";
} else if (process.env.ENVIRONMENT === "test") {
  baseUrl = "https://btms-portal-frontend.test.cdp-int.defra.cloud";
} else if (process.env.ENVIRONMENT === "exttest") {
  baseUrl = "https://btms-portal-frontend.ext-test.cdp-int.defra.cloud";
} else if (process.env.ENVIRONMENT === "perf") {
  baseUrl = "https://btms-portal-frontend.perf-test.cdp-int.defra.cloud";
} else {
  throw new Error("Invalid environment. Please provide en environment for the tests, e.g., \"local|test|exttest|perf\"");
}

export const config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: "local",

  // Browserstack properties
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,

  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.

  // baseUrl: `https://btms-search-acceptance-tests.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`,
  baseUrl,
  // Connection to remote chromedriver
  // hostname: process.env.CHROMEDRIVER_URL || '127.0.0.1',
  // port: process.env.CHROMEDRIVER_PORT || 4444,

  // Tests to run
  specs: ["./test/specs/**/*.js"],
  // Tests to exclude
  exclude: [],
  maxInstances: 1,

  commonCapabilities: {
    "bstack:options": {
      buildName: "browserstack-build-1" // configure as required
    }
  },

  capabilities: [
    {
      browserName: "Chrome", // Set these to whatever combination of browsers you require
      "bstack:options": {
        browserVersion: "latest",
        os: "Windows",
        osVersion: "10"
      }
    }
  ],

  services: [
    [
      "browserstack",
      {
        testObservability: true, // Disable if you do not want to use the browserstack test observer functionality
        testObservabilityOptions: {
          user: process.env.BROWSERSTACK_USER,
          key: process.env.BROWSERSTACK_KEY,
          projectName: "BTMS Search UI Tests",
          buildName: "daily run"
        },
        acceptInsecureCerts: true,
        forceLocal: true,
        browserstackLocal: true,
        proxyHost: "127.0.0.1",
        proxyPort: 3128
      }
    ]
  ],

  execArgv: ["--loader", "esm-module-alias/loader"],

  logLevel: "info",

  // Number of failures before the test suite bails.
  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "mocha",

  reporters: [
    [
      // Spec reporter provides rolling output to the logger so you can see it in-progress
      "spec",
      {
        addConsoleLogs: true,
        realtimeReporting: true,
        color: false
      }
    ],
    [
      // Allure is used to generate the final HTML report
      "allure",
      {
        outputDir: "allure-results"
      }
    ]
  ],

  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: "bdd",
    timeout: oneMinute
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {},
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {object} specs    specs to be run in the worker process
   * @param  {object} args     object that will be merged with the main configuration once worker is initialized
   * @param  {object} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {},
  /**
   * Gets executed just after a worker process has exited.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {number} exitCode 0 - success, 1 - fail
   * @param  {object} specs    specs to be run in the worker process
   * @param  {number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {},
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {string} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {},
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {object}         browser      instance of created browser/device session
   */
  // before: function (capabilities, specs) {},
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {},
  /**
   * Hook that gets executed before the suite starts
   * @param {object} suite suite details
   */
  // beforeSuite: function (suite) {},
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  // beforeTest: function (test, context) {},
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context) {},
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (
  //   test,
  //   context,
  //   { error, result, duration, passed, retries }
  // ) {},
  /**
   * Function to be executed after a test (in Mocha/Jasmine only)
   * @param {object}  test             test object
   * @param {object}  context          scope object the test was executed with
   * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
   * @param {*}       result.result    return object of test function
   * @param {number}  result.duration  duration of test
   * @param {boolean} result.passed    true if test has passed, otherwise false
   * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
   */

  beforeSuite: async function() {
    await init();
  },

  afterTest: async function(
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (error) {
      await browser.takeScreenshot();
    }
  },

  async after() {
    fs.writeFileSync("/Users/adebolaoke/defra/btms-search-acceptance-tests/accessibility-reports/res.html", getHtmlReportByCategory(), (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });
  },

  /**
   * Hook that gets executed after the suite has ended
   * @param {object} suite suite details
   */
  // afterSuite: function (suite) {},
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {number} result 0 - command success, 1 - command error
   * @param {object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {},
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {},
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {},
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {object} exitCode 0 - success, 1 - fail
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: function(exitCode, config, capabilities, results) {
    // !Do Not Remove! Required for test status to show correctly in portal.
    if (results?.failed && results.failed > 0) {
      fs.writeFileSync("FAILED", JSON.stringify(results));
    }
  }
  /**
   * Gets executed when a refresh happens.
   * @param {string} oldSessionId session ID of the old session
   * @param {string} newSessionId session ID of the new session
   */
  // onReload: function (oldSessionId, newSessionId) {}
};
