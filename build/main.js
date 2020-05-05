require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auth/index.js":
/*!***************************!*\
  !*** ./src/auth/index.js ***!
  \***************************/
/*! exports provided: jwtConfig, router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./src/auth/router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jwtConfig", function() { return _router__WEBPACK_IMPORTED_MODULE_0__["jwtConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "router", function() { return _router__WEBPACK_IMPORTED_MODULE_0__["router"]; });



/***/ }),

/***/ "./src/auth/router.js":
/*!****************************!*\
  !*** ./src/auth/router.js ***!
  \****************************/
/*! exports provided: jwtConfig, router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jwtConfig", function() { return jwtConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/auth/store.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);



const jwtConfig = {
  secret: 'my-secret'
};
const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();

const createToken = user => {
  return jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign({
    username: user.username,
    _id: user._id
  }, jwtConfig.secret, {
    expiresIn: 60 * 60 * 60
  });
};

const createUser = async (user, response) => {
  try {
    await _store__WEBPACK_IMPORTED_MODULE_1__["default"].insert(user);
    response.body = {
      token: createToken(user)
    };
    response.status = 201; // created
  } catch (err) {
    response.body = {
      issue: [{
        error: err.message
      }]
    };
    response.status = 400; // bad request
  }
};

router.post('/signup', async ctx => await createUser(ctx.request.body, ctx.response));
router.post('/login', async ctx => {
  const credentials = ctx.request.body;
  const response = ctx.response;
  const user = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].findOne({
    username: credentials.username
  });

  if (user && credentials.password === user.password) {
    response.body = {
      token: createToken(user)
    };
    response.status = 201; // created
  } else {
    response.body = {
      issue: [{
        error: 'Invalid credentials'
      }]
    };
    response.status = 400; // bad request
  }
});

/***/ }),

/***/ "./src/auth/store.js":
/*!***************************!*\
  !*** ./src/auth/store.js ***!
  \***************************/
/*! exports provided: UserStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserStore", function() { return UserStore; });
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nedb-promise */ "nedb-promise");
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nedb_promise__WEBPACK_IMPORTED_MODULE_0__);

class UserStore {
  constructor({
    filename,
    autoload
  }) {
    this.store = nedb_promise__WEBPACK_IMPORTED_MODULE_0___default()({
      filename,
      autoload
    });
  }

  async findOne(props) {
    return this.store.findOne(props);
  }

  async insert(user) {
    return this.store.insert(user);
  }

}
/* harmony default export */ __webpack_exports__["default"] = (new UserStore({
  filename: './db/users.json',
  autoload: true
}));

/***/ }),

/***/ "./src/core/Issue.js":
/*!***************************!*\
  !*** ./src/core/Issue.js ***!
  \***************************/
/*! exports provided: SEVERITY, Issue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEVERITY", function() { return SEVERITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Issue", function() { return Issue; });
const SEVERITY = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'information'
}; //ca si o enumerare, un obiect constant
//export cu nume - din acest modul exportam pt cine il va folosi
//export const Issue = (severity, code, details) => {

function Issue(severity, code, details) {
  this.severity = severity;
  this.code = code;
  this.details = details;
}

/***/ }),

/***/ "./src/core/ValidationError.js":
/*!*************************************!*\
  !*** ./src/core/ValidationError.js ***!
  \*************************************/
/*! exports provided: ValidationError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationError", function() { return ValidationError; });
class ValidationError extends Error {
  constructor(issues) {
    super('validation error');
    this.issues = issues;
  }

}

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! exports provided: SEVERITY, Issue, ValidationError, init, broadcast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Issue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Issue */ "./src/core/Issue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEVERITY", function() { return _Issue__WEBPACK_IMPORTED_MODULE_0__["SEVERITY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Issue", function() { return _Issue__WEBPACK_IMPORTED_MODULE_0__["Issue"]; });

/* harmony import */ var _ValidationError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ValidationError */ "./src/core/ValidationError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationError", function() { return _ValidationError__WEBPACK_IMPORTED_MODULE_1__["ValidationError"]; });

/* harmony import */ var _wsBroadcast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wsBroadcast */ "./src/core/wsBroadcast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "init", function() { return _wsBroadcast__WEBPACK_IMPORTED_MODULE_2__["init"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "broadcast", function() { return _wsBroadcast__WEBPACK_IMPORTED_MODULE_2__["broadcast"]; });





/***/ }),

/***/ "./src/core/wsBroadcast.js":
/*!*********************************!*\
  !*** ./src/core/wsBroadcast.js ***!
  \*********************************/
/*! exports provided: init, broadcast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "broadcast", function() { return broadcast; });
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ "ws");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_0__);

let wss;
const init = webSocketServer => {
  wss = webSocketServer;
};
const broadcast = data => {
  if (!wss) return;
  wss.clients.forEach(ws => {
    // console.log('user: ',ws.user);
    if (ws.readyState === ws__WEBPACK_IMPORTED_MODULE_0___default.a.OPEN) {
      ws.send(JSON.stringify(data));
    }
  });
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils/index.js");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ws */ "ws");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core */ "./src/core/index.js");
/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @koa/cors */ "@koa/cors");
/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_koa_cors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _item_activityRouter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./item/activityRouter */ "./src/item/activityRouter.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth */ "./src/auth/index.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! koa-jwt */ "koa-jwt");
/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(koa_jwt__WEBPACK_IMPORTED_MODULE_10__);











const app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();

const server = __webpack_require__(/*! http */ "http").createServer(app.callback());

const wss = new ws__WEBPACK_IMPORTED_MODULE_3___default.a.Server({
  server
});
Object(_core__WEBPACK_IMPORTED_MODULE_4__["init"])(wss);
app.use(_koa_cors__WEBPACK_IMPORTED_MODULE_5___default()());
wss.on('connection', ws => {
  console.log('Client connected!');
  ws.on('message', message => {
    console.log('received: %s', message);
    const {
      token
    } = JSON.parse(message);

    try {
      var decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_9___default.a.verify(token, _auth__WEBPACK_IMPORTED_MODULE_8__["jwtConfig"].secret);
      console.log('decoded: ', decoded);
      ws.user = decoded;
    } catch (err) {
      console.log("jwt error");
      console.error(err);
    }
  });
});
app.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_2___default()());
let count = 0;
app.use(_utils__WEBPACK_IMPORTED_MODULE_1__["logger"]);
app.use(_utils__WEBPACK_IMPORTED_MODULE_1__["errorHandler"]); // const prefix = '/music';

const publicRouter = new koa_router__WEBPACK_IMPORTED_MODULE_6___default.a();
publicRouter.use('/score', _item_activityRouter__WEBPACK_IMPORTED_MODULE_7__["default"].routes());
app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
server.listen(3000);

/***/ }),

/***/ "./src/item/Activity.js":
/*!******************************!*\
  !*** ./src/item/Activity.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core/index.js");
 //acolade, pt import, apoi numele exportate

function Activity(id, title, time = "", isDone = false) {
  this.id = id;
  this.title = title;
  this.time = time;
  this.isDone = isDone;
} //orice functie are proprietatea prototype - obiectul care contine functiile comune pe care le au toate obiectele de tip item


Activity.prototype.toString = function () {
  return `${this.id},${this.title},${this.time},${this.isDone}`; //backtick, pt evaluarea expresiilor prin concatenare,
};

Activity.prototype.validate = function () {
  const issues = []; //! this.text -> not undefined, not null, not ''

  if (!this.title || typeof this.title !== 'string' || this.title.trim().length === 0) {
    issues.push(new _core__WEBPACK_IMPORTED_MODULE_0__["Issue"](_core__WEBPACK_IMPORTED_MODULE_0__["SEVERITY"].WARNING, 'title', 'Invalid title property'));
  }

  if (typeof this.id !== 'number') {
    issues.push(new _core__WEBPACK_IMPORTED_MODULE_0__["Issue"](_core__WEBPACK_IMPORTED_MODULE_0__["SEVERITY"].WARNING, 'id', 'Invalid id property'));
  }

  return issues;
};

/* harmony default export */ __webpack_exports__["default"] = (Activity); //export pt utilizare -> in general un modul exporta un singur obiect, cel care importa poate sa dea orice nume obiectului

/***/ }),

/***/ "./src/item/activityRouter.js":
/*!************************************!*\
  !*** ./src/item/activityRouter.js ***!
  \************************************/
/*! exports provided: router, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core */ "./src/core/index.js");
/* harmony import */ var _activityStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activityStore */ "./src/item/activityStore.js");




const fs = __webpack_require__(/*! fs */ "fs");

const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();
const items = new _activityStore__WEBPACK_IMPORTED_MODULE_2__["ActivityStore"]();
router.get('/sample', async (ctx, next) => {
  console.log("sample");
  let data = fs.readFileSync('db\\Glasul_florilor.musicxml', 'utf8');
  ctx.response.body = data.toString(); // ctx.response.body = {"data": data.toString()};

  ctx.response.status = 200; // ok

  console.log(ctx.response.body);
  console.log(200);
}); // router.get('/:id', async (ctx, next) => {
//     const id = parseInt(ctx.params.id);
//     const item = await items.findOne(id);
//     if (item) {
//         ctx.response.body = item;
//         ctx.response.status = 200;
//     } else {
//         ctx.response.status = 404;
//     }
// });
// router.post('/', async (ctx, next) => {
//     const item = ctx.request.body; //luam item trimis de client
//     console.log(item);
//     const insertedItem = await items.insert(item);
//     ctx.response.body = insertedItem;
//     ctx.response.status = 200;
//     broadcast(insertedItem);
// });
//
// router.put('/:id', async (ctx, next) => {
//     const item = ctx.request.body;
//     console.log(item);
//     const id = parseInt(ctx.params.id);
//     items.update({id: id}, item);
//     const newItem = await items.findOne(id);
//     ctx.response.body = newItem;
//     ctx.response.status = 200;
//     broadcast(newItem);
// });
//
// // delete item by id
// router.delete('/:id', async (ctx, next) => {
//     const id = parseInt(ctx.params.id);
//     await items.remove({id: id}).then((result) => {
//         ctx.response.body = "Item was successfully deleted";
//         ctx.response.status = 200;
//         broadcast([]);
//     }).catch((reject) => {
//         ctx.response.status = 400;
//         ctx.response.body = reject;
//     })
//
// });
//
// // delete item from request body
// router.delete('/', async (ctx, next) => {
//     const props = ctx.request.body;
//     await items.remove(props).then((result) => {
//         ctx.response.status = 200;
//         ctx.response.body = '{"text": "Deleted succesfully"}';
//         broadcast([])
//     })
//         .catch((reject) => {
//             ctx.response.status = 400;
//             ctx.response.body = reject;
//         })
// });

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/item/activityStore.js":
/*!***********************************!*\
  !*** ./src/item/activityStore.js ***!
  \***********************************/
/*! exports provided: ActivityStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityStore", function() { return ActivityStore; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core/index.js");
/* harmony import */ var _Activity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Activity */ "./src/item/Activity.js");
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nedb-promise */ "nedb-promise");
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nedb_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _activityStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activityStore */ "./src/item/activityStore.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import Item from './Item' //fara acolade cand e default





const match = (props, item) => {
  const keys = Object.keys(props);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (props[key] !== item[key]) {
      return false;
    }
  }

  return true;
};

class ActivityStore {
  constructor() {
    _defineProperty(this, "findOne", async id => this.db.findOne({
      id: id
    }));

    _defineProperty(this, "find", async props => this.db.find(props));

    _defineProperty(this, "update", async (props, item) => this.db.update(props, item));

    _defineProperty(this, "remove", async props => {
      console.log(props);
      this.db.remove(props);
    });

    _defineProperty(this, "count", async props => this.db.ccount(props));

    this.db = nedb_promise__WEBPACK_IMPORTED_MODULE_2___default()({
      filename: 'db/activities.json',
      autoload: true
    });
  }

  static ensureValidItem(item) {
    const issues = item.validate();

    if (issues.length > 0) {
      throw new _core__WEBPACK_IMPORTED_MODULE_0__["ValidationError"](issues);
    }
  }

  async insert(item) {
    const it = new _Activity__WEBPACK_IMPORTED_MODULE_1__["default"](item.id, item.title);
    _activityStore__WEBPACK_IMPORTED_MODULE_3__["default"].ensureValidItem(it);
    it.time = item.time;
    it.isDone = item.isDone;
    return this.db.insert(it);
  }

}
/* harmony default export */ __webpack_exports__["default"] = (ActivityStore);

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: errorHandler, logger, idGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorHandler", function() { return errorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idGenerator", function() { return idGenerator; });
const errorHandler = async (ctx, next) => {
  // error handler
  try {
    return await next();
  } catch (err) {
    ctx.body = {
      message: err.message || 'Unexpected error.'
    };
    ctx.status = err.status || 500;
  }
};
const logger = async (ctx, next) => {
  //logger function
  let start = Date.now();
  await next();
  console.log(`${ctx.request.method} ${ctx.request.body} ${Date.now() - start} ms`);
}; // let id = 0;
// export const idGenerator = {
//     next: () => (++id)
// }

const idGenerator = (() => {
  let id = 0; //nu e distrusa la sfarsitul codului, ci se va pastra (intr-un obiect numit closure, valoarea, pana va fi nevoie de ea)

  return {
    next: () => ++id
  };
})(); //iie immediately executed function

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Uni\Anul 3\Sem 2\Licenta\music-server\src/index.js */"./src/index.js");


/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@koa/cors");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-jwt":
/*!**************************!*\
  !*** external "koa-jwt" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-jwt");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "nedb-promise":
/*!*******************************!*\
  !*** external "nedb-promise" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nedb-promise");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ })

/******/ });
//# sourceMappingURL=main.map