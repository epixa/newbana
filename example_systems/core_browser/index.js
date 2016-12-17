'use strict';

import BrowserCore from './browser_core';
import Config from './config';
import Environment from './environment';

export default function coreBrowserFactory(window) {
  const env = new Environment(window);
  const config = new Config(env);

  return new BrowserCore(env, config);
}
