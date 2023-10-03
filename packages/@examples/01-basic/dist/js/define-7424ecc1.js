import{S as i,e as a,c as s,E as f}from"./index.esm.js";class p extends i{static get _definition(){return{ref:{description:"Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM",type:"String"},position:{description:"Specify the placement of your floating element. By default it will try to be placed as good as possible.",type:"String",values:["top","right","bottom","left","top-start","top-end","right-start","right-end","bottom-start","bottom-end","left-start","left-end","auto"],default:"auto"},shift:{description:"Specify a space between the floating element and the viewport side to respect",type:"Number",default:10},offset:{description:"Specify a space between the floating element and the reference one to respect",type:"Number"},arrow:{description:"Specify if you want an arrow or not",type:"Boolean",default:!0},arrowSize:{description:"Specify the size of the arrow in px",type:"Number",default:15},arrowPadding:{description:"Specify the padding of the arrow in px",type:"Number",default:10}}}}const c=`.s-floating{transform:none;transition:none}.s-floating:before{content:none}.s-floating:after{content:none}.s-floating .s-floating_arrow{position:absolute;background:hsla(calc(var(--s-color-current-h, 0) + var(--s-color-current-spin ,0)),calc((var(--s-color-current-s, 0)) * 1%),calc((var(--s-color-current-l, 0)) * 1%),var(--s-color-current-a, 1));width:var(--arrow-size, 8px);height:var(--arrow-size, 8px);transform:rotate(45deg)}
`;class r extends a{constructor(t,n,o){super(t,n,s({name:"s-floating",interface:p,style:c},o??{})),this.props.ref?this._$ref=document.querySelector(this.props.ref):this._$ref=this.node.parentElement}mount(){this.props.offset===void 0&&this.props.arrow&&(this.props.offset=this.props.arrowSize),f(this.node,this._$ref,this.props)}}function d(e={},t="s-floating"){r.define(t,r,Object.assign({},e))}export{d as default};
