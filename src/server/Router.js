import Router from 'koa-router';
import root from './routes/root';
import api from './routes/api';
const router = new Router();

router.use('/', root.routes(), root.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())


export default router;
