'use strict';

/*
core:browser app contract
*/

export default class BrowserAppContract {
  logger() {
    // new logger instance for each contract
    return {
      log() {},
      warn() {},
    }
  }

  config() {
    return {
      extend() {},
      get() {}
    }
  }

  plugin() {
    return {
      getPluginExports() {},
    }
  }
}
