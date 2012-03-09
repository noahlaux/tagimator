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
(function(e){var a={init:function(d,g){a.settings=e.extend({speed:1E3,fx:"fade",easing:"easeInOutCubic",method:"show"},d);d&&(a.onBeforeStep=d.onBeforeStep?d.onBeforeStep:null,a.onAfterStep=d.onAfterStep?d.onAfterStep:null,a.onFinish=d.onFinish?d.onFinish:null);a.fxStack={};var c=this,b={};return this.each(function(){b=g?e(c).find(".fxApplied"):e(c.selector+"[data-fx]").length===0?e(c).find("[data-fx]").not(".fxApplied"):e(c.selector+"[data-fx]").not(".fxApplied");g||e(b).not(".fxApplied").hide();
a.createFxStack(b)})},show:function(){a.init.apply(this,arguments);a.parseSteps("show")},hide:function(){a.init.apply(this,[this,!0]);a.fxStack=a.reverseStack(a.fxStack);a.parseSteps("hide")},reset:function(){e(this.children()).removeClass("fxApplied")},parseSteps:function(d){var g=e({});e.each(a.fxStack,function(c,b){g.queue("transitions",function(f){if(a.onBeforeStep)a.onBeforeStep(c,b);e.when(a.transitions(b,d)).done(function(){if(a.onAfterStep)a.onAfterStep(c,b);f()}).fail(function(a,d){console.log(a,
d)})})});g.queue("transitions",function(){if(a.onFinish)a.onFinish()});g.dequeue("transitions")},transitions:function(a,g){var c=e.Deferred();e.each(a,function(b,f){if(!e.effects[f.fx])return c.reject('Effect "'+f.fx+'" does not exits. Did you include the jqeury.effect.'+f.fx+".js ? ",f),!1;f.el[g](f.fx,f.options,parseInt(f.speed,10),function(){"show"===g?f.el.addClass("fxApplied"):f.el.removeClass("fxApplied");b==a.length-1&&c.resolve(f)})});return c.promise()},createFxStack:function(d){d.each(function(d,
c){var b=e(c);a.fxStack[b.attr("data-fx-step")]||(a.fxStack[b.attr("data-fx-step")]=[]);a.fxStack[b.attr("data-fx-step")].push({el:b,fx:b.attr("data-fx"),speed:b.attr("data-fx-speed")?b.attr("data-fx-speed"):a.settings.speed,options:{direction:b.attr("data-fx-direction"),easing:b.attr("data-fx-easing")?b.attr("data-fx-easing"):a.settings.easing}})})},reverseStack:function(a){var e={},c,b=[];for(c in a)a.hasOwnProperty(c)&&b.push(c);b.reverse();var f=b.length;for(c=0;c<f;c++)e[c+1]=a[b[c]];return e}};
e.fn.tagimator=function(d){if(a[d])return a[d].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof d||!d)return a.init.apply(this,arguments);e.error("Method "+d+" does not exist on jQuery.tagimator")}})(jQuery);