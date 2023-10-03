import{B as p,S as l,h as n,i as d,u,c as h,l as y}from"./index.esm.js";function r(){return new DOMException("The request is not allowed","NotAllowedError")}async function m(o){if(navigator.clipboard)return navigator.clipboard.writeText(o);throw r()}async function g(e){var t=document.createElement("span"),e=(t.textContent=e,t.style.whiteSpace="pre",t.style.webkitUserSelect="auto",t.style.userSelect="all",document.body.appendChild(t),window.getSelection()),i=window.document.createRange();e.removeAllRanges(),i.selectNode(t),e.addRange(i);let s=!1;try{s=window.document.execCommand("copy")}finally{e.removeAllRanges(),window.document.body.removeChild(t)}if(!s)throw r()}async function f(o){try{await m(o)}catch(t){try{await g(o)}catch(e){throw e||t||r()}}}const w=p(f);function b(o){return w(o)}globalThis&&globalThis.__awaiter;class c extends l{static get _definition(){return{from:{description:'Specify the element you want to copy from with a simple css selector. Try to get "value" first, then "innerHTML"',type:"String"},successTimeout:{description:'Specify the duration for displaying the "success" icon',type:"Number",default:1500},errorTimeout:{description:'Specify the duration for displaying the "error" icon',type:"Number",default:3e3}}}}const v=`.s-clipboard-copy{display:inline-block;width:1em;height:1em;position:relative;cursor:pointer}.s-clipboard-copy:not([mounted])>*{opacity:.001;pointer-events:none}.s-clipboard-copy .s-clipboard-copy_root{width:100%;height:100%}.s-clipboard-copy .s-clipboard-copy_root[state=pending] .icon-copy,.s-clipboard-copy .s-clipboard-copy_root[state=copy] .icon-copy,.s-clipboard-copy .s-clipboard-copy_root[state=success] .icon-success,.s-clipboard-copy .s-clipboard-copy_root[state=error] .icon-error{opacity:1}.s-clipboard-copy svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:block;width:1em;height:1em;background-size:contain;opacity:0;pointer-events:none}
`;class a extends n{static get properties(){return n.propertiesFromInterface({},c)}static get styles(){return d`
            ${u(v)}
        `}static get state(){return{status:"pending"}}constructor(){super(h({name:"s-clipboard-copy",interface:c}))}_copyFromTarget(){if(this.props.from){let e=document.querySelector(this.props.from);if(!(e=e||document.querySelector("#"+this.props.from)))throw new Error(`[SClipboardCopy] The target element "${this.props.from}" does not exist`);var t=(t=e.value)!=null?t:e.innerHTML;this.copy(t)}}copy(t){this.state.status="copy",setTimeout(()=>{b(t).then(()=>{this.state.status="success",setTimeout(()=>{this.state.status="pending"},this.props.successTimeout)}).catch(e=>{this.state.status="error",setTimeout(()=>{this.state.status="pending"},this.props.errorTimeout)})})}render(){return y`
            <div
                @click=${()=>{this._copyFromTarget()}}
                class="${this.utils.cls("_root")}"
                state="${this.state.status}"
            >
                <svg
                    ref="svg"
                    class="icon-copy"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0)">
                        <path
                            d="M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z"
                            fill="currentColor"
                        />
                        <path
                            d="M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z"
                            fill="currentColor"
                        />
                        <path
                            d="M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z"
                            fill="currentColor"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="20" height="20" fill="currentColor" />
                        </clipPath>
                    </defs>
                </svg>
                <svg
                    class="icon-success"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <svg
                    class="icon-error"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polygon
                        points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                    ></polygon>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
        `}}function x(o={},t="s-clipboard-copy",e){a.define(t,a,o,e)}export{x as default};
