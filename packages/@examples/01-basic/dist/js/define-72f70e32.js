import{o as w,p as S,S as b,h as v,i as x,u as $,c as P,q as C,r as I,_,l as c}from"./index.esm.js";import{_ as B}from"./querySelectorUp-ecdaf0f7.js";function T(d,s,t={}){t=Object.assign({threshold:100},t);let e=0,i=0,o,l;d.addEventListener("touchstart",function(r){e=r.changedTouches[0].screenX,i=r.changedTouches[0].screenY},!1),d.addEventListener("touchend",function(r){o=r.changedTouches[0].screenX,l=r.changedTouches[0].screenY,r={distanceX:Math.abs(o-e),distanceY:Math.abs(l-i)},o+t.threshold<e&&(r.left=!0),o-t.threshold>e&&(r.right=!0),l+t.threshold<i&&(r.up=!0),l-t.threshold>i&&(r.down=!0),(r.left||r.right||r.down||r.up)&&s(r)},!1)}function E(){return window.pageYOffset||document.scrollTop||document.body.scrollTop}function L(){return window.pageXOffset||document.scrollLeft||document.body.scrollLeft}function k(i,e){e=Object.assign({relativeTo:"visible"},e??{}),e.relativeTo==="visible"&&(e.relativeTo=w(i,a=>window.getComputedStyle(a).overflow==="hidden"&&a));let t;t=e!=null&&e.relativeTo&&e.relativeTo instanceof HTMLElement?e==null?void 0:e.relativeTo.getBoundingClientRect():{top:E(),left:L(),width:Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),height:Math.max(document.documentElement.clientHeight||0,window.innerHeight||0)};var e=i.getBoundingClientRect(),i=e.left-t.left,o=e.top-t.top;let l,r;e.left+e.width<t.left||e.left>t.left+t.width?l=0:e.left>=t.left&&e.left+e.width<=t.left+t.width?l=100:e.left<t.left&&e.left+e.width>t.left+t.width?l=100/e.width*t.width:e.left<t.left&&e.left+e.width<=t.left+t.width?l=100/e.width*(e.left+e.width-t.left):e.left<t.left+t.width&&e.left+e.width>t.left+t.width&&(l=100/e.width*(e.width-(e.left+e.width-(t.left+t.width)))),e.left+e.height<t.top||e.top>t.top+t.height?r=0:e.top>=t.top&&e.top+e.height<=t.top+t.height?r=100:e.top<t.top&&e.top+e.height>t.top+t.height?r=100/e.height*t.height:e.top<t.top&&e.top+e.height<=t.top+t.height?r=100/e.height*(e.top+e.height-t.top):e.top<t.top+t.height&&e.top+e.height>t.top+t.height&&(r=100/e.height*(e.height-(e.top+e.height-(t.top+t.height))));var h=e.width/100*l,n=e.height/100*r;return{percentage:0<l&&0<r?.5*(l+r):0,percentageX:0<r?l:0,percentageY:0<l?r:0,centerOffsetX:-1*(.5*t.width-i-.5*e.width),centerOffsetY:-1*(.5*t.height-o-.5*e.height),width:0<l&&0<r?h:0,height:0<r&&0<l?n:0,left:e.left,relLeft:i,top:e.top,relTop:o}}function z(d){return d*(2-d)}function M(d){return d<.5?8*d*d*d*d:1-8*--d*d*d*d}function O(d,s,t={}){let e=!1,i;return new S(({resolve:o,on:l})=>{t=Object.assign({interval:40,easing:M,from:0,to:100,onEnd:void 0},t);const r=Date.now();l("cancel",()=>{e=!0,cancelAnimationFrame(i)}),function h(){var n,a;e||(n=100/d*(Date.now()-r),a=100*t.easing(n/100),s(a),n<100?e||(i=requestAnimationFrame(h)):((n=t.onEnd)!=null&&n.call(t),o(a)))}()})}const R=`.s-slider{display:block;font-size:calc(1rem * var(--s-scale, 1) * var(--s-scale-global, 1));--s-slider-space: 20px}.s-slider>.s-slider_root,.s-slider>.s-slider_root>.s-slider_slides-wrapper{position:relative}.s-slider>.s-slider_root,.s-slider>.s-slider_root>.s-slider_slides-wrapper,.s-slider>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides{height:100%;width:100%}.s-slider>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_slide{position:relative}.s-slider[direction=vertical][pad]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_pad-start{height:var(--s-slider-pad-start, 0)}.s-slider[direction=vertical][pad]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_pad-end{height:var(--s-slider-pad-end, 0)}.s-slider[direction=horizontal][pad]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_pad-start{width:var(--s-slider-pad-start, 0)}.s-slider[direction=horizontal][pad]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_pad-end{width:var(--s-slider-pad-end, 0)}.s-slider_media{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.s-slider_body{position:absolute;bottom:0;left:0;width:100%;background:hsla(calc(var(--s-color-main-h, 0) + var(--s-color-main-background-spin ,0)),calc((var(--s-color-main-s, 0) + var(--s-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-color-main-l, 0) + var(--s-color-main-background-lightness-offset, 0)) * 1%),.3);padding:calc(calc(var(--s-padding-default, 1rem) * var(--s-scale, 1) * var(--s-scale-global, 1)) * 3.5);display:flex;flex-direction:column;gap:calc(var(--s-margin-default, 1rem) * 1.4)}.s-slider_title{display:block;font-family:var(--s-font-family-title-font-family, "Roboto");font-weight:var(--s-font-family-title-font-weight, 500);font-size:calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-80, 4.5) * var(--s-scale, 1) * var(--s-scale-global, 1)));line-height:1.3;max-width:55ch}@media (max-width: 639px){.s-slider_title{font-size:calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-70, 3.5) * var(--s-scale, 1) * var(--s-scale-global, 1)))}}.s-slider_title{color:hsla(calc(var(--s-color-accent-h, 0) + var(--s-color-accent-spin ,0)),calc((var(--s-color-accent-s, 0)) * 1%),calc((var(--s-color-accent-l, 0)) * 1%),var(--s-color-accent-a, 1))}.s-slider_intro{display:block;font-family:var(--s-font-family-default-font-family, "Roboto");font-weight:var(--s-font-family-default-font-weight, 400);font-size:calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-40, 1.4) * var(--s-scale, 1) * var(--s-scale-global, 1)));line-height:1.6;max-width:55ch}@media (max-width: 639px){.s-slider_intro{font-size:calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-40, 1.4) * var(--s-scale, 1) * var(--s-scale-global, 1)))}}.s-slider_intro{max-width:100%}.s-slider_text{display:block;font-family:var(--s-font-family-default-font-family, "Roboto");font-weight:var(--s-font-family-default-font-weight, 400);font-size:calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-30, 1.1) * var(--s-scale, 1) * var(--s-scale-global, 1)));line-height:1.8;max-width:55ch;color:hsla(calc(var(--s-color-main-h, 0) + var(--s-color-main-text-spin ,0)),calc((var(--s-color-main-s, 0) + var(--s-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-color-main-l, 0) + var(--s-color-main-text-lightness-offset, 0)) * 1%),.7);max-width:100%}.s-slider[behavior=scroll]>.s-slider_root>.s-slider_slides-wrapper{overflow:auto;overflow-y:hidden;scroll-snap-type:x mandatory;-ms-overflow-style:none;scrollbar-width:none}.s-slider[behavior=scroll]>.s-slider_root>.s-slider_slides-wrapper::-webkit-scrollbar{display:none}.s-slider[behavior=scroll]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_slide{scroll-snap-align:center}.s-slider[behavior=scroll][direction=vertical]>.s-slider_root>.s-slider_slides-wrapper{overflow-x:hidden;overflow-y:auto;scroll-snap-type:y mandatory}.s-slider[lnf^=default]{position:relative;--s-slider-space: 20px}.s-slider[lnf^=default]:not([class*="s-ratio"]){aspect-ratio:16/9}.s-slider[lnf^=default]:not([mounted]){opacity:0}.s-slider[lnf^=default] .s-slider_ui{position:absolute;top:50%;left:50%;width:100%;height:100%;transform:translate(-50%,-50%);pointer-events:none;z-index:10}.s-slider[lnf^=default] .s-slider_ui *{pointer-events:all}.s-slider[lnf^=default][pad]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_pad{flex-shrink:0;flex-grow:0}.s-slider[lnf^=default]>.s-slider_root{position:relative}.s-slider[lnf^=default]>.s-slider_root>.s-slider_slides-wrapper{width:100%;height:100%}.s-slider[lnf^=default]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides{display:inline-flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;height:100%}.s-slider[lnf^=default]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_slide{display:block;flex-shrink:0;flex-grow:0;width:100%;height:100%;scroll-snap-align:center}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_nav{position:absolute;top:calc(100% + var(--s-slider-space));left:50%;transform:translate(-50%);display:flex;gap:calc(var(--s-slider-space) * .5)}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_nav>*{border-radius:50%;display:block;width:.5em;height:.5em;background:currentColor;opacity:.2;cursor:pointer}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_nav>*:hover{opacity:.5}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_nav>*.active{opacity:1}.s-slider[lnf^=default][direction=vertical]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides{display:block;width:100%;height:auto}.s-slider[lnf^=default][direction=vertical]>.s-slider_root>.s-slider_slides-wrapper>.s-slider_slides>.s-slider_slide{display:block;width:100%!important}.s-slider[lnf^=default][lnf$=-contain] .s-slider_root>.s-slider_ui>.s-slider_nav{top:auto;bottom:calc(var(--s-slider-space) - .5em);transform:translate(-50%,-100%)}.s-slider[lnf^=default][direction=vertical] .s-slider_root>.s-slider_ui>.s-slider_nav{top:50%;left:calc(100% + var(--s-slider-space));transform:translateY(-50%);flex-direction:column}.s-slider[lnf^=default][lnf$=-contain][direction=vertical] .s-slider_root>.s-slider_ui>.s-slider_nav{bottom:auto;left:auto;right:calc(var(--s-slider-space));transform:translateY(-50%)}.s-slider[lnf^=default][lnf$=-tight][direction=horizontal][controls]{padding-left:calc(var(--s-slider-space) + 1em);padding-right:calc(var(--s-slider-space) + 1em)}.s-slider[lnf^=default][lnf$=-tight][direction=horizontal][nav]{padding-bottom:calc(var(--s-slider-space) + 1em)}.s-slider[lnf^=default][lnf$=-tight][direction=vertical][controls]{padding-top:calc(var(--s-slider-space) + 1em);padding-bottom:calc(var(--s-slider-space) + 1em)}.s-slider[lnf^=default][lnf$=-tight][direction=vertical][nav]{padding-right:calc(var(--s-slider-space) + 1em)}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_progress{position:absolute;bottom:var(--s-slider-space);left:var(--s-slider-space);right:var(--s-slider-space);height:.5em}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_progress:before{content:"";display:block;position:absolute;top:0;left:0;width:100%;height:100%;background:currentColor;opacity:.2}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_progress>.s-slider_progress-bar{position:absolute;top:0;left:0;height:100%;width:calc(100% / (var(--s-slider-total-pages)) * (var(--s-slider-page) + 1));background:currentColor}.s-slider[lnf^=default][lnf$=-contain] .s-slider_root>.s-slider_ui>.s-slider_progress{bottom:calc(var(--s-slider-space) * 2)}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next,.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous{width:1em;height:1em;position:absolute;top:50%;transform:translateY(-50%);cursor:pointer;opacity:.2;pointer-events:none;color:currentColor}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next.active,.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous.active{pointer-events:all;opacity:1}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous{right:calc(100% + var(--s-slider-space))}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next{left:calc(100% + var(--s-slider-space))}.s-slider[lnf^=default][lnf$=-contight]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous,.s-slider[lnf^=default][lnf$=-contain]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous{left:var(--s-slider-space);transform:translateY(-50%)}.s-slider[lnf^=default][lnf$=-contight]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next,.s-slider[lnf^=default][lnf$=-contain]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next{left:auto;right:var(--s-slider-space);transform:translateY(-50%)}.s-slider[lnf^=default][direction=vertical]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next{left:50%;top:calc(100% + var(--s-slider-space));transform:translate(-50%) rotate(90deg)}.s-slider[lnf^=default][direction=vertical]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous{left:50%;bottom:calc(100% + var(--s-slider-space));top:auto;transform:translate(-50%) rotate(90deg)}.s-slider[lnf^=default][direction=vertical][lnf$=-contight]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous,.s-slider[lnf^=default][direction=vertical][lnf$=-contain]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous{top:calc(var(--s-slider-space))}.s-slider[lnf^=default][direction=vertical][lnf$=-contight]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next,.s-slider[lnf^=default][direction=vertical][lnf$=-contain]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next{top:auto;bottom:calc(var(--s-slider-space))}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next-arrow,.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous-arrow{width:1em;height:1em;position:absolute;top:0;left:0}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next-arrow:before,.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next-arrow:after,.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous-arrow:before,.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous-arrow:after{display:block;content:"";position:absolute;top:calc(50% - .1em);left:0;background:currentColor;width:100%;height:.2em}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next-arrow:before,.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous-arrow:before{transform-origin:0 0;transform:rotate(45deg)}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next-arrow:after,.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-previous-arrow:after{transform-origin:0 100%;transform:rotate(-45deg)}.s-slider[lnf^=default]>.s-slider_root>.s-slider_ui>.s-slider_controls .s-slider_controls-next-arrow{transform:rotate(180deg)}
`;class y extends b{static get _definition(){return{direction:{description:"Specify the slider direction. Can be `horizontal` or `vertical`",values:["horizontal","vertical"],type:"String",physical:!0,default:"horizontal"},behaviors:{description:"Specify the available behaviors for the slider",type:"Object",default:{}},behavior:{description:'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',values:["none","scroll","transform"],type:"String",default:"scroll",physical:!0},pad:{type:"Boolean",description:"Specify if you want to pad the slides if for example the first slide does not take the while width of the slider, a padding-(block|inline)-start will be applied to center this first slide. Same for the last one",default:!1},nextIconClass:{description:"Specify the class of the next icon",type:"String"},previousIconClass:{description:"Specify the class of the previous icon",type:"String"},uiContainer:{description:'Specify if you want an "s-container:..." class applied on the .s-slider_ui element',type:"String|Boolean"},controls:{description:"Specify if you want to display the controls or not. Controls are the previous and next icons",type:"Boolean",default:!1},nav:{description:"Specify if you want to display the nav or not. Nav are the dots",type:"Boolean",default:!1},swipe:{description:"Specify if you want your slider to support swipe navigation or not",type:"Boolean",default:!1},mousewheel:{description:"Specify if you want to enable the mousewheel event on the slider or not",type:"Boolean",default:!1},clickOnSlide:{description:"Specify if you want to enable the click on the slides to navigate or not",type:"Boolean",default:!1},loop:{description:"Specify if you want to enable the loop behavior or not",type:"Boolean",default:!1},slide:{description:"Specify the active slide id",type:"Number",default:0,physical:!0},slidesByPage:{description:'Specify how many slides you want by page. Pages are what is used to construct the dot nav and will determine how many slides will be passed on "next" and "previous"',type:"Number",default:1},progress:{description:"Specify if you want to display the progress bar or not",type:"Boolean",default:!1},timer:{description:'Specify a timer that will be applied on each slides and go to the next one after the timer is over. For custom timer by slide, specify the `timer="1200"` attribute on the slides you want',type:"Number"},autoplay:{description:"Specify if you want the slider to auto play itself when some timer(s) has been set",type:"Boolean",default:!0},intersectionClasses:{description:'Specify if you want the classes that describe each slide intersection classes like "in-10", "in-20", etc...',type:"Boolean",default:!1},transitionDuration:{description:"Specify the transition duration of the slider in ms",type:"Number",default:500},transitionEasing:{description:"Specify the transition easing of the slider",type:"Function",default:z},transitionHandler:{description:"Specify a function that will take care of transitioning the slider from the current item to the next/previous",type:"Function"}}}}const A={setup(){return new Promise((d,s)=>{var t;let e;(t=this.$slidesWrapper)!=null&&t.addEventListener("scroll",i=>{clearTimeout(e),e=setTimeout(()=>{if(!(1<this.props.slidesByPage)){let n,a=999999999999;for(var[o,l]of this.$slides.entries()){var r=k(l,{relativeTo:this.$slidesWrapper});this.props.direction==="vertical"&&Math.abs(r.centerOffsetY)<=a?(a=Math.abs(r.centerOffsetY),n=l):this.props.direction==="horizontal"&&Math.abs(r.centerOffsetX)<=a&&(a=Math.abs(r.centerOffsetX),n=l)}var h;n&&(h=this.getSlide(n),this.setCurrentSlideByIdx(h.idx))}},200)}),d()})},transition(d,s){return new Promise((t,e)=>{this.$slidesWrapper.style.scrollSnapType="none";const i=this.getPageRect(s),o=this.getPageRect(d),l=this.getBoundingClientRect(),r=this;let h=this.$slidesWrapper.scrollLeft,n=this.$slidesWrapper.scrollTop,a,u,g=0;g=this.props.direction==="vertical"?(a=.5*(l.height-o.height),u=.5*(l.height-i.height),i.y-o.y-u+a):(a=.5*(l.width-o.width),u=.5*(l.width-i.width),i.x-o.x-u+a),O(this.props.transitionDuration,f=>{f=g/100*f,r.props.direction==="vertical"?r.$slidesWrapper.scroll(0,Math.round(n+f)):r.$slidesWrapper.scroll(Math.round(h+f),0)},{easing:r.props.transitionEasing,onEnd(){r.props.direction==="vertical"?r.$slidesWrapper.style.scrollSnapType="y mandatory":r.$slidesWrapper.style.scrollSnapType="x mandatory",t()}})})}};var p=globalThis&&globalThis.__awaiter||function(d,s,t,e){return new(t=t||Promise)(function(i,o){function l(n){try{h(e.next(n))}catch(a){o(a)}}function r(n){try{h(e.throw(n))}catch(a){o(a)}}function h(n){var a;n.done?i(n.value):((a=n.value)instanceof t?a:new t(function(u){u(a)})).then(l,r)}h((e=e.apply(d,s||[])).next())})};class m extends v{static get properties(){return v.propertiesFromInterface({},y)}static get styles(){return x`
            ${$(`
                ${R}
            `)}
        `}static get state(){return{currentPage:0,previousSlideIdx:0,currentSlideIdx:0,playing:!0}}constructor(){super(P({name:"s-slider",interface:y})),this._timer={total:0,current:0,percentage:0},this._bindedBehaviors={}}mount(){return p(this,void 0,void 0,function*(){this.props.behaviors.scroll=A,this.id||this.setAttribute("id","s-slider-"+C()),this.$slides=Array.from(this.querySelectorAll("[s-slider-slide],s-slider-slide")).filter(t=>{var e=B(t,".s-slider");return!(e&&e!==this||(t.classList.add(...this.utils.cls("_slide").split(" ")),0))}),this.props.slide&&this.setCurrentSlide(this.props.slide);let s;window.addEventListener("resize",t=>{clearTimeout(s),s=setTimeout(()=>p(this,void 0,void 0,function*(){yield this.applyPad(),this.goTo(this.getCurrentSlideIdx(),!0)}),200)})})}firstUpdated(){var s,t,e,i;return p(this,void 0,void 0,function*(){if(this.$root=this.querySelector("."+this.utils.uCls("_root")),this.$slidesWrapper=this.querySelector(`.${this.utils.uCls("_slides-wrapper")}:not(s-slider#${this.id} s-slider .${this.utils.uCls("_slides-wrapper")})`),this.$slidesContainer=this.querySelector(`.${this.utils.uCls("_slides")}:not(s-slider#${this.id} s-slider .${this.utils.uCls("_slides")})`),this.props.behavior&&this.props.behavior!=="scroll"&&this.props.behavior!=="transform"){if(typeof this.props.behavior=="string"){let r;for(var[o,l]of Object.entries(this.props.behaviors))if(((s=(s=l.class)==null?void 0:s.id)!=null?s:l.id)===this.props.behavior){r=l;break}if(!r)throw new Error(`The behavior "${this.props.behavior}" is not available`);if(!r.class)throw new Error(`The behavior "${this.props.behavior}" is not valid. You must provide the "<yellow>class</yellow>" property and an optional "<yellow>settings</yellow>" one...`);this.behavior=new r.class((t=r.settings)!=null?t:{})}else if(I(this.props.behavior))this.behavior=new this.props.behavior({});else{if(!(this.props.behavior instanceof __SSliderBehavior))throw new Error("Invalid behavior type, must be a string, an SSliderBehavior extended class or an SSliderBehavior instance");this.behavior=this.props.behavior}(e=(t=this.behavior).firstUpdated)!=null&&e.call(t)}yield(i=(e=this.getBehavior()).setup)==null?void 0:i.call(e),this.applyPad(),this._preventUserScrollForDefaultBehavior(),this.props.intersectionClasses&&this._handleIntersections(),this._handleMousewheel(),this.props.clickOnSlide&&this._handleClickOnSlide(),this.props.swipe&&this._handleSwipe(),this._initAttributesActions(),this.goTo(this.props.slide,!0),this.props.autoplay&&this.props.timer&&this.play()})}applyPad(){return p(this,void 0,void 0,function*(){setTimeout(()=>p(this,void 0,void 0,function*(){this.getBehavior().pad?yield this.getBehavior().pad():yield this._pad()}),20)})}_pad(){var s=this.getBoundingClientRect(),t=this.getFirstPageRect(),e=this.getLastPageRect();let i=0,o=0;o=this.props.direction==="vertical"?(i=.5*(s.height-t.height),.5*(s.height-e.height)):(i=.5*(s.width-t.width),.5*(s.width-e.width)),this.style.setProperty("--s-slider-pad-start",Math.round(i)+"px"),this.style.setProperty("--s-slider-pad-end",Math.round(o)+"px")}_handleSwipe(){T(this.$root,s=>{this.props.direction==="horizontal"?s.left?this.next():s.right&&this.previous():this.props.direction==="vertical"&&(s.top?this.next():s.down&&this.previous())})}_preventUserScrollForDefaultBehavior(){}_handleMousewheel(){this.$slidesWrapper.addEventListener("wheel",s=>{this.props.mousewheel||(this.props.direction==="horizontal"&&0<Math.abs(s.deltaX)||this.props.direction==="vertical"&&0<Math.abs(s.deltaY))&&s.preventDefault()})}_handleClickOnSlide(){this.$slidesContainer.addEventListener("pointerup",s=>{for(var[t,e]of this.$slides.entries())!e.contains(s.target)&&e!==s.target||this.currentSlide===e||(e=this.getSlide(e),this.goTo(e.idx))})}_handleIntersections(){var s;(s=this.$slides)!=null&&s.forEach(t=>{var e={root:this.$root,rootMargin:"0px",threshold:function(){var i=[];for(let l=1;l<=10;l++){var o=l/10;i.push(o)}return i.push(0),i}()};new IntersectionObserver(function(i,o){let l=0;i.forEach(r=>{r.intersectionRatio>l&&(l=r.intersectionRatio)}),[.1,.2,.3,.4,.5,.6,.7,.8,.9,1].forEach((r,h)=>{l>=r?t.classList.add("in-"+100*r):t.classList.remove("in-"+100*r)})},e).observe(t)})}_initAttributesActions(){["next","previous"].forEach(s=>{_(`[s-slider-${s}]:not(s-slider#${this.id} s-slider [s-slider-${s}])`,t=>{t.addEventListener("pointerup",e=>{e.preventDefault(),this[s](!0)})},{scopes:!1,rootNode:this})}),_(`[s-slider-goto]:not(s-slider#${this.id} .s-slider [s-slider-goto])`,s=>{s.addEventListener("pointerup",t=>{var e=(e=parseInt(s.getAttribute("s-slider-goto")))!=null?e:0;this.goTo(e,!0)})},{scopes:!1,rootNode:this})}_dispatch(s,t={}){this.utils.dispatchEvent(s,{detail:t})}isSlideInPage(s,t=this.state.currentPage){return s=this.getSlide(s),s.idx>=t*this.props.slidesByPage&&s.idx<(t+1)*this.props.slidesByPage}isLast(){return this.state.currentSlideIdx>=this.$slides.length-1}isFirst(){return this.state.currentSlideIdx<=0}getCurrentSlideIdx(){return this.state.currentSlideIdx}setCurrentSlideByIdx(s){s!==this.state.currentSlideIdx&&(this.state.previousSlideIdx=this.state.currentSlideIdx,this.props.slide=s,this.state.currentSlideIdx=s,this.state.currentPage=Math.ceil(s/this.props.slidesByPage),this.updateSlidesClasses())}setCurrentSlide(s){return s=this.getSlide(s),this.setCurrentSlideByIdx(s.idx),this}get currentSlideIdx(){return this.getCurrentSlideIdx()}getCurrentSlideElement(){return this.$slides[this.state.currentSlideIdx]}get currentSlideElement(){return this.getCurrentSlideElement()}getNextSlideIdx(){var s=this.state.currentSlideIdx+this.props.slidesByPage;return s>=this.$slides.length-1?this.$slides.length-1:s}get nextSlideIdx(){return this.getNextSlideIdx()}getNextSlideElement(){return this.$slides[this.getNextSlideIdx()]}get nextSlideElement(){return this.getNextSlideElement()}getPreviousSlideIdx(){var s=this.state.currentSlideIdx-this.props.slidesByPage;return s<=0?0:s}get previousSlideIdx(){return this.getPreviousSlideIdx()}getPreviousSlideElement(){return this.$slides[this.getPreviousSlideIdx()]}get previousSlideItem(){return this.$slides[this.getPreviousSlideIdx()]}getSlideIdxById(s){for(let t=0;t<this.$slides.length;t++)if(this.$slides[t].getAttribute("s-slider-slide")===s)return t}getSlideElementByIdx(s){return this.$slides[s]}getCurrentSlide(){return this.getSlide(this.state.currentSlideIdx)}get currentSlide(){return this.getCurrentSlide()}getLastPage(){return Math.ceil(this.$slides.length/this.props.slidesByPage)-1}getFirstPageSlides(){return this.getPageSlides(0)}getLastPageSlides(){return this.getPageSlides(this.getLastPage())}getPageRect(s=this.state.currentPage){let t=s;s instanceof HTMLElement&&(s=this.getSlide(s),t=s.page),s=this.getPageSlides(t);const e={top:-1,left:-1,right:-1,bottom:-1,width:-1,height:-1,x:-1,y:-1};return s.forEach(i=>{i=i.$slide.getBoundingClientRect(),(e.top===-1||i.top<e.top)&&(e.top=i.top),(e.left===-1||i.left<e.left)&&(e.left=i.left),(e.right===-1||i.right>e.right)&&(e.right=i.right),(e.bottom===-1||i.bottom>e.bottom)&&(e.bottom=i.bottom)}),e.width=e.right-e.left,e.height=e.bottom-e.top,e.x=e.left,e.y=e.top,e}getFirstPageRect(){return this.getPageRect(0)}getLastPageRect(){return this.getPageRect(this.getLastPage())}getPageSlides(s){var t=[];for(let e=s*this.props.slidesByPage;e<(s+1)*this.props.slidesByPage;e++)e<this.$slides.length&&t.push(this.getSlide(e));return t}getSlide(s){var t;let e,i,o,l;if(s instanceof HTMLElement){const r=s.getAttribute("s-slider-slide");return r?this.getSlide(r):this.getSlide(Array.from(this.$slides).indexOf(s))}if(typeof s=="number"?(o=s,e=this.getSlideElementByIdx(o),i=e.getAttribute("s-slider-slide"),(l=e._sSliderComponentTimer)||(l={total:(t=e.getAttribute("timer"))!=null?t:this.props.timer,current:0,percentage:0},e._sSliderComponentTimer=l)):typeof s!="string"||(o=this.getSlideIdxById(s),i=s,e=this.getSlideElementByIdx(o),l=e._sSliderComponentTimer)||(l={total:(t=e.getAttribute("timer"))!=null?t:this.props.timer,current:0,percentage:0},e._sSliderComponentTimer=l),e)return{id:i,idx:o,page:Math.ceil(o/this.props.slidesByPage),$slide:e,timer:l}}getFirstSlide(){return this.getSlide(0)}getLastSlide(){return this.getSlide(this.$slides.length-1)}getBehavior(){if(this._bindedBehaviors[this.props.behavior])return this._bindedBehaviors[this.props.behavior];const s=Object.assign({},this.props.behaviors[this.props.behavior]);if(s)return Object.keys(s).forEach(t=>{typeof s[t]=="function"&&(s[t]=s[t].bind(this))}),this._bindedBehaviors[this.props.behavior]=s;throw new Error(`[SSliderComponent] The requested "${this.props.behavior}" does not exists. Here's the available ones:
`+Object.keys(this.props.behaviors).map(t=>`
- `+t))}updateSlidesClasses(){const s=this.getCurrentSlide();this.$slides.forEach((t,e)=>{1<this.props.slidesByPage&&this.isSlideInPage(t)||t===s.$slide?t.classList.add("active"):t.classList.remove("active")})}goTo(s,t=!1){return p(this,void 0,void 0,function*(){var e,i=this.getSlide(s);if(t||i&&i.idx!==this.currentSlide.idx)return e=this.getCurrentSlide(),this.setCurrentSlideByIdx(i.idx),this.props.slide=i.idx,e.idx+1===i.idx?this._dispatch("next",{currentSlide:e,nextSlide:i}):e.idx-1===i.idx&&this._dispatch("previous",{currentSlide:e,nextSlide:i}),this._dispatch("goto",{currentSlide:e,nextSlide:i}),this.updateSlidesClasses(),e.$slide.classList.add("post-active"),e.$slide.classList.remove("active"),i.$slide.classList.add("pre-active"),yield this._transitionHandler(e.$slide,i.$slide),e.$slide.classList.remove("post-active"),i.$slide.classList.remove("pre-active"),i.$slide.classList.add("active"),this._dispatch("goto-end",{currentSlide:e,nextSlide:i}),this.isPlaying()&&this._playSlide(this.state.currentSlideIdx),this})}next(){return this.props.loop&&this.isLast()?this.goTo(0):this.goTo(this.getNextSlideIdx())}previous(){return this.props.loop&&this.isFirst()?this.goTo(this.getLastSlide().idx):this.goTo(this.getPreviousSlideIdx())}getTimer(s){var t;if(!s){let i=0,o=0;for(let l=0;l<this.$slides.length;l++){const r=this.getSlide(l);l<this.state.currentSlideIdx?o+=r.timer.total:l===this.state.currentSlideIdx&&(o+=r.timer.current),i+=(t=r.timer.total)!=null?t:0}return this._timer.total=i,this._timer.current=o,this._timer.percentage=Math.round(100/i*o),this._timer}return this.getSlide(s).timer}isPlaying(){return!!this.state.playing&&this.props.timer!==void 0}play(){if(this.props.timer)return this.utils.dispatchEvent("play",{detail:this}),this.state.playing=!0,this._playSlide(this.currentSlide.idx),this}stop(){return this.utils.dispatchEvent("stop",{detail:this}),this.state.playing=!1,this}_playSlide(s){const t=this.getSlide(s);if(t&&t.timer){let e=0;const i=setInterval(()=>{this.isPlaying()&&(e+=100,t.timer.current=e,t.timer.percentage=100/t.timer.total*e,e>=t.timer.total)&&(clearInterval(i),t.timer.current=0,t.timer.percentage=0,this.next(!1))},100);return this}}_transitionHandler(s,t){return new Promise((e,i)=>p(this,void 0,void 0,function*(){var o,l;return this.style.setProperty("--s-slider-slide-height",Math.round(this.getCurrentSlide().$slide.getBoundingClientRect().height)+"px"),this.style.setProperty("--s-slider-slide-width",Math.round(this.getCurrentSlide().$slide.getBoundingClientRect().width)+"px"),this.props.transitionHandler?(yield this.props.transitionHandler(s,t),e()):(o=this.props.behavior)!=null&&o.goTo?(yield this.props.behavior.goTo(s,t),e()):(yield(l=(o=this.getBehavior()).transition)==null?void 0:l.call(o,s,t),void e())}))}render(){if(this.$slides.length){const t=this.getCurrentSlide();var s=this.getCurrentSlide();return this.style.setProperty("--s-slider-slide",this.state.currentSlideIdx),this.style.setProperty("--s-slider-total-slides",this.$slides.length),this.style.setProperty("--s-slider-page",this.state.currentPage),this.style.setProperty("--s-slider-total-pages",Math.ceil(this.$slides.length/this.props.slidesByPage)),this.style.setProperty("--s-slider-slides-by-page",this.props.slidesByPage),this.style.setProperty("--s-slider-slide-timer-total",`${(s=s.timer.total)!=null?s:0}s`),c`
            <div class="${this.utils.cls("_root")}">
                <div class="${this.utils.cls("_slides-wrapper")}">
                    <div class="${this.utils.cls("_slides")}">
                        <div class="${this.utils.cls("_pad _pad-start")}"></div>
                        ${this.$slides.map(e=>e)}
                        <div class="${this.utils.cls("_pad _pad-end")}"></div>
                    </div>
                </div>
                <div
                    class="${this.utils.cls("_ui",typeof this.props.uiContainer=="string"?"s-container--"+this.props.uiContainer:this.props.uiContainer===!0?"s-container":"")}"
                >
                    ${this.props.progress?c`
                              <div class="${this.utils.cls("_progress")}">
                                  <div
                                      class="${this.utils.cls("_progress-bar")}"
                                  ></div>
                              </div>
                          `:""}
                    ${this.props.nav?c`
                              <div class="${this.utils.cls("_nav")}">
                                  ${[...Array(Math.ceil(this.$slides.length/this.props.slidesByPage))].map((e,i)=>c`
                                          <div
                                              class="${this.utils.cls("_nav-item")} ${this.isSlideInPage(t.idx,i)?"active":""}"
                                              @pointerup=${()=>this.goTo(i*this.props.slidesByPage)}
                                          ></div>
                                      `)}
                              </div>
                          `:""}
                    ${this.props.controls?c`
                              <div class="${this.utils.cls("_controls")}">
                                  <div
                                      class="${this.utils.cls("_controls-previous")} ${this.isFirst()&&!this.props.loop?"":"active"}"
                                      @pointerup=${()=>this.previous()}
                                  >
                                      ${this.props.previousIconClass?c`
                                                <i
                                                    class="${this.props.previousIconClass}"
                                                ></i>
                                            `:c`<div
                                                class="${this.utils.cls("_controls-previous-arrow")}"
                                            ></div>`}
                                  </div>
                                  <div
                                      class="${this.utils.cls("_controls-next")} ${this.isLast()&&!this.props.loop?"":"active"}"
                                      @pointerup=${()=>this.next()}
                                  >
                                      ${this.props.nextIconClass?c`
                                                <i
                                                    class="${this.props.nextIconClass}"
                                                ></i>
                                            `:c`<div
                                                class="${this.utils.cls("_controls-next-arrow")}"
                                            ></div>`}
                                  </div>
                              </div>
                          `:""}
                </div>
            </div>
        `}}}function N(d={},s="s-slider",t){m.define(s,m,d,t)}export{N as default};
