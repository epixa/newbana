'use strict';

import BackendService from './backend';
import HttpService from './http';
import Logger from './logger';
import NotifierService from './notifier';
import PluginService from './plugin';
import ProcessService from './process';
import RendererService from './renderer';
import Services from './services';
import SettingsService from './settings';

export default class BrowserCore {
  constructor(env, config) {
    const logger = Logger.getLogger('BrowserCore');

    const http = new HttpService({ env });

    const backend = new BackendService({ config, http });

    const settings = new SettingsService({ backend, config });

    const notifier = new NotifierService({ settings });

    const plugins = new PluginService({ env, settings });

    const processes = new ProcessService({ settings });

    const renderer = new RendererService({
      notifier,
      plugins,
      settings,
    });

    const services = new Services({
      backend,
      http,
      notifier,
      plugins,
      processes,
      renderer,
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
