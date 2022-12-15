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
            // this.uniforms[ 'angle' ].value=_Math.randFloat(-Math.PI,Math.PI);
            // this.uniforms[ 'seed_x' ].value=_Math.randFloat(-1,1);
            // this.uniforms[ 'seed_y' ].value=_Math.randFloat(-1,1);
            // this.uniforms[ 'distortion_x' ].value=_Math.randFloat(0,1);
            // this.uniforms[ 'distortion_y' ].value=_Math.randFloat(0,1);
            this.uniforms['amount'].value = Math.random() / 90;
            this.uniforms['angle'].value = three_full_1._Math.randFloat(-Math.PI, Math.PI);
            this.uniforms['distortion_x'].value = three_full_1._Math.randFloat(0, 1);
            this.uniforms['distortion_y'].value = three_full_1._Math.randFloat(0, 1);
            this.uniforms['seed_x'].value = three_full_1._Math.randFloat(-0.3, 0.3);
            this.uniforms['seed_y'].value = three_full_1._Math.randFloat(-0.3, 0.3);
            this.curF = 0;
            this.generateTrigger();
        }
        else if (this.curF % this.randX < this.randX / 5) {
            this.uniforms['amount'].value = Math.random() / 90;
            this.uniforms['angle'].value = three_full_1._Math.randFloat(-Math.PI, Math.PI);
            this.uniforms['distortion_x'].value = three_full_1._Math.randFloat(0, 1);
            this.uniforms['distortion_y'].value = three_full_1._Math.randFloat(0, 1);
            this.uniforms['seed_x'].value = three_full_1._Math.randFloat(-0.3, 0.3);
            this.uniforms['seed_y'].value = three_full_1._Math.randFloat(-0.3, 0.3);
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
    setSize: function () { },
    generateTrigger: function () {
        this.randX = three_full_1._Math.randInt(120, 240);
    },
    generateHeightmap: function (dtSize) {
        var data_arr = new Float32Array(dtSize * dtSize * 3);
        var length = dtSize * dtSize;
        for (var i = 0; i < length; i++) {
            var val = three_full_1._Math.randFloat(0, 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBYW9CO0FBRXBCLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsR0FBRyxVQUFVLE1BQU07SUFDL0IsSUFBSSwwQkFBYSxLQUFLLFNBQVM7UUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBRXhELElBQUksTUFBTSxHQUFHLDBCQUFhLENBQUM7SUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRywwQkFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFckQsSUFBSSxNQUFNLElBQUksU0FBUztRQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTlELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSwyQkFBYyxDQUFDO1FBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtRQUN2QixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7UUFDakMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjO0tBQ3hDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXRCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksa0JBQUssRUFBRSxDQUFDO0lBRXpCLElBQUks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