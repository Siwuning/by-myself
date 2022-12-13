/**
 * 查询游戏的中国区Steam价格。
 * @author: 彭宇明
 * 更新地址：https://raw.githubusercontent.com/Siwuning/by-myself/89bada236e4679a919b2a3d130fe355ccabe4ff1/auser.js
 * 配置方法：
 * 1.浏览器打开steam网站：https://store.steampowered.com/，搜索你想添加的游戏。
 * 2. 以GTA5为例，GTA5的STEAM商店链接为：https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/。
 * 3. id中填写271590即可，name中填写名字。
 *
 * 📌 注意 https://steamdb.info 需要直连访问，将下面的配置添加到分流规则中：
 * 1.QX
 * 主机，steamdb.info，直接
 * 2. Loon 和 Surge
 * 域，steamdb.info，DIRECT
 */
让游戏= [
    {
        编号：1938090，
        名称：“使命召唤®：现代战争®II 2022”，
    },
    {
        编号：1372110，
        name: "JOJO的奇妙冒险 群星之战 重制版",
    },
    {
        编号：294100，
        name: "RimWorld",
    },
];

const $ = API("蒸汽");
如果（$.read（'游戏'）！==未定义）{
    games = JSON.parse($.read('games'));
}

Promise.all(games.map(async (item) => check(item))).then(() => $.done());

异步函数检查（项目）{
    const { id, name } = 项目；
    $.log(`正在检查：${item.id}...`);

    await $.http.get({ url: `https://api.xiaoheihe.cn/game/get_game_detail/?&steam_appid=${id}` }).delay(1000).then(
        （响应）=> {
            const obj = JSON.parse(response.body);
            如果（obj.status == 'ok'）{
                让 name_en = obj.result.name_en;
                让价格= obj.result.price;
                让 publisher = obj.result.publishers[0].value;
                让 rating = obj.result.positive_desc;
                让 inGame = obj.result.user_num.game_data[0].value;
                让 desc = obj.result.about_the_game；

                $.log(JSON.stringify(response.body));

                $.通知(
                    `🎮 [Steam 日报] ${name}`,
                    `${name_en}`,
                    `💰 [价格]：\n📉 历史最低：${prices.lowest_price}元\n📌 当前价格：${prices.current}元\n💡 [基础信息]：\n🎩 发行商：${publisher} \n❤️ ${rating}\n🤖 在线人数：${inGame}\n📝 简介：${desc}...`,
                    {
                        '媒体网址'：obj.result.image，
                        '打开网址'：`https://store.steampowered.com/app/${id}`
                    }
                );
            } 别的 {
                $.log(JSON.stringify(response.body));

                $.通知(
                    `🎮 [Steam 日报] ${name}`,
                    '取得失败',
                    JSON.stringify(响应.body)
                );
            }
            
        }
    );
}


// 更漂亮的忽略
/************************************ API ************* ***************************/
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,i="function"==typeof require&& "undefined"!=typeof $jsbox;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!i,isJSBox:i,isRequest:"undefined"!=typeof $request, isScriptable:"undefined"!=typeof importModule}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:i,isScriptable:n,isNode:o}=ENV() ,r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9 ()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const u={};返回["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(l=>u[l.toLowerCase()]=(u=>(函数（你，l){l="string"==typeof l?{url:l}:l;const h=e.baseURL;h&&!r.test(l.url||"")&&(l.url=h? h+l.url:l.url);const a=(l={...e,...l}).timeout,c={onRequest:()=>{},onResponse:e=>e ,onTimeout:()=>{},...l.events};让 f,d;if(c.onRequest(u,l),t)f=$task.fetch({method:u,.. .l});else if(s||i||o)f=new Promise((e,t)=>{(o?require("request"):$httpClient)[u.toLowerCase()]( l,(s,i,n)=>{s?t(s):e({statusCode:i.status||i.statusCode,headers:i.headers,body:n})})});else if(n){const e=new Request(l.url);e.method=u,e.headers=l.headers,e.body=l.body,f=new Promise((t,s)=> {e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e)) })}const p=a?new Promise((e,t)=>{d=setTimeout(()=>(c.onTimeout(),t(`${u} URL: ${l.url} 超过超时 ${a} ms`)),a)}):null;return(p?Promise.race([p,f]).then(e=>(clearTimeout(d),e)):f).then(e=>c.onResponse(e))})(l, u))),u}function API(e="untitled",t=!1){const{isQX:s,isLoon:i,isSurge:n,isNode:o,isJSBox:r,isScriptable:u}=ENV ();返回新类{constructor(e,t){this.name=e,this.debug=t,this.http=HTTP(),this.env=ENV(),this.node=(()= >{if(o){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(函数( t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if (s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(i||n)&&(this.cache=JSON.parse($persistentStore.read( this.name)||"{}")),o){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify （{}），{旗帜：”wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache= JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx" },e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e, this.name),(i||n)&&$persistentStore.write(e,this.name),o&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag: "w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"} ,e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){如果(t=t.substr(1),n||i)返回 $persistentStore.write(e,t);if(s)返回 $prefs.setValueForKey(e,t);o&&(this.root[t] =e)}否则这个。cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[ e]:(e=e.substr(1),n||i?$persistentStore.read(e):s?$prefs.valueForKey(e):o?this.root[e]:void 0)}删除(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),n||i)返回 $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);o&&delete this.root[e]}else delete this.cache[e];this.persistCache()}notify(e ,t="",l="",h={}){const a=h["open-url"],c=h["media-url"];if(s&&$notify(e,t, l,h),n&&$notification.post(e,t,l+`${c?"\n多媒体:"+c:""}`,{url:a}),i){let s={} ;a&&(s.openUrl=a),c&&(s.mediaUrl=c),"{}"===JSON.stringify(s)?$notification.post(e,t,l):$notification.post( e,t,l,s)}if(o||u){const s=l+(a?`\n点击跳转: ${a}`:"")+(c?`\n多媒体: ${c}`:"");if(r){require("push").schedule({title:e,body:(t?t+"\n ":"")+s})}else console.log(`${e}\n${t}\n${s}\n\n`)}}log(e){this.debug&&console.log (`[${this.name}] 日志：${this.stringify(e)}`)}info(e){console.log(`[${this.name}] 信息：${this.stringify( e)}`)}error(e){console.log(`[${this.name}] 错误：${this.stringify(e)}`)}wait(e){return new Promise(t=> setTimeout(t,e))}done(e={}){s||i||n?$done(e):o&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers ,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify( e,null,2)}catch(e){return[object Object]"}}}(e,t)}push").schedule({title:e,body:(t?t+"\n":"")+s})}else console.log(`${e}\n${t}\n${ s}\n\n`)}}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console .log(`[${this.name}] 信息：${this.stringify(e)}`)}error(e){console.log(`[${this.name}] 错误：${this. stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){s||i||n?$done(e): o&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("字符串" ==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){return"[object Object]"}}}(e,t)}push").schedule({title:e,body:(t?t+"\n":"")+s})}else console.log(`${e}\n${t}\n${ s}\n\n`)}}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console .log(`[${this.name}] 信息：${this.stringify(e)}`)}error(e){console.log(`[${this.name}] 错误：${this. stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){s||i||n?$done(e): o&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("字符串" ==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){return"[object Object]"}}}(e,t)}console.log(`[${this.name}] 日志：${this.stringify(e)}`)}info(e){console.log(`[${this.name}] 信息：${this .stringify(e)}`)}error(e){console.log(`[${this.name}] 错误：${this.stringify(e)}`)}wait(e){return new Promise( t=>setTimeout(t,e))}done(e={}){s||i||n?$done(e):o&&!r&&"undefined"!=typeof $context&&($context.headers= e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("string"==typeof e||e instanceof String)return e;try{返回 JSON .stringify(e,null,2)}catch(e){return[object Object]"}}}(e,t)}console.log(`[${this.name}] 日志：${this.stringify(e)}`)}info(e){console.log(`[${this.name}] 信息：${this .stringify(e)}`)}error(e){console.log(`[${this.name}] 错误：${this.stringify(e)}`)}wait(e){return new Promise( t=>setTimeout(t,e))}done(e={}){s||i||n?$done(e):o&&!r&&"undefined"!=typeof $context&&($context.headers= e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("string"==typeof e||e instanceof String)return e;try{返回 JSON .stringify(e,null,2)}catch(e){return[object Object]"}}}(e,t)}r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("字符串"== typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){return"[object Object]"}}}(e,t)}r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("字符串"== typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){return"[object Object]"}}}(e,t)}
/**************************************************** *******************************/


