import{c as r,e as a,r as o,o as p,$ as i}from"./index.esm.js";class s extends r{static get _definition(){return{name:{description:"Specify a name that will be attributed to the hidden input created automatically",type:"String",default:"rate"},value:{description:"Specify a base value for the rating",type:"Number",default:3},min:{description:"Specify the minimum rate you accept",type:"Number",default:1},max:{description:"Specify the maximum rate you accept",type:"Number",default:5},icon:{description:'This works only if you use the "s-icon:..." class notation. Define the icon you want to use',type:"String",default:"star"},iconClass:{description:'Specify a custom icon class you want to use. If this is set, override the "icon" parameter',type:"String"},readonly:{description:"Specify if you want your rating component to just display the value and that the user cannot interact with it or not",type:"Boolean",default:!1,physical:!0}}}}var c=`.s-rating{display:inline-block;position:relative;cursor:pointer}.s-rating .s-rating__icons-wrapper{display:flex}.s-rating .s-rating__base{opacity:.3}.s-rating .s-rating__rate{position:absolute;top:0;left:0}.s-rating:hover .s-rating__rate{-webkit-clip-path:polygon(0 0,100% 0,100% 100%,0 100%);clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}.s-rating .s-rating__rate{-webkit-clip-path:polygon(0 0,calc(var(--s-rating-percent) * 1%) 0,calc(var(--s-rating-percent) * 1%) 100%,0 100%);clip-path:polygon(0 0,calc(var(--s-rating-percent) * 1%) 0,calc(var(--s-rating-percent) * 1%) 100%,0 100%)}.s-rating .s-rating__rate i:hover~i{opacity:0}.s-rating[readonly]{pointer-events:none}
`;class n extends a{constructor(){super({name:"s-rating",interface:s}),this.state={value:0}}static get properties(){return a.createProperties({},s)}static get styles(){return o`
            ${p(c)}
        `}mount(){this._setRating(this.props.value)}_setRating(t){this.state.value=t,this.componentUtils.dispatchEvent("change",{detail:this.state})}render(){return i`
            <div
                class="${this.componentUtils.className("__root")}"
                style="--s-rating-rate: ${this.state.value}; --s-rating-min: ${this.props.min}; --s-rating-max: ${this.props.max}; --s-rating-percent: ${100/this.props.max*this.state.value};"
            >
                <input
                    type="hidden"
                    name="${this.props.name}"
                    value="${this.state.value}"
                />
                <div
                    class="${this.componentUtils.className("__base")} ${this.componentUtils.className("__icons-wrapper")}"
                >
                    ${[...Array(this.props.max).keys()].map(t=>i`
                            <i
                                class="${this.props.iconClass||"s-icon:"+this.props.icon}"
                            ></i>
                        `)}
                </div>
                <div
                    class="${this.componentUtils.className("__rate")} ${this.componentUtils.className("__icons-wrapper")}"
                >
                    ${[...Array(this.props.max).keys()].map(t=>i`
                            <i
                                @click=${()=>this._setRating(t+1)}
                                class="${this.props.iconClass||"s-icon:"+this.props.icon}"
                            ></i>
                        `)}
                </div>
            </div>
        `}}function h(e={},t="s-rating"){n.define(n,e,t)}export{h as default};
