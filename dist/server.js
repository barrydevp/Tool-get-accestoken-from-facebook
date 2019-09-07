!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}({"./app.js":function(e,r,t){"use strict";t.r(r),function(e){var r,n=t("express"),o=t.n(n),a=t("./service.js"),c=t("./config.js"),s=t("./utils/queue.js"),u=t("./utils/logger.js"),i=new o.a,l=process.env.WEB_PORT||"8888",p=process.env.APP_HOST||"0.0.0.0",f=new s.a;i.get("/",function(r,t,n){t.sendFile(e+"/index.html")}),i.get("/startGetToken",function(e,t,n){var o=Number(c.a.DEFAULT_MILISECONS);console.log(o);try{clearInterval(r),r=f.createCycleJob("get token",a.a.startGetToken,o),u.a.log("info","Start tool Success"),t.send("Start Success")}catch(e){u.a.log("error","Start tool Fail\nError: "+e.message),t.send("Start Fail\nError: "+e.message)}}),i.get("/startGetToken/:milisecons",function(e,t,n){var o=Number(e.params.milisecons)||Number(c.a.DEFAULT_MILISECONS);console.log(o);try{clearInterval(r),r=f.createCycleJob("get token",a.a.startGetToken,o),u.a.log("info","Start tool Success"),t.send("Start Success")}catch(e){u.a.log("error","Start tool Fail\nError: "+e.message),t.send("Start Fail\nError: "+e.message)}}),i.get("/stopGetToken",function(e,t,n){try{clearInterval(r),u.a.log("info","Stop tool Success"),t.send("Stop Success")}catch(e){u.a.log("error","Stop tool Fail\nError: "+e.message),t.send("Stop Fail\nError: "+e.message)}}),i.listen(l,p,function(){console.log("Facebook-get-token is running on port "+l)})}.call(this,"")},"./config.js":function(e,r,t){"use strict";var n=t("@babel/runtime/helpers/defineProperty"),o=t.n(n),a=t("path"),c=t.n(a),s=t("dotenv");function u(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}t.n(s).a.config({path:c.a.resolve(process.cwd(),".env.production")});var i=function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?u(t,!0).forEach(function(r){o()(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(t).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}({},process.env);r.a=i},"./service.js":function(e,r,t){"use strict";var n=t("@babel/runtime/regenerator"),o=t.n(n),a=t("@babel/runtime/helpers/defineProperty"),c=t.n(a),s=t("@babel/runtime/helpers/toConsumableArray"),u=t.n(s),i=t("@babel/runtime/helpers/asyncToGenerator"),l=t.n(i),p=t("@babel/runtime/helpers/classCallCheck"),f=t.n(p),g=t("@babel/runtime/helpers/createClass"),b=t.n(g),d=t("puppeteer"),w=t.n(d),h=t("./config.js"),m=function(){function e(){f()(this,e)}var r,t,n,a,c,s,u,i;return b()(e,null,[{key:"newBrowser",value:(i=l()(o.a.mark(function e(){var r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.launch({headless:"true"===h.a.TURN_HEADLESS});case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},e)})),function(){return i.apply(this,arguments)})},{key:"newEmptyPage",value:(u=l()(o.a.mark(function r(t){var n;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=4;break}return r.next=3,e.newBrowser();case 3:t=r.sent;case 4:return r.next=6,t.newPage();case 6:return n=r.sent,r.abrupt("return",n);case 8:case"end":return r.stop()}},r)})),function(e){return u.apply(this,arguments)})},{key:"newPage",value:(s=l()(o.a.mark(function r(t,n,a){var c;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!t){r.next=12;break}if(a){r.next=5;break}return r.next=4,e.newBrowser();case 4:a=r.sent;case 5:return r.next=7,a.newPage();case 7:return c=r.sent,r.next=10,c.goto(t);case 10:return n&&n(),r.abrupt("return",c);case 12:return r.next=14,this.newEmptyPage(a);case 14:return r.abrupt("return",r.sent);case 15:case"end":return r.stop()}},r,this)})),function(e,r,t){return s.apply(this,arguments)})},{key:"getTokenOnceFull",value:(c=l()(o.a.mark(function r(t,n){return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",new Promise(function(){var r=l()(o.a.mark(function r(a,c){var s,u,i,p,f;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=4;break}return r.next=3,e.newEmptyPage();case 3:t=r.sent;case 4:if(s=t.browser(),!n){r.next=35;break}if(t.isClosed()){r.next=33;break}return r.next=9,t.goto("http://localhost:8888/");case 9:return r.next=11,e.createPromiseEventOnce(t);case 11:return(u=r.sent).on("close",l()(o.a.mark(function e(){var r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Hello"),e.next=3,t.evaluate(function(){return window.responseLogin.authResponse.accessToken});case 3:return r=e.sent,e.next=6,t.close().catch(function(e){return console.error(e)});case 6:return e.next=8,s.close().catch(function(e){return console.error(e)});case 8:a(r);case 9:case"end":return e.stop()}},e)}))),r.next=15,e.waitForSelector(u,h.a.EMAIL_INPUT_SELECTOR,[s,t,u]);case 15:return i=r.sent,r.next=18,i.type(n.email||"test");case 18:return r.next=20,e.waitForSelector(u,h.a.PASSWORD_INPUT_SELECTOR,[s,t,u]);case 20:return p=r.sent,r.next=23,p.type(n.password||"test");case 23:return r.next=25,e.waitForSelector(u,h.a.LOGIN_BUTTON_SELECTOR,[s,t,u]);case 25:return f=r.sent,r.next=28,f.click();case 28:return r.next=30,u.waitForSelector(h.a.ACCEPT_BUTTON_SELECTOR).catch(function(e){return console.error(e)});case 30:return r.sent,r.next=33,u.close().catch(function(e){return console.error(e)});case 33:r.next=38;break;case 35:return r.next=37,closeMutilBrowserAndPage([s,t]);case 37:throw new Error("inforAccount not exists!");case 38:case"end":return r.stop()}},r)}));return function(e,t){return r.apply(this,arguments)}}()));case 1:case"end":return r.stop()}},r)})),function(e,r){return c.apply(this,arguments)})},{key:"createPageToken",value:(a=l()(o.a.mark(function r(t,n){return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",new Promise(function(){var r=l()(o.a.mark(function r(a,c){var s,u,i,p,f;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=2;break}return r.abrupt("return");case 2:if(!n.email||!n.password){r.next=31;break}return r.next=5,t.newPage();case 5:if((s=r.sent).isClosed()){r.next=29;break}return r.next=9,s.goto(h.a.URL_LOGIN_FACEBOOK);case 9:return r.next=11,e.getPopupPage(s);case 11:return(u=r.sent).on("close",l()(o.a.mark(function e(){var r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.evaluate(function(){return window.responseLogin.authResponse.accessToken}).catch(function(e){return console.log('Error in newPage.on("close") event')});case 2:return r=e.sent,e.next=5,s.close().catch(function(e){return console.log("Error to close page")});case 5:r?a({saId:n.saId,saToken:r,saTokenExpired:0}):(console.log("Something wrong when get token from main Page, please try get token again"),a({saId:n.saId,saTokenExpired:1}));case 6:case"end":return e.stop()}},e)}))),r.next=15,e.waitForSelector(u,h.a.EMAIL_INPUT_SELECTOR,[s,u]);case 15:return i=r.sent,r.next=18,i.type(n.email);case 18:return r.next=20,e.waitForSelector(u,h.a.PASSWORD_INPUT_SELECTOR,[s,u]);case 20:return p=r.sent,r.next=23,p.type(n.password);case 23:return r.next=25,e.waitForSelector(u,h.a.LOGIN_BUTTON_SELECTOR,[s,u]);case 25:return f=r.sent,r.next=28,f.click();case 28:e.handleAfterLogin(s,u).catch(function(e){console.log(e.message),a({saId:n.saId,saTokenExpired:3,saTokenExpiredDescription:e.message})});case 29:r.next=34;break;case 31:return r.next=33,closeMutilBrowserAndPage([page]);case 33:return r.abrupt("return");case 34:case"end":return r.stop()}},r)}));return function(e,t){return r.apply(this,arguments)}}()));case 1:case"end":return r.stop()}},r)})),function(e,r){return a.apply(this,arguments)})},{key:"createBrowserToken",value:(n=l()(o.a.mark(function r(t){var n,a;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!(t.length>Number(h.a.MAX_PAGE))){r.next=3;break}return r.abrupt("return");case 3:return r.next=5,e.newBrowser();case 5:return n=r.sent,a=t.map(function(r){return e.createPageToken(n,r)}),r.abrupt("return",Promise.all(a).then(function(){var e=l()(o.a.mark(function e(r){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.close().catch(function(e){return console.log("error to close browser")});case 2:return e.abrupt("return",r);case 3:case"end":return e.stop()}},e)}));return function(r){return e.apply(this,arguments)}}()));case 8:case"end":return r.stop()}},r)})),function(e){return n.apply(this,arguments)})},{key:"getMultiToken",value:function(r){if(!(r.length>Number(h.a.MAX_BROWSER))){var t=r.map(function(r){return e.createBrowserToken(r)});return Promise.all(t)}}},{key:"closeMutilBrowserAndPage",value:function(e){if(e){var r=e.map(function(e){return e.close().catch(function(e){console.log("error to close mutil Browser and Page")})});return Promise.all(r)}}},{key:"handleAfterLogin_old",value:(t=l()(o.a.mark(function r(t,n){var a,c,s,u;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return a=n.waitForSelector(h.a.ERROR_BOX_SELECTOR).catch(function(e){return console.log("Error to get Error Login box")}),c=n.waitForSelector(h.a.ACCEPT_BUTTON_SELECTOR).catch(function(e){return console.log("Error to get buttonAccept")}),s=n.waitForSelector(h.a.CHECK_BUTTON_SELECTOR).catch(function(e){return console.log("Error to get buttonSubmitCheck")}),r.next=5,Promise.all([a,s,c]);case 5:if(!(u=r.sent)[0]){r.next=12;break}return r.next=9,e.closeMutilBrowserAndPage([t,n]).catch(function(e){return console.log("Error to close mutil page and newpage")});case 9:throw new Error("Login Error, wrong infor login!");case 12:if(!u[1]){r.next=18;break}return r.next=15,e.closeMutilBrowserAndPage([t,n]).catch(function(e){return console.log("Error to close mutil page and newpage")});case 15:throw new Error("Login Succes but occur checkpoint!");case 18:if(!u[2]){r.next=21;break}return r.next=21,c.click().catch(function(e){return console.log("Error to click buttonAccept")});case 21:return r.next=23,n.close().catch(function(e){return console.log("Error to close newPage")});case 23:case"end":return r.stop()}},r)})),function(e,r){return t.apply(this,arguments)})},{key:"handleAfterLogin",value:(r=l()(o.a.mark(function r(t,n){var a,c,s;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return a=n.waitForSelector(h.a.ERROR_BOX_SELECTOR).catch(function(e){return console.log("Error to get Error Login box")}).then(function(r){if(r)throw e.closeMutilBrowserAndPage([t,n]).catch(function(e){return console.log("Error to close mutil page and newpage")}),new Error("Login Error, wrong infor login!")}),c=n.waitForSelector(h.a.ACCEPT_BUTTON_SELECTOR).catch(function(e){return console.log("Error to get buttonAccept")}).then(function(){var e=l()(o.a.mark(function e(r){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=3;break}return e.next=3,r.click().catch(function(e){return console.log("Error to click buttonAccept")});case 3:return e.next=5,n.close().catch(function(e){return console.log("Error to close newPage")});case 5:case"end":return e.stop()}},e)}));return function(r){return e.apply(this,arguments)}}()),s=n.waitForSelector(h.a.CHECK_BUTTON_SELECTOR).catch(function(e){return console.log("Error to get buttonSubmitCheck")}).then(function(r){if(r)throw e.closeMutilBrowserAndPage([t,n]).catch(function(e){return console.log("Error to close mutil page and newpage")}),new Error("Login Succes but occur checkpoint!")}),r.abrupt("return",Promise.all([a,s,c]));case 4:case"end":return r.stop()}},r)})),function(e,t){return r.apply(this,arguments)})},{key:"waitForSelector",value:function(r,t,n){return r.waitForSelector(t).catch(function(){var r=l()(o.a.mark(function r(t){return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.closeMutilBrowserAndPage(n);case 2:case"end":return r.stop()}},r)}));return function(e){return r.apply(this,arguments)}}())}},{key:"createPromiseEventOnce",value:function(e,r,t){return new Promise(function(n,o){e&&r?r.once(e,function(e){t&&t(e),n(e)}):o(new Error("event or page are undefined"))})}},{key:"getPopupPage",value:function(e,r){return new Promise(function(t,n){e?e.once("popup",function(e){r&&r(e),t(e)}):n(new Error("page is undefined"))})}}]),e}(),x=t("axios"),y=t.n(x);function v(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}var k=function(e,r){return y.a.get(e,function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?v(t,!0).forEach(function(r){c()(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):v(t).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}({},r)).then(function(e){return Promise.resolve(e)}).catch(function(e){return Promise.reject(e)})},E=t("./utils/logger.js");function O(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function P(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?O(t,!0).forEach(function(r){c()(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(t).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}var S;r.a={startGetToken:(S=l()(o.a.mark(function e(r){var t,n,a,c,s,i;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k(h.a.URL_GET_INFOR+"/get/all");case 2:return t=e.sent,t=(t=Array.from(t.data.result)).filter(function(e){return e.saPassword&&e.saLoginName&&0!=e.saTokenExpired&&3!=e.saTokenExpired}).map(function(e){return{password:e.saPassword,email:e.saLoginName,saId:e.saId}}),n=[],Number(h.a.MAX_PAGE),a=-1,t.forEach(function(e,r){r%5==0?(n.push([e]),a++):n[a].push(e)}),e.t0=Array,e.next=12,m.getMultiToken(n);case 12:if(e.t1=e.sent,c=e.t0.from.call(e.t0,e.t1),0===(s=c.reduce(function(e,r){return e.concat.apply(e,u()(r))},[]).map(function(e){var r={};return 3==e.saTokenExpired?r.saTokenExpiredDescription=e.saTokenExpiredDescription:r.saToken=e.saToken,[e.saId,P({},r,{saTokenExpired:e.saTokenExpired})]})).length){e.next=24;break}return e.next=18,y()({url:h.a.URL_GET_INFOR+"/updateToken",method:"post",data:{newSocialAccounts:s}});case 18:i=e.sent,E.a.log("info","Data input: "+i.status+"\nDate response: "+JSON.stringify(s)),E.a.log("info","AXIOS status response: "+i.status+"\nDate response: "+JSON.stringify(Array.from(i.data.result).map(function(e,r){return{saId:s[r],status:e,mess:e?"succes":"error"}}))),console.log("AXIOS status response: ",i.status),e.next=26;break;case 24:E.a.log("info","All accounts don't need to get token or can't get token!"),console.log("All accounts don't need to get token or can't get token!");case 26:case"end":return e.stop()}},e)})),function(e){return S.apply(this,arguments)})}},"./utils/logger.js":function(e,r,t){"use strict";var n=t("fs"),o=t.n(n),a=t("winston"),c=t.n(a),s=t("./config.js"),u=(t("winston-daily-rotate-file"),process.env.LOG_DIR||"logs"),i=process.env.LOG_LEVEL||"debug";o.a.existsSync(u)||o.a.mkdirSync(u);var l=Object(a.format)(function(e){return!e.private&&("false"===s.a.LOGGING_DATA_OUTPUT&&delete e.dataOutput,e)}),p=c.a.createLogger({levels:{error:0,warn:1,info:2,verbose:3,silly:4,verify:5,sync:6,config:7,configBackup:8,configCopy:9,configUndo:10,configDelete:11,dns:12,login:13,debug:14},transports:[new c.a.transports.Console({format:a.format.combine(a.format.colorize(),l(),a.format.simple()),level:"info"}),new c.a.transports.DailyRotateFile({format:a.format.combine(a.format.timestamp(),l(),a.format.json()),maxFiles:"15d",maxSize:"1mb",level:i,dirname:u,datePattern:"YYYY-MM-DD",filename:"%DATE%-log.json"})]});c.a.addColors({verbose:"white",info:"green",warn:"yellow",error:"red",debug:"white",silly:"white",verify:"brown",sync:"chocolate",config:"gold",configCopy:"gray",configUndo:"greenYellow",configDelete:"indianRed",dns:"lavender",configBackup:"bisque",login:"cadetblue"});r.a=p},"./utils/queue.js":function(e,r,t){"use strict";t.d(r,"a",function(){return p});var n=t("@babel/runtime/helpers/classCallCheck"),o=t.n(n),a=t("@babel/runtime/helpers/createClass"),c=t.n(a),s=t("kue"),u=t.n(s),i=t("./utils/logger.js"),l=t("./config.js"),p=function(){function e(){o()(this,e),this.queue=u.a.createQueue({prefix:"q",redis:{port:l.a.REDIS_PORT,host:l.a.REDIS_HOST,options:{}}})}return c()(e,[{key:"newProcess",value:function(e,r){e&&r&&this.queue.process(e,function(e,t){console.log("process job: ",e.id),i.a.log("info","process job: "+e.id),r&&r().then(function(e){return t()}).catch(function(e){i.a.log("error","Callback in queue fail\nError: "+e.message),t(e)})})}},{key:"newJob",value:function(e,r){if(e){var t=(r||{}).priority,n=this.queue.create(e,{name:e}).priority(t||"normal");return n.on("complete",function(){i.a.log("info","Job "+n.id+" with name "+n.data.name+" is done"),console.log("Job",n.id,"with name ",n.data.name," is done")}).on("failed",function(){i.a.log("info","Job "+n.id+" with name "+n.data.name+" has failed"),console.log("Job ",n.id," with name ",n.data.name," has failed")}),n.save(),n}}},{key:"createCycleJob",value:function(e,r,t,n){if(e&&r){this.newProcess(e,r);var o=this.newJob.bind(this);return setInterval(function(){o(e,n)},t)}}}]),e}()},0:function(e,r,t){e.exports=t("./app.js")},"@babel/runtime/helpers/asyncToGenerator":function(e,r){e.exports=require("@babel/runtime/helpers/asyncToGenerator")},"@babel/runtime/helpers/classCallCheck":function(e,r){e.exports=require("@babel/runtime/helpers/classCallCheck")},"@babel/runtime/helpers/createClass":function(e,r){e.exports=require("@babel/runtime/helpers/createClass")},"@babel/runtime/helpers/defineProperty":function(e,r){e.exports=require("@babel/runtime/helpers/defineProperty")},"@babel/runtime/helpers/toConsumableArray":function(e,r){e.exports=require("@babel/runtime/helpers/toConsumableArray")},"@babel/runtime/regenerator":function(e,r){e.exports=require("@babel/runtime/regenerator")},axios:function(e,r){e.exports=require("axios")},dotenv:function(e,r){e.exports=require("dotenv")},express:function(e,r){e.exports=require("express")},fs:function(e,r){e.exports=require("fs")},kue:function(e,r){e.exports=require("kue")},path:function(e,r){e.exports=require("path")},puppeteer:function(e,r){e.exports=require("puppeteer")},winston:function(e,r){e.exports=require("winston")},"winston-daily-rotate-file":function(e,r){e.exports=require("winston-daily-rotate-file")}});
//# sourceMappingURL=server.js.map