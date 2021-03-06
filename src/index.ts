import * as Koa from 'koa';
import * as koaBodyparser from 'koa-bodyparser';
import * as kcors from 'kcors';
import { rootRouter } from './routers';
import { processTimeLogger } from './middlewares/process-time-logger';
import { devLogger } from './lib/logger/dev-logger';

const app = new Koa();

/**
 * Update header for Cross-Origin Resource Sharing
 */
app.use(kcors());
app.use(koaBodyparser());


/**
 * Log process time when development
 */
app.use(processTimeLogger);

/**
 * This app is supposed to be run on `.api` subdomain. (api.my-tokyu-bus.tokyo)
 * So prefix `/api` is not necessary.
 */
app.use(rootRouter.routes());


app.listen(3000, () => devLogger.info('server has started', process.env));
