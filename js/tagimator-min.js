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
(function($,undefined){var methods={init:function(options,doHide){methods.settings=$.extend({"speed":1E3,"fx":"fade","easing":"easeInOutCubic","method":"show"},options);if(options){methods.onBeforeStep=options.onBeforeStep?options.onBeforeStep:null;methods.onAfterStep=options.onAfterStep?options.onAfterStep:null;methods.onFinish=options.onFinish?options.onFinish:null}methods.fxStack={};var self=this,items={};return this.each(function(){if(doHide)items=$(self).find(".fxApplied");else items=$(self.selector+
"[data-fx]").length===0?$(self).find("[data-fx]").not(".fxApplied"):$(self.selector+"[data-fx]").not(".fxApplied");if(!doHide)$(items).not(".fxApplied").hide();methods.createFxStack(items)})},createFxStack:function(items){items.each(function(i,item){var el=$(item);if(!methods.fxStack[el.attr("data-fx-step")])methods.fxStack[el.attr("data-fx-step")]=[];methods.fxStack[el.attr("data-fx-step")].push({el:el,fx:el.attr("data-fx"),speed:el.attr("data-fx-speed")?el.attr("data-fx-speed"):methods.settings.speed,
options:{direction:el.attr("data-fx-direction"),easing:el.attr("data-fx-easing")?el.attr("data-fx-easing"):methods.settings.easing}})})},reverseStack:function(items){var sorted={},key,a=[];for(key in items)if(items.hasOwnProperty(key))a.push(key);a.reverse();for(key=0;key<a.length;key++)sorted[a[key]]=items[key+1];return sorted},show:function(){methods.init.apply(this,arguments);methods.parseSteps("show")},hide:function(){methods.init.apply(this,[this,true]);methods.fxStack=methods.reverseStack(methods.fxStack);
methods.parseSteps("hide")},transitions:function(items,method){var d=$.Deferred();$.each(items,function(i,item){if(!$.effects[item.fx]){d.reject('Effect "'+item.fx+'" does not exits. Did you include the jqeury.effect.'+item.fx+".js ? ",item);return false}item.el[method](item.fx,item.options,parseInt(item.speed,10),function(){if(method==="show")item.el.addClass("fxApplied");else item.el.removeClass("fxApplied");if(i==items.length-1)d.resolve(item)})});return d.promise()},parseSteps:function(method){var fxQ=
$({});$.each(methods.fxStack,function(i,stack){fxQ.queue("transitions",function(next){if(methods.onBeforeStep)methods.onBeforeStep(i,stack);$.when(methods.transitions(stack,method)).done(function(){if(methods.onAfterStep)methods.onAfterStep(i,stack);next()}).fail(function(e,item){console.log(e,item)})})});fxQ.queue("transitions",function(){if(methods.onFinish)methods.onFinish()});fxQ.dequeue("transitions")},reset:function(){$(this.children()).removeClass("fxApplied")}};$.fn.tagimator=function(method){if(methods[method])return methods[method].apply(this,
Array.prototype.slice.call(arguments,1));else if(typeof method==="object"||!method)return methods.init.apply(this,arguments);else $.error("Method "+method+" does not exist on jQuery.tagimator")}})(jQuery);