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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax({
    method: "POST",
    dataType: "json",
    url: `/users/${id}/follow`});
  },

  unfollowUser: id => {
    return $.ajax({
    method: "DELETE",
    dataType: "json",
    url: `/users/${id}/follow`});
  },

  searchUsers: (queryVal, success) => {
    return $.ajax({
    method: "GET",
    dataType: "json",
    url: `/users/search`,
    data: {query: queryVal},
    success: success});
  },

  createTweet(data) {
    return $.ajax({
      method: "POST",
      dataType: "json",
      url: `/tweets`,
      data: data})
  }
};

module.exports = APIUtil;


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

class FollowToggle {
  constructor($el, options){
    this.$el = $el;
    this.userId = $el.data("userid") || options.userId;
    this.followState = $el.data("followstate") || options.followState;

    this.$el.on('click', this.handleClick.bind(this));

    this.render();
  }

  render() {
    if (this.followState === "followed") {
      this.$el.text("Unfollow");
    } else {
      this.$el.text("Follow");
    }
  }

  handleClick(e) {
    const success = () =>{
      if (this.followState === "unfollowed"){
        this.followState = "followed";
      } else {
        this.followState = "unfollowed";
      }
      this.$el.prop("disabled", false);
      this.render();
    };

    e.preventDefault();
    if (this.followState === "unfollowed") {
      this.$el.prop("disabled", true);
      this.$el.text("Following...");

      return APIUtil.followUser(this.userId).then(success);
    } else {
      this.$el.prop("disabled", true);
      this.$el.text("Unfollowing...");

      return APIUtil.unfollowUser(this.userId).then(success);
    }
  }

}

module.exports = FollowToggle;


/***/ }),

/***/ "./frontend/tweets_compose.js":
/*!************************************!*\
  !*** ./frontend/tweets_compose.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

class TweetsCompose {
  constructor($el) {
    this.$el = $el;
    this.$submitButton = $el.find(".submit-button");
    this.$textInput = this.$el.find('textarea[name=tweet\\[content\\]]')
    this.tweetsFeedId = this.$el.data("tweets-ul");
    this.charsLeft = 140;

    this.$el.on("submit", this.submit.bind(this));
    this.$textInput.on("input", this.updateCharsLeft.bind(this));
  }

  submit() {
    e.preventDefault();

    const data = this.$el.serializeJSON();
    this.submitButton.props("disabled", true);

    //do I need to bind handleSuccess to THIS again since its a callback?
    APIUtil.createTweet(data).then(this.handleSuccess);
  }

  clearInput() {
    this.$el.reset();
  }

  handleSuccess(result) {
    this.clearInput();
    this.submitButton.props("disabled", false);

    const tweet = JSON.stringify(result);
    let $ul = $(this.tweetsFeedId);
    $ul.append(`<li>${tweet}</li>`)
    ///////
  }

  updateCharsLeft() {
    this.charsLeft -= 1;
    this.$el.find(".chars-left").text(`${this.charsLeft}`);
  }
}

module.exports = TweetsCompose;


/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");
const TweetsCompose = __webpack_require__(/*! ./tweets_compose.js */ "./frontend/tweets_compose.js")

$(() => {
  const $followButtons = $('.follow-toggle');
  Array.from($followButtons).forEach(el => new FollowToggle($(el)));

  const $searchNav = $('.users-search');
  Array.from($searchNav).forEach(nav => new UsersSearch($(nav)));

  const $tweetForm = $('.tweet-compose');
  new TweetsCompose($tweetForm);
});


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js")

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.input = $el.find('input');
    this.ul = $el.find('ul');

    this.$el.on("input", this.handleInput.bind(this));
  }

  handleInput(){
    APIUtil.searchUsers(this.input.val(), this.renderResults.bind(this));
  }

  renderResults(results) {
    this.ul.empty();
    results.forEach((result) => {
      let $li = $(`<li><a href="${result.id}">${result.username}</a></li>`);

      const $followButton = $("<button></button>");
      new FollowToggle($followButton, {userId: result.id,
        followState: (result.followed ? "followed" : "unfollowed")
      });

      $li.append($followButton);

      this.ul.append($li);
    });
  }
}

module.exports = UsersSearch;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map