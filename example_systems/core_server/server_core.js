'use strict';

import AssetService from './assets';
import ElasticsearchService from './elasticsearch';
import HttpService from './http';
import Logger from './logger';
import PluginService from './plugin';
import ProcessService from './process';
import RestService from './rest';
import Services from './services';
import SettingsService from './settings';

export default class ServerCore {
  constructor(env, config) {
    const logger = Logger.getLogger('ServerCore');

    const http = new HttpService({ env });

    const elasticsearch = new ElasticsearchService({ config, http });

    const settings = new SettingsService({ config, elasticsearch });

    const assets = new AssetService({ env });

    const processes = new ProcessService({ settings });

    const rest = new RestService({ settings });

    const plugins = new PluginService({
      assets,
      elasticsearch,
      env,
      processes,
      rest,
      settings
    });

    const services = new Services({
      assets,
      elasticsearch,
      http,
      plugins,
      processes,
      rest,
      settings,
    });

    Object.defineProperty(this, 'logger', { value: logger });
    Object.defineProperty(this, 'services', { value: services });
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
