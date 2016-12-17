'use strict';

import Environment from './environment';
import ConfigService from './services/config';
import PromiseUtility from './utilities/promise';

function coreBrowserFactory(config, window) {
  const env = new Environment(window);
  const config = new Config(config);

  const system = new CoreBrowser();
}

export default class CoreBrowser {
  constructor({ config, logger, window }) {
    const env = new Environment(window);
    const configService = new ConfigService(config);
    const services = new Services();

    Object.defineProperty(this, 'services', { value: services });
  }

  get services() {
    return this[$services];
  }

  async initialize() {
    await this.services.initialize();
    this.logger.debug('kibana initialized');
  }

  async start() {
    await this.services.start();
    this.logger.debug('kibana started');
  }

  async stop() {
    await this.services.stop();
    this.logger.debug('kibana stopped');
  }
}
