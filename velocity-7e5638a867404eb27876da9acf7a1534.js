/*!
* Velocity.js: Accelerated JavaScript animation.
* @version 0.9.0
* @docs http://velocityjs.org
* @license Copyright 2014 Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
*/

!function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function f(a){var b=r.data(a,k);return null===b?d:b}function g(a){return function(b){return Math.round(b*a)*(1/a)}}function h(a,b){var c=a;return q.isString(a)?s.Easings[a]||(c=!1):c=q.isArray(a)&&1===a.length?g.apply(null,a):q.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):q.isArray(a)&&4===a.length?t.apply(null,a):!1,c===!1&&(c=s.Easings[s.defaults.easing]?s.defaults.easing:m),c}function i(a){if(a)for(var b=(new Date).getTime(),c=0,e=s.State.calls.length;e>c;c++)if(s.State.calls[c]){var g=s.State.calls[c],h=g[0],k=g[2],l=g[3];l||(l=s.State.calls[c][3]=b-16);for(var m=Math.min((b-l)/k.duration,1),n=0,o=h.length;o>n;n++){var r=h[n],t=r.element;if(f(t)){var u=!1;k.display&&"none"!==k.display&&v.setPropertyValue(t,"display",k.display),k.visibility&&"hidden"!==k.visibility&&v.setPropertyValue(t,"visibility",k.visibility);for(var w in r)if("element"!==w){var x,y=r[w],z=q.isString(y.easing)?s.Easings[y.easing]:y.easing;if(x=1===m?y.endValue:y.startValue+(y.endValue-y.startValue)*z(m),y.currentValue=x,v.Hooks.registered[w]){var A=v.Hooks.getRoot(w),B=f(t).rootPropertyValueCache[A];B&&(y.rootPropertyValue=B)}var C=v.setPropertyValue(t,w,y.currentValue+(0===parseFloat(x)?"":y.unitType),y.rootPropertyValue,y.scrollData);v.Hooks.registered[w]&&(f(t).rootPropertyValueCache[A]=v.Normalizations.registered[A]?v.Normalizations.registered[A]("extract",null,C[1]):C[1]),"transform"===C[0]&&(u=!0)}k.mobileHA&&f(t).transformCache.translate3d===d&&(f(t).transformCache.translate3d="(0px, 0px, 0px)",u=!0),u&&v.flushTransformCache(t)}}k.display&&"none"!==k.display&&(s.State.calls[c][2].display=!1),k.visibility&&"hidden"!==k.visibility&&(s.State.calls[c][2].visibility=!1),k.progress&&k.progress.call(g[1],g[1],m,Math.max(0,l+k.duration-b),l),1===m&&j(c)}s.State.isTicking&&p(i)}function j(a,b){if(!s.State.calls[a])return!1;for(var c=s.State.calls[a][0],e=s.State.calls[a][1],g=s.State.calls[a][2],h=s.State.calls[a][4],i=!1,j=0,k=c.length;k>j;j++){var l=c[j].element;if(b||g.loop||("none"===g.display&&v.setPropertyValue(l,"display",g.display),"hidden"===g.visibility&&v.setPropertyValue(l,"visibility",g.visibility)),(r.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(r.queue(l)[1]))&&f(l)){f(l).isAnimating=!1,f(l).rootPropertyValueCache={};var m=!1;r.each(f(l).transformCache,function(a,b){var c=/^scale/.test(a)?1:0;new RegExp("^\\("+c+"[^.]").test(b)&&(m=!0,delete f(l).transformCache[a])}),g.mobileHA&&(m=!0,delete f(l).transformCache.translate3d),m&&v.flushTransformCache(l),v.Values.removeClass(l,"velocity-animating")}if(!b&&g.complete&&!g.loop&&j===k-1)try{g.complete.call(e,e)}catch(n){setTimeout(function(){throw n},1)}h&&h(e),g.queue!==!1&&r.dequeue(l,g.queue)}s.State.calls[a]=!1;for(var o=0,p=s.State.calls.length;p>o;o++)if(s.State.calls[o]!==!1){i=!0;break}i===!1&&(s.State.isTicking=!1,delete s.State.calls,s.State.calls=[])}var k="velocity",l=400,m="swing",n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a}return d}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),p=b.requestAnimationFrame||o,q={isString:function(a){return"string"==typeof a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isNode:function(a){return a&&a.nodeType},isNodeList:function(a){return"object"==typeof a&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==typeof a[0]&&a[0].nodeType>0)},isWrapped:function(a){return a&&(a.jquery||b.Zepto&&b.Zepto.zepto.isZ(a))},isSVG:function(a){return b.SVGElement&&a instanceof SVGElement}},r=b.jQuery||a.Velocity&&a.Velocity.Utilities;if(!r)throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.");if(a.Velocity!==d&&!a.Velocity.Utilities)throw new Error("Velocity: Namespace is occupied.");if(7>=n){if(b.jQuery)return void(b.jQuery.fn.velocity=b.jQuery.fn.animate);throw new Error("Velocity: For IE<=7, Velocity falls back to jQuery, which must first be loaded.")}if(8===n&&!b.jQuery)throw new Error("Velocity: For IE8, Velocity requires jQuery to be loaded. (Velocity's jQuery shim does not work with IE8.)");var s=a.Velocity=a.velocity={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:b.jQuery,Sequences:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:l,easing:m,begin:null,complete:null,progress:null,display:null,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},animate:function(){},mock:!1,version:{major:0,minor:9,patch:0},debug:!1};b.pageYOffset!==d?(s.State.scrollAnchor=b,s.State.scrollPropertyLeft="pageXOffset",s.State.scrollPropertyTop="pageYOffset"):(s.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,s.State.scrollPropertyLeft="scrollLeft",s.State.scrollPropertyTop="scrollTop"),s.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(p=function(a){return setTimeout(function(){a(!0)},16)},i()):p=b.requestAnimationFrame||o});var t=function(){function a(a,b){return 1-3*b+3*a}function b(a,b){return 3*b-6*a}function c(a){return 3*a}function d(d,e,f){return((a(e,f)*d+b(e,f))*d+c(e))*d}function e(d,e,f){return 3*a(e,f)*d*d+2*b(e,f)*d+c(e)}return function(a,b,c,f){function g(b){for(var f=b,g=0;8>g;++g){var h=e(f,a,c);if(0===h)return f;var i=d(f,a,c)-b;f-=i/h}return f}if(4!==arguments.length)return!1;for(var h=0;4>h;++h)if("number"!=typeof arguments[h]||isNaN(arguments[h])||!isFinite(arguments[h]))return!1;return a=Math.min(a,1),c=Math.min(c,1),a=Math.max(a,0),c=Math.max(c,0),function(e){return a===b&&c===f?e:d(g(e),b,f)}}}(),u=function(){function a(a){return-a.tension*a.x-a.friction*a.v}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return{dx:e.v,dv:a(e)}}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;;)if(h=c(h||i,g),j.push(1+h.x),k+=16,!(Math.abs(h.x)>l&&Math.abs(h.v)>l))break;return f?function(a){return j[a*(j.length-1)|0]}:k}}();!function(){s.Easings.linear=function(a){return a},s.Easings.swing=function(a){return.5-Math.cos(a*Math.PI)/2},s.Easings.spring=function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)},s.Easings.ease=t(.25,.1,.25,1),s.Easings["ease-in"]=t(.42,0,1,1),s.Easings["ease-out"]=t(0,0,.58,1),s.Easings["ease-in-out"]=t(.42,0,.58,1);var a={};r.each(["Quad","Cubic","Quart","Quint","Expo"],function(b,c){a[c]=function(a){return Math.pow(a,b+2)}}),r.extend(a,{Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a){return 0===a||1===a?a:-Math.pow(2,8*(a-1))*Math.sin((80*(a-1)-7.5)*Math.PI/15)},Back:function(a){return a*a*(3*a-2)},Bounce:function(a){for(var b,c=4;a<((b=Math.pow(2,--c))-1)/11;);return 1/Math.pow(4,3-c)-7.5625*Math.pow((3*b-2)/22-a,2)}}),r.each(a,function(a,b){s.Easings["easeIn"+a]=b,s.Easings["easeOut"+a]=function(a){return 1-b(1-a)},s.Easings["easeInOut"+a]=function(a){return.5>a?b(2*a)/2:1-b(-2*a+2)/2}})}();var v=s.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var a=0;a<v.Lists.colors.length;a++)v.Hooks.templates[v.Lists.colors[a]]=["Red Green Blue Alpha","255 255 255 1"];var b,c,d;if(n)for(b in v.Hooks.templates){c=v.Hooks.templates[b],d=c[0].split(" ");var e=c[1].match(v.RegEx.valueSplit);"Color"===d[0]&&(d.push(d.shift()),e.push(e.shift()),v.Hooks.templates[b]=[d.join(" "),e.join(" ")])}for(b in v.Hooks.templates){c=v.Hooks.templates[b],d=c[0].split(" ");for(var a in d){var f=b+d[a],g=a;v.Hooks.registered[f]=[b,g]}}},getRoot:function(a){var b=v.Hooks.registered[a];return b?b[0]:a},cleanRootPropertyValue:function(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.Hooks.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b},extractValue:function(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e]}return b},injectValue:function(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ")}return c}},Normalizations:{registered:{clip:function(a,b,c){switch(a){case"name":return"clip";case"extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case"inject":return"rect("+c+")"}},opacity:function(a,b,c){if(8>=n)switch(a){case"name":return"filter";case"extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case"inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")"}else switch(a){case"name":return"opacity";case"extract":return c;case"inject":return c}}},register:function(){9>=n||s.State.isGingerbread||(v.Lists.transformsBase=v.Lists.transformsBase.concat(v.Lists.transforms3D));for(var a=0;a<v.Lists.transformsBase.length;a++)!function(){var b=v.Lists.transformsBase[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return"transform";case"extract":return f(c).transformCache[b]===d?/^scale/i.test(b)?1:0:f(c).transformCache[b].replace(/[()]/g,"");case"inject":var g=!1;switch(b.substr(0,b.length-1)){case"translate":g=!/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case"scal":case"scale":s.State.isAndroid&&f(c).transformCache[b]===d&&1>e&&(e=1),g=!/(\d)$/i.test(e);break;case"skew":g=!/(deg|\d)$/i.test(e);break;case"rotate":g=!/(deg|\d)$/i.test(e)}return g||(f(c).transformCache[b]="("+e+")"),f(c).transformCache[b]}}}();for(var a=0;a<v.Lists.colors.length;a++)!function(){var b=v.Lists.colors[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return b;case"extract":var f;if(v.RegEx.wrappedValueAlreadyExtracted.test(e))f=e;else{var g,h={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(e)?g=h[e]!==d?h[e]:h.black:v.RegEx.isHex.test(e)?g="rgb("+v.Values.hexToRgb(e).join(" ")+")":/^rgba?\(/i.test(e)||(g=h.black),f=(g||e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=n||3!==f.split(" ").length||(f+=" 1"),f;case"inject":return 8>=n?4===e.split(" ").length&&(e=e.split(/\s+/).slice(0,3).join(" ")):3===e.split(" ").length&&(e+=" 1"),(8>=n?"rgb":"rgba")+"("+e.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()})},SVGAttribute:function(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(n||s.State.isAndroid&&!s.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a)},prefixCheck:function(a){if(s.State.prefixMatches[a])return[s.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;d>c;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase()}),q.isString(s.State.prefixElement.style[e]))return s.State.prefixMatches[a]=e,[e,!0]}return[a,!1]}},Values:{hexToRgb:function(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d}),b=d.exec(a),b?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:[0,0,0]},isCSSNullValue:function(a){return 0==a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)},getUnitType:function(a){return/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px"},getDisplayType:function(a){var b=a.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":"block"},addClass:function(a,b){a.classList?a.classList.add(b):a.className+=(a.className.length?" ":"")+b},removeClass:function(a,b){a.classList?a.classList.remove(b):a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(a,c,e,g){function h(a,c){function e(){j&&v.setPropertyValue(a,"display","none")}var i=0;if(8>=n)i=r.css(a,c);else{var j=!1;if(/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(j=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a))),!g){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return e(),k}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return e(),l}}var m;m=f(a)===d?b.getComputedStyle(a,null):f(a).computedStyle?f(a).computedStyle:f(a).computedStyle=b.getComputedStyle(a,null),(n||s.State.isFirefox)&&"borderColor"===c&&(c="borderTopColor"),i=9===n&&"filter"===c?m.getPropertyValue(c):m[c],(""===i||null===i)&&(i=a.style[c]),e()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(c)){var o=h(a,"position");("fixed"===o||"absolute"===o&&/top|left/i.test(c))&&(i=r(a).position()[c]+"px")}return i}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e)}else if(v.Normalizations.registered[c]){var l,m;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(m=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(m)&&v.Hooks.templates[c]&&(m=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,m)}return/^[\d-]/.test(i)||(i=f(a)&&f(a).isSVG&&v.Names.SVGAttribute(c)?/^(height|width)$/i.test(c)?a.getBBox()[c]:a.getAttribute(c):h(a,v.Names.prefixCheck(c)[0])),v.Values.isCSSNullValue(i)&&(i=0),s.debug>=2&&console.log("Get "+c+": "+i),i},setPropertyValue:function(a,c,d,e,g){var h=c;if("scroll"===c)g.container?g.container["scroll"+g.direction]=d:"Left"===g.direction?b.scrollTo(d,g.alternateValue):b.scrollTo(g.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=f(a).transformCache[c];else{if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],8>=n)try{a.style[h]=d}catch(k){s.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]")}else f(a)&&f(a).isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d;s.debug>=2&&console.log("Set "+c+" ("+h+"): "+d)}return[h,d]},flushTransformCache:function(a){function b(b){return parseFloat(v.getPropertyValue(a,b))}var c="";if((n||s.State.isAndroid&&!s.State.isChrome)&&f(a).isSVG){var d={translate:[b("translateX"),b("translateY")],skewX:[b("skewX")],skewY:[b("skewY")],scale:1!==b("scale")?[b("scale"),b("scale")]:[b("scaleX"),b("scaleY")],rotate:[b("rotateZ"),0,0]};r.each(f(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),d[a]&&(c+=a+"("+d[a].join(" ")+") ",delete d[a])})}else{var e,g;r.each(f(a).transformCache,function(b){return e=f(a).transformCache[b],"transformPerspective"===b?(g=e,!0):(9===n&&"rotateZ"===b&&(b="rotate"),void(c+=b+e+" "))}),g&&(c="perspective"+g+" "+c)}v.setPropertyValue(a,"transform",c)}};v.Hooks.register(),v.Normalizations.register(),s.animate=function(){function a(){return m?C.promise||null:o}function g(){function a(){function a(a,b){var c=d,e=d,f=d;return q.isArray(a)?(c=a[0],!q.isArray(a[1])&&/^[\d-]/.test(a[1])||q.isFunction(a[1])||v.RegEx.isHex.test(a[1])?f=a[1]:(q.isString(a[1])&&!v.RegEx.isHex.test(a[1])||q.isArray(a[1]))&&(e=b?a[1]:h(a[1],j.duration),a[2]!==d&&(f=a[2]))):c=a,e=e||j.easing,q.isFunction(c)&&(c=c.call(g,z,y)),q.isFunction(f)&&(f=f.call(g,z,y)),[c||0,e,f]}function k(a,b){var c,d;return d=(b||0).toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,""}),c||(c=v.Values.getUnitType(a)),[d,c]}function l(){var a={parent:g.parentNode,position:v.getPropertyValue(g,"position"),fontSize:v.getPropertyValue(g,"fontSize")},d=a.position===I.lastPosition&&a.parent===I.lastParent,e=a.fontSize===I.lastFontSize&&a.parent===I.lastParent;I.lastParent=a.parent,I.lastPosition=a.position,I.lastFontSize=a.fontSize,null===I.remToPx&&(I.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===I.vwToPx&&(I.vwToPx=parseFloat(b.innerWidth)/100,I.vhToPx=parseFloat(b.innerHeight)/100);var h={overflowX:null,overflowY:null,boxSizing:null,width:null,minWidth:null,maxWidth:null,height:null,minHeight:null,maxHeight:null,paddingLeft:null},i={},j=10;if(i.remToPx=I.remToPx,i.vwToPx=I.vwToPx,i.vhToPx=I.vhToPx,n&&!f(g).isSVG)var k=/^auto$/i.test(g.currentStyle.width),l=/^auto$/i.test(g.currentStyle.height);d&&e||(f(g).isSVG||(h.overflowX=v.getPropertyValue(g,"overflowX"),h.overflowY=v.getPropertyValue(g,"overflowY"),h.boxSizing=v.getPropertyValue(g,"boxSizing"),h.minWidth=v.getPropertyValue(g,"minWidth"),h.maxWidth=v.getPropertyValue(g,"maxWidth")||"none",h.minHeight=v.getPropertyValue(g,"minHeight"),h.maxHeight=v.getPropertyValue(g,"maxHeight")||"none",h.paddingLeft=v.getPropertyValue(g,"paddingLeft")),h.width=v.getPropertyValue(g,"width",null,!0),h.height=v.getPropertyValue(g,"height",null,!0)),d?(i.percentToPxRatioWidth=I.lastPercentToPxWidth,i.percentToPxRatioHeight=I.lastPercentToPxHeight):(f(g).isSVG||(v.setPropertyValue(g,"overflowX","hidden"),v.setPropertyValue(g,"overflowY","hidden"),v.setPropertyValue(g,"boxSizing","content-box"),v.setPropertyValue(g,"minWidth",j+"%"),v.setPropertyValue(g,"maxWidth",j+"%"),v.setPropertyValue(g,"minHeight",j+"%"),v.setPropertyValue(g,"maxHeight",j+"%")),v.setPropertyValue(g,"width",j+"%"),v.setPropertyValue(g,"height",j+"%")),e?i.emToPx=I.lastEmToPx:f(g).isSVG||v.setPropertyValue(g,"paddingLeft",j+"em"),d||(i.percentToPxRatioWidth=I.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(g,"width",null,!0))||1)/j,i.percentToPxRatioHeight=I.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(g,"height",null,!0))||1)/j),e||(i.emToPx=I.lastEmToPx=(parseFloat(v.getPropertyValue(g,"paddingLeft"))||1)/j);for(var m in h)null!==h[m]&&v.setPropertyValue(g,m,h[m]);return f(g).isSVG||(n?(k&&v.setPropertyValue(g,"width","auto"),l&&v.setPropertyValue(g,"height","auto")):(v.setPropertyValue(g,"height","auto"),h.height!==v.getPropertyValue(g,"height",null,!0)&&v.setPropertyValue(g,"height",h.height),v.setPropertyValue(g,"width","auto"),h.width!==v.getPropertyValue(g,"width",null,!0)&&v.setPropertyValue(g,"width",h.width))),s.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),g),i}if(j.begin&&0===z)try{j.begin.call(t,t)}catch(o){setTimeout(function(){throw o},1)}if("scroll"===D){var p,x,A,B=/^x$/i.test(j.axis)?"Left":"Top",E=parseFloat(j.offset)||0;j.container?j.container.jquery||q.isNode(j.container)?(j.container=j.container[0]||j.container,p=j.container["scroll"+B],A=p+r(g).position()[B.toLowerCase()]+E):j.container=null:(p=s.State.scrollAnchor[s.State["scrollProperty"+B]],x=s.State.scrollAnchor[s.State["scrollProperty"+("Left"===B?"Top":"Left")]],A=r(g).offset()[B.toLowerCase()]+E),m={scroll:{rootPropertyValue:!1,startValue:p,currentValue:p,endValue:A,unitType:"",easing:j.easing,scrollData:{container:j.container,direction:B,alternateValue:x}},element:g},s.debug&&console.log("tweensContainer (scroll): ",m.scroll,g)}else if("reverse"===D){if(!f(g).tweensContainer)return void r.dequeue(g,j.queue);"none"===f(g).opts.display&&(f(g).opts.display="block"),"hidden"===f(g).opts.visibility&&(f(g).opts.visibility="visible"),f(g).opts.loop=!1,f(g).opts.begin=null,f(g).opts.complete=null,w.easing||delete j.easing,w.duration||delete j.duration,j=r.extend({},f(g).opts,j);var F=r.extend(!0,{},f(g).tweensContainer);for(var G in F)if("element"!==G){var H=F[G].startValue;F[G].startValue=F[G].currentValue=F[G].endValue,F[G].endValue=H,r.isEmptyObject(w)||(F[G].easing=j.easing),s.debug&&console.log("reverse tweensContainer ("+G+"): "+JSON.stringify(F[G]),g)}m=F}else if("start"===D){var F;f(g).tweensContainer&&f(g).isAnimating===!0&&(F=f(g).tweensContainer),r.each(u,function(b,c){var e=a(c,!0),f=e[0],g=e[1],h=e[2];if(RegExp(v.Lists.colors.join("|")).test(b)&&v.RegEx.isHex.test(f)){for(var i=["Red","Green","Blue"],j=v.Values.hexToRgb(f),k=h?v.Values.hexToRgb(h):d,l=0;l<i.length;l++)u[b+i[l]]=[j[l],g,k?k[l]:k];delete u[b]}});for(var K in u){var L=a(u[K]),M=L[0],N=L[1],O=L[2];K=v.Names.camelCase(K);var P=v.Hooks.getRoot(K),Q=!1;if(f(g).isSVG||v.Names.prefixCheck(P)[1]!==!1||v.Normalizations.registered[P]!==d){(j.display&&"none"!==j.display||j.visibility&&"hidden"!==j.visibility)&&/opacity|filter/.test(K)&&!O&&0!==M&&(O=0),j._cacheValues&&F&&F[K]?(O===d&&(O=F[K].endValue+F[K].unitType),Q=f(g).rootPropertyValueCache[P]):v.Hooks.registered[K]?O===d?(Q=v.getPropertyValue(g,P),O=v.getPropertyValue(g,K,Q)):Q=v.Hooks.templates[P][1]:O===d&&(O=v.getPropertyValue(g,K));var R,S,T,U=!1;R=k(K,O),O=R[0],T=R[1],R=k(K,M),M=R[0].replace(/^([+-\/*])=/,function(a,b){return U=b,""}),S=R[1],O=parseFloat(O)||0,M=parseFloat(M)||0;var V;if("%"===S&&(/^(fontSize|lineHeight)$/.test(K)?(M/=100,S="em"):/^scale/.test(K)?(M/=100,S=""):/(Red|Green|Blue)$/i.test(K)&&(M=M/100*255,S="")),/[\/*]/.test(U))S=T;else if(T!==S&&0!==O)if(0===M)S=T;else{V=V||l();var W=/margin|padding|left|right|width|text|word|letter/i.test(K)||/X$/.test(K)?"x":"y";switch(T){case"%":O*="x"===W?V.percentToPxRatioWidth:V.percentToPxRatioHeight;break;case"px":break;default:O*=V[T+"ToPx"]}switch(S){case"%":O*=1/("x"===W?V.percentToPxRatioWidth:V.percentToPxRatioHeight);break;case"px":break;default:O*=1/V[S+"ToPx"]}}switch(U){case"+":M=O+M;break;case"-":M=O-M;break;case"*":M=O*M;break;case"/":M=O/M}m[K]={rootPropertyValue:Q,startValue:O,currentValue:O,endValue:M,unitType:S,easing:N},s.debug&&console.log("tweensContainer ("+K+"): "+JSON.stringify(m[K]),g)}else s.debug&&console.log("Skipping ["+P+"] due to a lack of browser support.")}m.element=g}m.element&&(v.Values.addClass(g,"velocity-animating"),J.push(m),f(g).tweensContainer=m,f(g).opts=j,f(g).isAnimating=!0,z===y-1?(s.State.calls.length>1e4&&(s.State.calls=e(s.State.calls)),s.State.calls.push([J,t,j,null,C.resolver]),s.State.isTicking===!1&&(s.State.isTicking=!0,i())):z++)}var g=this,j=r.extend({},s.defaults,w),m={};if(f(g)===d&&r.data(g,k,{isSVG:q.isSVG(g),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}}),parseFloat(j.delay)&&j.queue!==!1&&r.queue(g,j.queue,function(a){s.velocityQueueEntryFlag=!0,f(g).delayTimer={setTimeout:setTimeout(a,parseFloat(j.delay)),next:a}}),s.mock===!0)j.duration=1;else switch(j.duration.toString().toLowerCase()){case"fast":j.duration=200;break;case"normal":j.duration=l;break;case"slow":j.duration=600;break;default:j.duration=parseFloat(j.duration)||1}j.easing=h(j.easing,j.duration),j.begin&&!q.isFunction(j.begin)&&(j.begin=null),j.progress&&!q.isFunction(j.progress)&&(j.progress=null),j.complete&&!q.isFunction(j.complete)&&(j.complete=null),j.display&&(j.display=j.display.toString().toLowerCase(),"auto"===j.display&&(j.display=s.CSS.Values.getDisplayType(g))),j.visibility&&(j.visibility=j.visibility.toString().toLowerCase()),j.mobileHA=j.mobileHA&&s.State.isMobile&&!s.State.isGingerbread,j.queue===!1?j.delay?setTimeout(a,j.delay):a():r.queue(g,j.queue,function(b,c){return c===!0?(C.promise&&C.resolver(t),!0):(s.velocityQueueEntryFlag=!0,void a(b))}),""!==j.queue&&"fx"!==j.queue||"inprogress"===r.queue(g)[0]||r.dequeue(g)}var m,o,p,t,u,w,x=arguments[0]&&(r.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||q.isString(arguments[0].properties));if(q.isWrapped(this)?(m=!1,p=0,t=this,o=this):(m=!0,p=1,t=x?arguments[0].elements:arguments[0]),t=q.isWrapped(t)?[].slice.call(t):t){x?(u=arguments[0].properties,w=arguments[0].options):(u=arguments[p],w=arguments[p+1]);var y=q.isArray(t)||q.isNodeList(t)?t.length:1,z=0;if("stop"!==u&&!r.isPlainObject(w)){var A=p+1;w={};for(var B=A;B<arguments.length;B++)!q.isArray(arguments[B])&&/^\d/.test(arguments[B])?w.duration=parseFloat(arguments[B]):q.isString(arguments[B])||q.isArray(arguments[B])?w.easing=arguments[B]:q.isFunction(arguments[B])&&(w.complete=arguments[B])}var C={promise:null,resolver:null,rejecter:null};m&&s.Promise&&(C.promise=new s.Promise(function(a,b){C.resolver=a,C.rejecter=b}));var D;switch(u){case"scroll":D="scroll";break;case"reverse":D="reverse";break;case"stop":r.each(q.isNode(t)?[t]:t,function(a,b){f(b)&&f(b).delayTimer&&(clearTimeout(f(b).delayTimer.setTimeout),f(b).delayTimer.next&&f(b).delayTimer.next(),delete f(b).delayTimer)});var E=[];return r.each(s.State.calls,function(a,b){b!==!1&&r.each(q.isNode(b[1])?[b[1]]:b[1],function(b,c){r.each(q.isNode(t)?[t]:t,function(b,d){if(d===c){if(f(d)&&r.each(f(d).tweensContainer,function(a,b){b.endValue=b.currentValue}),w===!0||q.isString(w)){var e=q.isString(w)?w:"";r.each(r.queue(d,e),function(a,b){q.isFunction(b)&&b(null,!0)}),r.queue(d,e,[])}E.push(a)}})})}),r.each(E,function(a,b){j(b,!0)}),C.promise&&C.resolver(t),a();default:if(!r.isPlainObject(u)||r.isEmptyObject(u)){if(q.isString(u)&&s.Sequences[u]){var F=w.duration,G=w.delay||0;return w.backwards===!0&&(t=(t.jquery?[].slice.call(t):t).reverse()),r.each(t,function(a,b){parseFloat(w.stagger)?w.delay=G+parseFloat(w.stagger)*a:q.isFunction(w.stagger)&&(w.delay=G+w.stagger.call(b,a,y)),w.drag&&(w.duration=parseFloat(F)||(/^(callout|transition)/.test(u)?1e3:l),w.duration=Math.max(w.duration*(w.backwards?1-a/y:(a+1)/y),.75*w.duration,200)),s.Sequences[u].call(b,b,w||{},a,y,t,C.promise?C:d)}),a()}var H="Velocity: First argument ("+u+") was not a property map, a known action, or a registered sequence. Aborting.";return C.promise?C.rejecter(new Error(H)):console.log(H),a()}D="start"}var I={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},J=[];r.each(q.isNode(t)?[t]:t,function(a,b){q.isNode(b)&&g.call(b)});var K,L=r.extend({},s.defaults,w);if(L.loop=parseInt(L.loop),K=2*L.loop-1,L.loop)for(var M=0;K>M;M++){var N={delay:L.delay};L.complete&&M===K-1&&(N.complete=L.complete),s.animate(t,"reverse",N)}return a()}};var w=b.jQuery||b.Zepto;w&&(w.fn.velocity=s.animate,w.fn.velocity.defaults=s.defaults),"undefined"!=typeof define&&define.amd?define(function(){return s}):"undefined"!=typeof module&&module.exports&&(module.exports=s),r.each(["Down","Up"],function(a,b){s.Sequences["slide"+b]=function(a,c){var d=r.extend({},c),e={height:null,marginTop:null,marginBottom:null,paddingTop:null,paddingBottom:null,overflow:null,overflowX:null,overflowY:null},f=d.begin,g=d.complete,h=!1;null!==d.display&&(d.display="Down"===b?d.display||"auto":d.display||"none"),d.begin=function(){function c(){e.height=parseFloat(s.CSS.getPropertyValue(a,"height")),a.style.height="auto",parseFloat(s.CSS.getPropertyValue(a,"height"))===e.height&&(h=!0),s.CSS.setPropertyValue(a,"height",e.height+"px")}if("Down"===b){e.overflow=[s.CSS.getPropertyValue(a,"overflow"),0],e.overflowX=[s.CSS.getPropertyValue(a,"overflowX"),0],e.overflowY=[s.CSS.getPropertyValue(a,"overflowY"),0],a.style.overflow="hidden",a.style.overflowX="visible",a.style.overflowY="hidden",c();for(var d in e)if(!/^overflow/.test(d)){var g=s.CSS.getPropertyValue(a,d);"height"===d&&(g=parseFloat(g)),e[d]=[g,0]}}else{c();for(var d in e){var g=s.CSS.getPropertyValue(a,d);"height"===d&&(g=parseFloat(g)),e[d]=[0,g]}a.style.overflow="hidden",a.style.overflowX="visible",a.style.overflowY="hidden"}f&&f.call(a,a)},d.complete=function(a){var c="Down"===b?0:1;h===!0?e.height[c]="auto":e.height[c]+="px";for(var d in e)a.style[d]=e[d][c];g&&g.call(a,a)},s.animate(a,e,d)}}),r.each(["In","Out"],function(a,b){s.Sequences["fade"+b]=function(a,c,d,e){var f=r.extend({},c),g={opacity:"In"===b?1:0};d!==e-1&&(f.complete=f.begin=null),null!==f.display&&(f.display=f.display||("In"===b?"auto":"none")),s.animate(this,g,f)}})}(window.jQuery||window.Zepto||window,window,document);
