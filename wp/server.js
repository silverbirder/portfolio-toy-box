const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const koaBody = require('koa-body');
const webPush = require('web-push');

const app = new Koa();
const router = new Router();

webPush.setVapidDetails(
    'mailto:hoge@fuga.piyo', // 第一引数は'mailto:～'というフォーマットでないとだめらしい
    "BAWrcjWdlscQOdRFf0qV3OG4_CXU0xk_qKDPVZG3pMLkRfiNBhPsGRq1jZDpwI_ualZs9cTzaNHmqicmZ8ZVkO8",
    "Sv8MH3W1jhkwALz3suOSadlhQqov-SiaDTmrerBQGRI"
);

router
    .get('/key', ctx => {
        ctx.body = "BAWrcjWdlscQOdRFf0qV3OG4_CXU0xk_qKDPVZG3pMLkRfiNBhPsGRq1jZDpwI_ualZs9cTzaNHmqicmZ8ZVkO8";
    })
    .post('/webpushtest', koaBody(), async ctx => {
        try {
            setTimeout(async (_) => { // ちょっと遅延させて通知
                await webPush.sendNotification(ctx.request.body, JSON.stringify({
                    title: 'Web Push通知テスト',
                }));
            }, 5000);
        } catch (err) {
            console.log(err);
        }
    });

app
    .use(serve(__dirname + '/public'))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
