'use strict';

import Logger from '../logger';
import PluginableServices from './services';
import PluginRegistry from './registry';

/*
An example where the plugin module itself owns the definition of the entire
plugin interface.
*/
export default class PluginService {
  constructor({
    assets,
    elasticsearch,
    env,
    processes,
    rest,
    settings
  }) {
    const logger = Logger.getLogger('PluginService');

    const services = new PluginableServices({
      assets,
      elasticsearch,
      processes,
      rest
    });

    const plugins = PluginRegistry.fromEnv(env, services);

    Object.defineProperty(this, 'logger', { value: logger });
    Object.defineProperty(this, 'plugins', { value: plugins });
  }

  async initialize() {
    try {
      await this.plugins.initialize();
      this.logger.debug('plugin service initialized');
    } catch (error) {
      this.status.red(`Some plugins failed to initialize: ${error.message}`);
    }
  }

  async start() {
    await this.plugins.start();
    this.logger.debug('plugin service started');
  }

  async stop() {
    await this.plugins.stop();
    this.logger.debug('plugin service stopped');
  }
}
