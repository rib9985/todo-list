/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Logic */ \"./src/modules/Logic.js\");\n\n\n_modules_Logic__WEBPACK_IMPORTED_MODULE_0__.instantiateDefaultProjects()\nconsole.log(_modules_Logic__WEBPACK_IMPORTED_MODULE_0__.projects)\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/modules/Logic.js":
/*!******************************!*\
  !*** ./src/modules/Logic.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addTodoToProject: () => (/* binding */ addTodoToProject),\n/* harmony export */   getActiveProject: () => (/* binding */ getActiveProject),\n/* harmony export */   instantiateDefaultProjects: () => (/* binding */ instantiateDefaultProjects),\n/* harmony export */   parseTodoForm: () => (/* binding */ parseTodoForm),\n/* harmony export */   projects: () => (/* binding */ projects)\n/* harmony export */ });\n/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todo */ \"./src/modules/Todo.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ \"./src/modules/Project.js\");\n\n\n\n//\n\nconst projects = []\n\nfunction instantiateDefaultProjects (){\n    const inbox = new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Inbox', [])\n    const today = new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Today', [])\n    const upcoming = new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Upcoming', [])\n    const anytime = new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Anytime', [])\n\n    projects.push(inbox, today, upcoming, anytime)\n    return projects\n}\n\n\n// Parse todo form -> Returns Todo Task Object\n\nfunction parseTodoForm(){\n    const title = document.getElementById('todo-form-title').value\n    const description = document.getElementById('todo-form-description').value\n    const complete = document.getElementById('todo-form-complete').value\n    const dueDate = document.getElementById('todo-form-dueDate').value\n    const priority = document.getElementById('todo-form-priority').value\n\n    const todoTaskObject = new _Todo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](title, description, complete, dueDate,priority)\n    return todoTaskObject \n}\n\n// Push Todo to Project -> Returns Updated Project\nfunction addTodoToProject(todo, project){\n    project.pushTodoToProject(todo)\n    return project\n}\n\n// Activate Project -> Returns Active Project\nfunction getActiveProject (name){\n    return projects.find(name)\n}\n\n\n\n// TODO: Temporary storage, research how this works with JSON\n// Store Info\n\n//# sourceURL=webpack://todo-list/./src/modules/Logic.js?");

/***/ }),

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\n   \n    constructor(name){\n    this.name = name\n    this.projectTodos = []\n\n   } \n\n   set name(value){\n    if (value){\n        this.name = value\n    }\n   }\n\n   get name(){\n    return this.name\n   }\n\n   get projectTodos(){\n    return this.projectTodos\n   }\n\n   pushTodoToProject(todo){\n    if (todo){\n        this.projectTodos.push(todo)\n    }\n   }\n}   \n\n\n//# sourceURL=webpack://todo-list/./src/modules/Project.js?");

/***/ }),

/***/ "./src/modules/Todo.js":
/*!*****************************!*\
  !*** ./src/modules/Todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Todo)\n/* harmony export */ });\nclass Todo{\n\n    // This creates the initial object of the todo\n    constructor(status, title, description, notes, dueDate, priority){\n        this.status= status\n        this.description=description\n        this.title=title\n        this.notes =notes\n        this.dueDate = dueDate\n        this.priority=priority\n    }\n\n    // Getters & Setters of Todo\n    set title(title){\n        this.title = title\n    }\n\n    get title(){\n        return this.title\n    }\n\n\n    set description(description){\n        this.description = description\n    }\n\n    get description(){\n        return this.description\n    }\n\n    set notes(notes){\n        this.notes = notes\n    }\n\n    get notes (){\n        return this.notes\n    }\n    \n    set status(status){\n        if (status === true){\n            this.status = true\n        }\n        else {\n            this.status = false\n        }\n    }\n\n    set dueDate(dueDate){\n        this.dueDate = dueDate\n    }\n\n   get dueDate(){\n    return this.dueDate\n   }\n \n    set priority(priority){\n        this.priority = priority\n    }\n\n    get priority(){\n        return this.priority\n    }\n\n    get dateFormatted(){\n        if (!this.date){\n            return 'YY/MM/DD'\n        }\n\n        const dateObject = new Date(this.dueDate)\n        const formattedDate = dateObject.toLocaleDateString();\n        return formattedDate\n    }\n\n\n\n\n}\n\n//# sourceURL=webpack://todo-list/./src/modules/Todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;