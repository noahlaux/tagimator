/**
 * jQuery tagimator
 *
 * @version 1.0
 *
 * @author Noah Laux (noahlaux@gmail.com)
 *
 * @dependency
 *  jquery
 *  jquery.effects.core.js
 */
(function(d){var a={init:function(e,g){a.settings=d.extend({speed:1E3,fx:"fade",easing:"easeInOutCubic",method:"show"},e);e&&(a.onBeforeStep=e.onBeforeStep?e.onBeforeStep:null,a.onAfterStep=e.onAfterStep?e.onAfterStep:null,a.onFinish=e.onFinish?e.onFinish:null);a.fxStack={};var c=this,b={};return this.each(function(){b=g?d(c).find(".fxApplied"):d(c.selector+"[data-fx]").length===0?d(c).find("[data-fx]").not(".fxApplied"):d(c.selector+"[data-fx]").not(".fxApplied");g||d(b).not(".fxApplied").hide();
a.createFxStack(b)})},createFxStack:function(e){e.each(function(e,c){var b=d(c);a.fxStack[b.attr("data-fx-step")]||(a.fxStack[b.attr("data-fx-step")]=[]);a.fxStack[b.attr("data-fx-step")].push({el:b,fx:b.attr("data-fx"),speed:b.attr("data-fx-speed")?b.attr("data-fx-speed"):a.settings.speed,options:{direction:b.attr("data-fx-direction"),easing:b.attr("data-fx-easing")?b.attr("data-fx-easing"):a.settings.easing}})})},reverseStack:function(a){var d={},c,b=[];for(c in a)a.hasOwnProperty(c)&&b.push(c);
b.reverse();for(c=0;c<b.length;c++)d[b[c]]=a[c+1];return d},show:function(){a.init.apply(this,arguments);a.parseSteps("show")},hide:function(){a.init.apply(this,[this,!0]);a.fxStack=a.reverseStack(a.fxStack);a.parseSteps("hide")},transitions:function(a,g){var c=d.Deferred();d.each(a,function(b,f){if(!d.effects[f.fx])return c.reject('Effect "'+f.fx+'" does not exits. Did you include the jqeury.effect.'+f.fx+".js ? ",f),!1;f.el[g](f.fx,f.options,parseInt(f.speed,10),function(){"show"===g?f.el.addClass("fxApplied"):
f.el.removeClass("fxApplied");b==a.length-1&&c.resolve(f)})});return c.promise()},parseSteps:function(e){var g=d({});d.each(a.fxStack,function(c,b){g.queue("transitions",function(f){if(a.onBeforeStep)a.onBeforeStep(c,b);d.when(a.transitions(b,e)).done(function(){if(a.onAfterStep)a.onAfterStep(c,b);f()}).fail(function(a,b){console.log(a,b)})})});g.queue("transitions",function(){if(a.onFinish)a.onFinish()});g.dequeue("transitions")},reset:function(){d(this.children()).removeClass("fxApplied")}};d.fn.tagimator=
function(e){if(a[e])return a[e].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof e||!e)return a.init.apply(this,arguments);d.error("Method "+e+" does not exist on jQuery.tagimator")}})(jQuery);