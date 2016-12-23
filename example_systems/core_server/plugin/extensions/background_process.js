'use strict';

/*
In this example, extensions are contracts that are only exposed during
the initialize phase
*/
export default class BackgroundProcess {
  constructor(processService) {
    Object.defineProperty(this, 'service', { value: processService });
  }

  addProcessInitializer(name, fn) {
    this.service.addProcessInitializer(name, fn);
  }

  removeProcessInitializer(name) {
    this.service.removeProcessInitializer(name);
  }
}
