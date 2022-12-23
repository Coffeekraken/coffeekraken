"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_full_1 = require("three-full");
/* eslint-disable */
const GlitchPass = function (dtSize) {
    if (three_full_1.DigitalGlitch === undefined)
        console.error('GlitchPass relies on DigitalGlitch');
    var shader = three_full_1.DigitalGlitch;
    this.uniforms = three_full_1.UniformsUtils.clone(shader.uniforms);
    if (dtSize == undefined)
        dtSize = 64;
    this.uniforms['tDisp'].value = this.generateHeightmap(dtSize);
    this.material = new three_full_1.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
    });
    this.enabled = true;
    this.renderToScreen = false;
    this.needsSwap = true;
    this.camera = new three_full_1.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new three_full_1.Scene();
    this.quad = new three_full_1.Mesh(new three_full_1.PlaneBufferGeometry(2, 2), null);
    this.scene.add(this.quad);
    this.goWild = false;
    this.curF = 0;
    this.generateTrigger();
};
GlitchPass.prototype = {
    render: function (renderer, writeBuffer, readBuffer, delta) {
        this.uniforms['tDiffuse'].value = readBuffer;
        this.uniforms['seed'].value = Math.random(); //default seeding
        this.uniforms['byp'].value = 0;
        if (this.curF % this.randX == 0 || this.goWild == true) {
            // this.uniforms[ 'amount' ].value=Math.random()/30;
            // this.uniforms[ 'angle' ].value=this.randomBetween(-Math.PI,Math.PI);
            // this.uniforms[ 'seed_x' ].value=this.randomBetween(-1,1);
            // this.uniforms[ 'seed_y' ].value=this.randomBetween(-1,1);
            // this.uniforms[ 'distortion_x' ].value=this.randomBetween(0,1);
            // this.uniforms[ 'distortion_y' ].value=this.randomBetween(0,1);
            this.uniforms['amount'].value = Math.random() / 90;
            this.uniforms['angle'].value = this.randomBetween(-Math.PI, Math.PI);
            this.uniforms['distortion_x'].value = this.randomBetween(0, 1);
            this.uniforms['distortion_y'].value = this.randomBetween(0, 1);
            this.uniforms['seed_x'].value = this.randomBetween(-0.3, 0.3);
            this.uniforms['seed_y'].value = this.randomBetween(-0.3, 0.3);
            this.curF = 0;
            this.generateTrigger();
        }
        else if (this.curF % this.randX < this.randX / 5) {
            this.uniforms['amount'].value = Math.random() / 90;
            this.uniforms['angle'].value = this.randomBetween(-Math.PI, Math.PI);
            this.uniforms['distortion_x'].value = this.randomBetween(0, 1);
            this.uniforms['distortion_y'].value = this.randomBetween(0, 1);
            this.uniforms['seed_x'].value = this.randomBetween(-0.3, 0.3);
            this.uniforms['seed_y'].value = this.randomBetween(-0.3, 0.3);
        }
        else if (this.goWild == false) {
            this.uniforms['byp'].value = 1;
        }
        this.curF++;
        this.quad.material = this.material;
        if (this.renderToScreen) {
            renderer.render(this.scene, this.camera);
        }
        else {
            renderer.render(this.scene, this.camera, writeBuffer, false);
        }
    },
    randomBetween(min, max) {
        return min + Math.random() * max;
    },
    setSize: function () { },
    generateTrigger: function () {
        this.randX = parseInt(this.randomBetween(120, 240));
    },
    generateHeightmap: function (dtSize) {
        var data_arr = new Float32Array(dtSize * dtSize * 3);
        var length = dtSize * dtSize;
        for (var i = 0; i < length; i++) {
            var val = this.randomBetween(0, 1);
            data_arr[i * 3 + 0] = val;
            data_arr[i * 3 + 1] = val;
            data_arr[i * 3 + 2] = val;
        }
        var texture = new three_full_1.DataTexture(data_arr, dtSize, dtSize, three_full_1.RGBFormat, three_full_1.FloatType);
        texture.minFilter = three_full_1.NearestFilter;
        texture.magFilter = three_full_1.NearestFilter;
        texture.needsUpdate = true;
        texture.flipY = false;
        return texture;
    },
};
exports.default = GlitchPass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBWW9CO0FBRXBCLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsR0FBRyxVQUFVLE1BQU07SUFDL0IsSUFBSSwwQkFBYSxLQUFLLFNBQVM7UUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBRXhELElBQUksTUFBTSxHQUFHLDBCQUFhLENBQUM7SUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRywwQkFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFckQsSUFBSSxNQUFNLElBQUksU0FBUztRQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTlELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSwyQkFBYyxDQUFDO1FBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtRQUN2QixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7UUFDakMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjO0tBQ3hDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXRCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksa0JBQUssRUFBRSxDQUFDO0lBRXpCLElBQUks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