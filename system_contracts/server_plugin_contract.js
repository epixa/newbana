'use strict';

/*
core:server plugin contract
*/

export default class ServerPluginContract {
  logger() {
    // new logger instance for each contract
    return {
      log() {},
      warn() {},
    }
  }

  es() {
    return {
      addClient() {},
      addProxy() {},
    }
  }

  config() {
    return {
      extend() {},
      get() {}
    }
  }

  rest() {
    return {
      addEndpoint() {},
    }
  }

  http() {
    return {
      addMiddleware() {},
    }
  }

  plugin() {
    return {
      getPluginExports() {},
    }
  }

  process() {
    return {
      addBackgroundProgress() {},
    }
  }
}
