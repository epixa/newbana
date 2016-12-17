'use strict';

/*
core:browser plugin contract
*/

export default class BrowserPluginContract {
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

  api() {
    return {
      get() {},
      post() {},
      put() {},
      delete() {},
    }
  }

  app() {
    // ???
    return {
      createApplication() {},
      registerApplication() {},
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

  sidebar() {
    return {
      addLink() {},
    }
  }

  visualization() {
    return {
      addVisType() {},
    }
  }

  route() {
    return {
      addRoute() {},
    }
  }

  share() {
    return {
      createSharingContract() {},
      registerSharingContract() {}
    }
  }
}
