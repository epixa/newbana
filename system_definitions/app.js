'use strict';

export default function app(logger, notifier) {
  return function runtime(appContract) {
    return appContract;
  }
}
