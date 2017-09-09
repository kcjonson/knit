import Router from 'koa-router';
import root from './routes/root';
const router = new Router();

router.use('/', root.routes(), root.allowedMethods())

router.get('/foo', function (ctx, next) {
  ctx.body = 'Hello from Foo';
});

export default router;
