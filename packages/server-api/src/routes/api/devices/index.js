import Router from 'koa-router';
import mysql from 'mysql2/promise'
const router = new Router();


// TODO: await for connection to be made
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'knitautomation'
});

router.post('/', async(ctx, next) => {

})

router.get('/', async(ctx, next) => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM devices')
  connection.release();
  ctx.response.type = 'application/json';
  ctx.body = JSON.stringify(rows);
});

router.get('/:id', (ctx, next) => {
  const id = ctx.originalUrl.split('/')[ctx.originalUrl.split('/').length - 1]
  ctx.body = JSON.stringify({error: '/api/devices/:id not implemented yet'});
});


// curl --data '{"value": {"temperature": "73"}, "recorded_at": "2017-09-10T02:14:20.571Z"}' -H "Content-Type: application/json" --request PATCH localhost:3000/api/devices/1234
router.patch('/:id', async (ctx, next) => {
  // What the fuck is this bullshit?
  const id = ctx.originalUrl.split('/')[ctx.originalUrl.split('/').length - 1]
  const body = ctx.request.body;
  console.log('patching:', id, ctx.request.body)

  const update = {
    device_id: id,
    value: JSON.stringify(body.value),
    recorded_at: new Date(body.recorded_at)
  }

  const device = {
    value: JSON.stringify(body.value),
    last_updated: new Date(body.recorded_at)
  }

  const connection = await pool.getConnection();
  await connection.query('INSERT INTO updates SET ?', update)
  await connection.query('UPDATE devices SET ? WHERE id = ?', [device, id])
  connection.release();

  ctx.body = 'ok';
})


export default router;
