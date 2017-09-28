import Router from 'koa-router';
import root from './routes/root';
const router = new Router();

router.use('/', root.routes(), root.allowedMethods())

export default router;
