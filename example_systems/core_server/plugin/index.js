'use strict';

import Logger from '../logger';
import PluginableServices from './services';

class PluginRegistry {
  static fromEnv(env, services) {
    return new PluginRegistry(env.pluginPath, services);
  }

  constructor(pluginPath, services) {
    const logger = Logger.getLogger('PluginRegistry');

    const extensions = new ExtensionRegistry([
      new Extensions.StaticAssets(services.assets),
      new Extensions.ElasticsearchClient(services.elasticsearch),
      new Extensions.BackgroundProcess(services.process),
      new Extensions.RestEndpoint(services.rest)
    ]);

    Object.defineProperty(this, 'pluginPath', { value: pluginPath });
    Object.defineProperty(this, 'extensions', { value: extensions });
    Object.defineProperty(this, 'logger', { value: logger });
    Object.defineProperty(this, 'services', { value: services });
  }

  async initialize() {
    // throw if dependent services aren't initialized?

    // todo: install from this.pluginPath
    try {
      const plugins = await this.loadPlugins();
      try {
        await this.initializePlugins(plugins);
      } catch (error) {
        this.logger.error(`plugin initialization failed: ${error.stack}`);
      }
    } catch (error) {
      this.logger.error(`plugin to load plugin manifests: ${error.stack}`);
      throw error;
    }

    this.logger.debug('plugin registry initialized');
  }
}

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
