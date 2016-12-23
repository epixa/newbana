'use strict';

/*
In this example, extensions are contracts that are only exposed during
the initialize phase
*/
export default class StaticAssets {
  constructor(assetsService) {
    Object.defineProperty(this, 'service', { value: assetsService });
  }

  addStaticFileDirectory(path) {
    this.service.addStaticFileDirectory(path);
  }
}
