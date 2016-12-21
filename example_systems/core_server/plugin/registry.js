'use strict';

import Extensions from './extensions';

export default class PluginRegistry {
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
