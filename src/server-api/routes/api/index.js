import Router from 'koa-router';
import devices from './devices';
const router = new Router();

router.use('/devices', devices.routes(), devices.allowedMethods())

router.get('/', function(ctx, next) {
  ctx.body = '/api not implemented yet'
});

export default router;
