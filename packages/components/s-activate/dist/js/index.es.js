import*as t from"riot";import e from"@coffeekraken/s-interface";class i extends e{}i.definition={target:{type:"String"},group:{type:"String"},toggle:{type:{type:"Boolean",nullishAsTrue:!0},default:!1},history:{type:{type:"Boolean",nullishAsTrue:!0},default:!1},active:{type:{type:"Boolean",nullishAsTrue:!0},default:!1},trigger:{type:{type:"Array<String>",commaSplit:!0},default:["click"]}};const s={css:'s-activate,[is="s-activate"]{ display: inline-block; }',exports:{$targets:void 0,$groupElements:void 0,targetSelector:void 0,onBeforeMount(){this.$props=i.apply(this.props).value,this.$props.target.match(/^(\.|\[])/)?this.targetSelector=this.$props.target:this.targetSelector=`#${this.$props.target}`},onMounted(){const t=Array.from(document.querySelectorAll(this.targetSelector));t.length&&(this.$targets=t),this.$props.group&&(this.$groupElements=Array.from(document.querySelectorAll(`s-activate[group="${this.$props.group}"]`))),this.$props.trigger.forEach((t=>{switch(t){case"click":this.root.addEventListener("click",(t=>{this.isActive()&&this.$props.toggle?this.unactivate():this.activate()}));break;case"anchor":document.location.hash===this.targetSelector&&this.activate(),window.addEventListener("hashchange",(t=>{document.location.hash===this.targetSelector&&this.activate()}))}})),this.root.activate=this.activate.bind(this),this.root.unactivate=this.unactivate.bind(this),this.root.isActive=this.isActive.bind(this),this.$props.active&&this.activate(!0)},isActive(){return this.root.hasAttribute("active")},activate(t=!1){!t&&this.isActive()||(this.$props.history&&(document.location.hash=this.targetSelector),this.$groupElements&&this.$groupElements.forEach((t=>{if(t!==this.root)try{t.unactivate()}catch(e){}})),this.root.setAttribute("active",!0),this.$targets.forEach((t=>{t.classList.add("active")})))},unactivate(){this.isActive()&&(this.root.removeAttribute("active"),this.$targets.forEach((t=>{t.classList.remove("active")})))}},template:null,name:"s-activate"};t.register("s-activate",s),t.mount("s-activate"),window.env||(window.env={SUGAR:{}}),window.env.SUGAR=JSON.parse('{"ENVIRONMENT":"development"}');
