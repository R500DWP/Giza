(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "../node_modules/stickybits/dist/stickybits.es.js":
/*!********************************************************!*\
  !*** ../node_modules/stickybits/dist/stickybits.es.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n  stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills\n  @version v3.6.6\n  @link https://github.com/dollarshaveclub/stickybits#readme\n  @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)\n  @license MIT\n**/\n/*\n  STICKYBITS 💉\n  --------\n  > a lightweight alternative to `position: sticky` polyfills 🍬\n  --------\n  - each method is documented above it our view the readme\n  - Stickybits does not manage polymorphic functionality (position like properties)\n  * polymorphic functionality: (in the context of describing Stickybits)\n    means making things like `position: sticky` be loosely supported with position fixed.\n    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.\n  --------\n  defaults 🔌\n  --------\n  - version = `package.json` version\n  - userAgent = viewer browser agent\n  - target = DOM element selector\n  - noStyles = boolean\n  - offset = number\n  - parentClass = 'string'\n  - scrollEl = window || DOM element selector || DOM element\n  - stickyClass = 'string'\n  - stuckClass = 'string'\n  - useStickyClasses = boolean\n  - useFixed = boolean\n  - useGetBoundingClientRect = boolean\n  - verticalPosition = 'string'\n  --------\n  props🔌\n  --------\n  - p = props {object}\n  --------\n  instance note\n  --------\n  - stickybits parent methods return this\n  - stickybits instance methods return an instance item\n  --------\n  nomenclature\n  --------\n  - target => el => e\n  - props => o || p\n  - instance => item => it\n  --------\n  methods\n  --------\n  - .definePosition = defines sticky or fixed\n  - .addInstance = an array of objects for each Stickybits Target\n  - .getClosestParent = gets the parent for non-window scroll\n  - .getTopPosition = gets the element top pixel position from the viewport\n  - .computeScrollOffsets = computes scroll position\n  - .toggleClasses = older browser toggler\n  - .manageState = manages sticky state\n  - .removeClass = older browser support class remover\n  - .removeInstance = removes an instance\n  - .cleanup = removes all Stickybits instances and cleans up dom from stickybits\n*/\nvar Stickybits =\n/*#__PURE__*/\nfunction () {\n  function Stickybits(target, obj) {\n    var o = typeof obj !== 'undefined' ? obj : {};\n    this.version = '3.6.6';\n    this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser';\n    this.props = {\n      customStickyChangeNumber: o.customStickyChangeNumber || null,\n      noStyles: o.noStyles || false,\n      stickyBitStickyOffset: o.stickyBitStickyOffset || 0,\n      parentClass: o.parentClass || 'js-stickybit-parent',\n      scrollEl: typeof o.scrollEl === 'string' ? document.querySelector(o.scrollEl) : o.scrollEl || window,\n      stickyClass: o.stickyClass || 'js-is-sticky',\n      stuckClass: o.stuckClass || 'js-is-stuck',\n      stickyChangeClass: o.stickyChangeClass || 'js-is-sticky--change',\n      useStickyClasses: o.useStickyClasses || false,\n      useFixed: o.useFixed || false,\n      useGetBoundingClientRect: o.useGetBoundingClientRect || false,\n      verticalPosition: o.verticalPosition || 'top'\n      /*\n        define positionVal after the setting of props, because definePosition looks at the props.useFixed\n        ----\n        -  uses a computed (`.definePosition()`)\n        -  defined the position\n      */\n\n    };\n    this.props.positionVal = this.definePosition() || 'fixed';\n    this.instances = [];\n    var _this$props = this.props,\n        positionVal = _this$props.positionVal,\n        verticalPosition = _this$props.verticalPosition,\n        noStyles = _this$props.noStyles,\n        stickyBitStickyOffset = _this$props.stickyBitStickyOffset;\n    var verticalPositionStyle = verticalPosition === 'top' && !noStyles ? stickyBitStickyOffset + \"px\" : '';\n    var positionStyle = positionVal !== 'fixed' ? positionVal : '';\n    this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;\n    if (!('length' in this.els)) this.els = [this.els];\n\n    for (var i = 0; i < this.els.length; i++) {\n      var el = this.els[i]; // set vertical position\n\n      el.style[verticalPosition] = verticalPositionStyle;\n      el.style.position = positionStyle; // instances are an array of objects\n\n      this.instances.push(this.addInstance(el, this.props));\n    }\n  }\n  /*\n    setStickyPosition ✔️\n    --------\n    —  most basic thing stickybits does\n    => checks to see if position sticky is supported\n    => defined the position to be used\n    => stickybits works accordingly\n  */\n\n\n  var _proto = Stickybits.prototype;\n\n  _proto.definePosition = function definePosition() {\n    var stickyProp;\n\n    if (this.props.useFixed) {\n      stickyProp = 'fixed';\n    } else {\n      var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];\n      var test = document.head.style;\n\n      for (var i = 0; i < prefix.length; i += 1) {\n        test.position = prefix[i] + \"sticky\";\n      }\n\n      stickyProp = test.position ? test.position : 'fixed';\n      test.position = '';\n    }\n\n    return stickyProp;\n  }\n  /*\n    addInstance ✔️\n    --------\n    — manages instances of items\n    - takes in an el and props\n    - returns an item object\n    ---\n    - target = el\n    - o = {object} = props\n      - scrollEl = 'string' | object\n      - verticalPosition = number\n      - off = boolean\n      - parentClass = 'string'\n      - stickyClass = 'string'\n      - stuckClass = 'string'\n    ---\n    - defined later\n      - parent = dom element\n      - state = 'string'\n      - offset = number\n      - stickyStart = number\n      - stickyStop = number\n    - returns an instance object\n  */\n  ;\n\n  _proto.addInstance = function addInstance(el, props) {\n    var _this = this;\n\n    var item = {\n      el: el,\n      parent: el.parentNode,\n      props: props\n    };\n\n    if (props.positionVal === 'fixed' || props.useStickyClasses) {\n      this.isWin = this.props.scrollEl === window;\n      var se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl);\n      this.computeScrollOffsets(item);\n      item.parent.className += \" \" + props.parentClass;\n      item.state = 'default';\n\n      item.stateContainer = function () {\n        return _this.manageState(item);\n      };\n\n      se.addEventListener('scroll', item.stateContainer);\n    }\n\n    return item;\n  }\n  /*\n    --------\n    getParent 👨‍\n    --------\n    - a helper function that gets the target element's parent selected el\n    - only used for non `window` scroll elements\n    - supports older browsers\n  */\n  ;\n\n  _proto.getClosestParent = function getClosestParent(el, match) {\n    // p = parent element\n    var p = match;\n    var e = el;\n    if (e.parentElement === p) return p; // traverse up the dom tree until we get to the parent\n\n    while (e.parentElement !== p) {\n      e = e.parentElement;\n    } // return parent element\n\n\n    return p;\n  }\n  /*\n    --------\n    getTopPosition\n    --------\n    - a helper function that gets the topPosition of a Stickybit element\n    - from the top level of the DOM\n  */\n  ;\n\n  _proto.getTopPosition = function getTopPosition(el) {\n    if (this.props.useGetBoundingClientRect) {\n      return el.getBoundingClientRect().top + (this.props.scrollEl.pageYOffset || document.documentElement.scrollTop);\n    }\n\n    var topPosition = 0;\n\n    do {\n      topPosition = el.offsetTop + topPosition;\n    } while (el = el.offsetParent);\n\n    return topPosition;\n  }\n  /*\n    computeScrollOffsets 📊\n    ---\n    computeScrollOffsets for Stickybits\n    - defines\n      - offset\n      - start\n      - stop\n  */\n  ;\n\n  _proto.computeScrollOffsets = function computeScrollOffsets(item) {\n    var it = item;\n    var p = it.props;\n    var el = it.el;\n    var parent = it.parent;\n    var isCustom = !this.isWin && p.positionVal === 'fixed';\n    var isTop = p.verticalPosition !== 'bottom';\n    var scrollElOffset = isCustom ? this.getTopPosition(p.scrollEl) : 0;\n    var stickyStart = isCustom ? this.getTopPosition(parent) - scrollElOffset : this.getTopPosition(parent);\n    var stickyChangeOffset = p.customStickyChangeNumber !== null ? p.customStickyChangeNumber : el.offsetHeight;\n    var parentBottom = stickyStart + parent.offsetHeight;\n    it.offset = scrollElOffset + p.stickyBitStickyOffset;\n    it.stickyStart = isTop ? stickyStart - it.offset : 0;\n    it.stickyChange = it.stickyStart + stickyChangeOffset;\n    it.stickyStop = isTop ? parentBottom - (el.offsetHeight + it.offset) : parentBottom - window.innerHeight;\n  }\n  /*\n    toggleClasses ⚖️\n    ---\n    toggles classes (for older browser support)\n    r = removed class\n    a = added class\n  */\n  ;\n\n  _proto.toggleClasses = function toggleClasses(el, r, a) {\n    var e = el;\n    var cArray = e.className.split(' ');\n    if (a && cArray.indexOf(a) === -1) cArray.push(a);\n    var rItem = cArray.indexOf(r);\n    if (rItem !== -1) cArray.splice(rItem, 1);\n    e.className = cArray.join(' ');\n  }\n  /*\n    manageState 📝\n    ---\n    - defines the state\n      - normal\n      - sticky\n      - stuck\n  */\n  ;\n\n  _proto.manageState = function manageState(item) {\n    // cache object\n    var it = item;\n    var e = it.el;\n    var p = it.props;\n    var state = it.state;\n    var start = it.stickyStart;\n    var change = it.stickyChange;\n    var stop = it.stickyStop;\n    var stl = e.style; // cache props\n\n    var ns = p.noStyles;\n    var pv = p.positionVal;\n    var se = p.scrollEl;\n    var sticky = p.stickyClass;\n    var stickyChange = p.stickyChangeClass;\n    var stuck = p.stuckClass;\n    var vp = p.verticalPosition;\n    var isTop = vp !== 'bottom';\n    /*\n      requestAnimationFrame\n      ---\n      - use rAF\n      - or stub rAF\n    */\n\n    var rAFStub = function rAFDummy(f) {\n      f();\n    };\n\n    var rAF = !this.isWin ? rAFStub : window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || rAFStub;\n    /*\n      define scroll vars\n      ---\n      - scroll\n      - notSticky\n      - isSticky\n      - isStuck\n    */\n\n    var tC = this.toggleClasses;\n    var scroll = this.isWin ? window.scrollY || window.pageYOffset : se.scrollTop;\n    var notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck');\n    var isSticky = isTop && scroll <= start && (state === 'sticky' || state === 'stuck');\n    var isStuck = scroll >= stop && state === 'sticky';\n    /*\n      Unnamed arrow functions within this block\n      ---\n      - help wanted or discussion\n      - view test.stickybits.js\n        - `stickybits .manageState  `position: fixed` interface` for more awareness 👀\n    */\n\n    if (notSticky) {\n      it.state = 'sticky';\n      rAF(function () {\n        tC(e, stuck, sticky);\n        stl.position = pv;\n        if (ns) return;\n        stl.bottom = '';\n        stl[vp] = p.stickyBitStickyOffset + \"px\";\n      });\n    } else if (isSticky) {\n      it.state = 'default';\n      rAF(function () {\n        tC(e, sticky);\n        tC(e, stuck);\n        if (pv === 'fixed') stl.position = '';\n      });\n    } else if (isStuck) {\n      it.state = 'stuck';\n      rAF(function () {\n        tC(e, sticky, stuck);\n        if (pv !== 'fixed' || ns) return;\n        stl.top = '';\n        stl.bottom = '0';\n        stl.position = 'absolute';\n      });\n    }\n\n    var isStickyChange = scroll >= change && scroll <= stop;\n    var isNotStickyChange = scroll < change / 2 || scroll > stop;\n    var stub = 'stub'; // a stub css class to remove\n\n    if (isNotStickyChange) {\n      rAF(function () {\n        tC(e, stickyChange);\n      });\n    } else if (isStickyChange) {\n      rAF(function () {\n        tC(e, stub, stickyChange);\n      });\n    }\n  };\n\n  _proto.update = function update(updatedProps) {\n    if (updatedProps === void 0) {\n      updatedProps = null;\n    }\n\n    for (var i = 0; i < this.instances.length; i += 1) {\n      var instance = this.instances[i];\n      this.computeScrollOffsets(instance);\n\n      if (updatedProps) {\n        for (var updatedProp in updatedProps) {\n          instance.props[updatedProp] = updatedProps[updatedProp];\n        }\n      }\n    }\n\n    return this;\n  }\n  /*\n    removes an instance 👋\n    --------\n    - cleanup instance\n  */\n  ;\n\n  _proto.removeInstance = function removeInstance(instance) {\n    var e = instance.el;\n    var p = instance.props;\n    var tC = this.toggleClasses;\n    e.style.position = '';\n    e.style[p.verticalPosition] = '';\n    tC(e, p.stickyClass);\n    tC(e, p.stuckClass);\n    tC(e.parentNode, p.parentClass);\n  }\n  /*\n    cleanup 🛁\n    --------\n    - cleans up each instance\n    - clears instance\n  */\n  ;\n\n  _proto.cleanup = function cleanup() {\n    for (var i = 0; i < this.instances.length; i += 1) {\n      var instance = this.instances[i];\n\n      if (instance.stateContainer) {\n        instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer);\n      }\n\n      this.removeInstance(instance);\n    }\n\n    this.manageState = false;\n    this.instances = [];\n  };\n\n  return Stickybits;\n}();\n/*\n  export\n  --------\n  exports StickBits to be used 🏁\n*/\n\n\nfunction stickybits(target, o) {\n  return new Stickybits(target, o);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (stickybits);\n\n\n//# sourceURL=webpack:///../node_modules/stickybits/dist/stickybits.es.js?");

/***/ })

}]);