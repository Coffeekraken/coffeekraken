import{S as l,a as i,_ as p,r as d,o as h,$ as y}from"./index.esm.js";var u=w;function r(){return new DOMException("The request is not allowed","NotAllowedError")}async function m(o){if(navigator.clipboard)return navigator.clipboard.writeText(o);throw r()}async function g(o){const e=document.createElement("span"),t=(e.textContent=o,e.style.whiteSpace="pre",e.style.webkitUserSelect="auto",e.style.userSelect="all",document.body.appendChild(e),window.getSelection()),s=window.document.createRange();t.removeAllRanges(),s.selectNode(e),t.addRange(s);let c=!1;try{c=window.document.execCommand("copy")}finally{t.removeAllRanges(),window.document.body.removeChild(e)}if(!c)throw r()}async function w(o){try{await m(o)}catch(e){try{await g(o)}catch(t){throw t||e||r()}}}function f(o){return u(o)}globalThis&&globalThis.__awaiter;class n extends l{static get _definition(){return{from:{description:'Specify the element you want to copy from with a simple css selector. Try to get "value" first, then "innerHTML"',type:"String"},successTimeout:{description:'Specify the duration for displaying the "success" icon',type:"Number",default:1500},errorTimeout:{description:'Specify the duration for displaying the "error" icon',type:"Number",default:3e3}}}}var v=`.s-clipboard-copy{display:inline-block;width:1em;height:1em;position:relative;cursor:pointer}.s-clipboard-copy:not([mounted])>*{opacity:.001;pointer-events:none}.s-clipboard-copy .s-clipboard-copy__root[state=pending] .icon-copy,.s-clipboard-copy .s-clipboard-copy__root[state=copy] .icon-copy{opacity:1}.s-clipboard-copy .s-clipboard-copy__root[state=success]{color:hsla(calc(var(--s-theme-color-success-h, 0) + var(--s-theme-color-success-spin ,0)),calc((var(--s-theme-color-success-s, 0)) * 1%),calc((var(--s-theme-color-success-l, 0)) * 1%),var(--s-theme-color-success-a, 1))}.s-clipboard-copy .s-clipboard-copy__root[state=success] .icon-success{opacity:1}.s-clipboard-copy .s-clipboard-copy__root[state=error]{color:hsla(calc(var(--s-theme-color-error-h, 0) + var(--s-theme-color-error-spin ,0)),calc((var(--s-theme-color-error-s, 0)) * 1%),calc((var(--s-theme-color-error-l, 0)) * 1%),var(--s-theme-color-error-a, 1))}.s-clipboard-copy .s-clipboard-copy__root[state=error] .icon-error{opacity:1}.s-clipboard-copy svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:block;width:1em;height:1em;background-size:contain;opacity:0;pointer-events:none}
`;function _(o={},e="s-clipboard-copy"){a.define(e,a,o)}class a extends i{constructor(){super(p({name:"s-clipboard-copy",interface:n})),this.state={state:"pending"}}static get properties(){return i.createProperties({},n)}static get styles(){return d`
            ${h(v)}
        `}_copyFromTarget(){if(this.props.from){let t=document.querySelector(this.props.from);if(!(t=t||document.querySelector("#"+this.props.from)))throw new Error(`[SClipboardCopy] The target element "${this.props.from}" does not exist`);var e=(e=t.value)!=null?e:t.innerHTML;this.copy(e)}}copy(e){this.state.state="copy",f(e).then(()=>{this.state.state="success",setTimeout(()=>{this.state.state="pending"},this.props.successTimeout)}).catch(t=>{this.state.state="error",setTimeout(()=>{this.state.state="pending"},this.props.errorTimeout)})}render(){return y`
            <div
                @click=${()=>this._copyFromTarget()}
                class="${this.componentUtils.className("__root")}"
                state="${this.state.state}"
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
        `}}export{f as c,_ as d};
