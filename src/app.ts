import * as dotenv from 'dotenv'
dotenv.config()
import * as path from 'path';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import FastifyWebsocket from 'fastify-websocket'
import PointOfView from 'point-of-view'
import './socket/create-server'

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  void fastify.register(FastifyWebsocket)

  void fastify.register(PointOfView, {
    engine: {
      ejs: require('ejs'),
    },
    root: path.join(__dirname, 'views', 'html'),
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app }
