import {
    DataTexture,
    DigitalGlitch,
    FloatType,
    Mesh,
    NearestFilter,
    OrthographicCamera,
    PlaneBufferGeometry,
    RGBFormat,
    Scene,
    ShaderMaterial,
    UniformsUtils,
    _Math,
} from 'three-full';

/* eslint-disable */
const GlitchPass = function (dtSize) {
    if (DigitalGlitch === undefined)
        console.error('GlitchPass relies on DigitalGlitch');

    var shader = DigitalGlitch;
    this.uniforms = UniformsUtils.clone(shader.uniforms);

    if (dtSize == undefined) dtSize = 64;

    this.uniforms['tDisp'].value = this.generateHeightmap(dtSize);

    this.material = new ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
    });

    this.enabled = true;
    this.renderToScreen = false;
    this.needsSwap = true;

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new Scene();

    this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
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
            this.uniforms['angle'].value = _Math.randFloat(-Math.PI, Math.PI);
            this.uniforms['distortion_x'].value = _Math.randFloat(0, 1);
            this.uniforms['distortion_y'].value = _Math.randFloat(0, 1);
            this.uniforms['seed_x'].value = _Math.randFloat(-0.3, 0.3);
            this.uniforms['seed_y'].value = _Math.randFloat(-0.3, 0.3);
            this.curF = 0;
            this.generateTrigger();
        } else if (this.curF % this.randX < this.randX / 5) {
            this.uniforms['amount'].value = Math.random() / 90;
            this.uniforms['angle'].value = _Math.randFloat(-Math.PI, Math.PI);
            this.uniforms['distortion_x'].value = _Math.randFloat(0, 1);
            this.uniforms['distortion_y'].value = _Math.randFloat(0, 1);
            this.uniforms['seed_x'].value = _Math.randFloat(-0.3, 0.3);
            this.uniforms['seed_y'].value = _Math.randFloat(-0.3, 0.3);
        } else if (this.goWild == false) {
            this.uniforms['byp'].value = 1;
        }
        this.curF++;

        this.quad.material = this.material;
        if (this.renderToScreen) {
            renderer.render(this.scene, this.camera);
        } else {
            renderer.render(this.scene, this.camera, writeBuffer, false);
        }
    },
    setSize: function () {},
    generateTrigger: function () {
        this.randX = _Math.randInt(120, 240);
    },
    generateHeightmap: function (dtSize) {
        var data_arr = new Float32Array(dtSize * dtSize * 3);
        var length = dtSize * dtSize;

        for (var i = 0; i < length; i++) {
            var val = _Math.randFloat(0, 1);
            data_arr[i * 3 + 0] = val;
            data_arr[i * 3 + 1] = val;
            data_arr[i * 3 + 2] = val;
        }

        var texture = new DataTexture(
            data_arr,
            dtSize,
            dtSize,
            RGBFormat,
            FloatType,
        );
        texture.minFilter = NearestFilter;
        texture.magFilter = NearestFilter;
        texture.needsUpdate = true;
        texture.flipY = false;
        return texture;
    },
};

export default GlitchPass;
