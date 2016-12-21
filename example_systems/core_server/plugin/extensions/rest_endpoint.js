'use strict';

/*
In this example, extensions are contracts that are only exposed during
the initialize phase
*/
export default class RestEndpoint {
  constructor(restService) {
    Object.defineProperty(this, 'service', { value: restService });
  }

  get(path, handler) {
    this.service.registerEndpoint('get', path, handler);
  }

  post(path, handler) {
    this.service.registerEndpoint('post', path, handler);
  }

  put(path, handler) {
    this.service.registerEndpoint('put', path, handler);
  }

  delete(path, handler) {
    this.service.registerEndpoint('delete', path, handler);
  }
}
