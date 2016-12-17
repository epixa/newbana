'use strict';

export default function browserPlugin(logger, notifier) {
  return function runtime(pluginContract) {
    return pluginContract;
  }
}
