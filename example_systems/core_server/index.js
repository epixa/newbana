'use strict';

import ServerCore from './server_core';
import Config from './config';
import Environment from './environment';

export default function coreServerFactory(process) {
  const env = new Environment(process);
  const config = new Config(env);

  const server = new ServerCore(env, config);

  process.on('SIGTERM', () => shutdown(process, server));
  process.on('SIGINT', () => shutdown(process, server));

  return server;
}

export async function shutdown(process, server) {
  try {
    await server.stop();
  } catch (error) {
    process.stderr.write(`Server failed to shutdown cleanly: ${error.stack}`);
  }
}
