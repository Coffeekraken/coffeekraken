import{S as d,g as n,h as p,i as f,u as g,c as m,j as v,k as _,l as a,m as b}from"./index.esm.js";class u extends d{static get _definition(){return{spaces:{type:"Object",description:'Specify the spaces you want as options. This object MUST contain two properties which are "margin" and "padding", which contains each every options you want as an object with "name" and "value" properties',required:!0,get default(){var e;return{margin:(e=n.get("margin"))!=null?e:{},padding:(e=n.get("padding"))!=null?e:{}}}},values:{type:"Object",description:'Specify the initial values for the selectors. MUST be an object with properties "paddingTop", "paddingLeft", "marginBottom", etc...',default:{}},valueProp:{type:"String",description:"Specify the space object propery to take as value",default:"value"}}}}const y=`.s-spaces-selector{display:block;aspect-ratio:16/10;position:relative;width:100%}.s-spaces-selector_inner{position:absolute;top:var(--s-spaces-selector-offset-y, 0);right:var(--s-spaces-selector-offset-x, 0);bottom:var(--s-spaces-selector-offset-y, 0);left:var(--s-spaces-selector-offset-x, 0)}.s-spaces-selector_clear{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.s-spaces-selector_space{position:absolute;top:0;left:0;width:100%;height:100%}.s-spaces-selector_select{position:absolute!important;text-align:center}.s-spaces-selector_select-margin-top{left:50%;bottom:100%;transform:translate(-50%)}.s-spaces-selector_select-margin-right{top:50%;left:100%;transform:translateY(-50%)}.s-spaces-selector_select-margin-bottom{left:50%;top:100%;transform:translate(-50%)}.s-spaces-selector_select-margin-left{top:50%;right:100%;transform:translateY(-50%)}.s-spaces-selector_select-padding-top{left:50%;top:0;transform:translate(-50%)}.s-spaces-selector_select-padding-right{top:50%;right:0;transform:translateY(-50%)}.s-spaces-selector_select-padding-bottom{left:50%;bottom:0;transform:translate(-50%)}.s-spaces-selector_select-padding-left{top:50%;left:0;transform:translateY(-50%)}
`;class h extends p{static get properties(){return p.propertiesFromInterface({},u)}static get styles(){return f`
            ${g(y)}
        `}static get state(){return{values:{}}}constructor(){super(m({name:"s-spaces-selector",interface:u})),this._spacesNames=["margin","padding"]}firstUpdated(){var e=this.querySelector('select[name="margin-left"]').getBoundingClientRect(),t=this.querySelector('select[name="margin-top"]').getBoundingClientRect();this.style.setProperty("--s-spaces-selector-offset-y",t.height+"px"),this.style.setProperty("--s-spaces-selector-offset-x",e.width+"px")}clear(){this.state.values={},this.utils.dispatchEvent("change",{bubbles:!0,detail:Object.assign({},this.props.values)}),Array.from(this.querySelectorAll("select")).forEach(e=>{e.selectedIndex=0}),this.requestUpdate()}_updateSelect(e){var t=v(e.target.name);this.state.values[t]=_(e.target.value),this.utils.dispatchEvent("change",{bubbles:!0,detail:Object.assign({},this.state.values)})}render(){return a`
            <div class="${this.utils.cls("_inner")}">
                ${this._spacesNames.map(e=>a`
                        <div
                            class="${this.utils.cls("_space")} ${this.utils.cls("_space-"+e)}"
                        >
                            ${["top","right","bottom","left"].map(t=>{var c;const o=(c=this.props.spaces[e])!=null?c:[],i=this.state.values[""+e+b(t)];let l=null;return o.forEach(s=>{i&&s[this.props.valueProp]==i&&(l=s)}),a`
                                    <select
                                        class="${this.utils.cls("_select")} ${this.utils.cls(`_select-${e}-`+t)}"
                                        name="${e}-${t}"
                                        @change=${s=>{this._updateSelect(s)}}
                                    >
                                        ${o.map(s=>a`
                                                <option
                                                    .value=${s[this.props.valueProp]}
                                                    ?selected=${l===s||l===null&&!s.value}
                                                >
                                                    ${s.name}
                                                </option>
                                            `)}
                                    </select>
                                `})}
                        </div>
                    `)}

                <button
                    class="${this.utils.cls("_clear")}"
                    @pointerup=${()=>{this.clear()}}
                >
                    Clear
                </button>
            </div>
        `}}function $(r={},e="s-spaces-selector",t){h.define(e,h,r,t)}export{$ as default};
