import { S as SInterface, g as SSugarConfig, b as SLitComponent, c as css, u as unsafeCSS, _ as __deepMerge, h as html } from "./index-4cd7da31.js";
class SGoogleMapComponentInterface extends SInterface {
  static get _definition() {
    return {
      apiKey: {
        type: "String",
        description: "Specify the google api key to use. You can specify it in the config.google.map.apiKey configuration for your project if you prefer",
        default: SSugarConfig.get("google.map.apiKey"),
        required: true
      },
      mapId: {
        type: "String",
        description: "Specify your mapId that you can create [here](https://console.cloud.google.com/google/maps-apis/studio/maps)",
        required: true
      },
      lat: {
        type: "Number",
        description: "Specify the map latitude",
        required: true
      },
      lng: {
        type: "Number",
        description: "Specify the map longitude",
        required: true
      },
      zoom: {
        type: "Number",
        description: "Specify the google map zoom"
      },
      bounds: {
        type: "Boolean",
        description: "Specify if you want your map to be bounds on current markers",
        default: true
      },
      icons: {
        type: "Object",
        description: "Specify some icons to be used across your maps",
        default: {
          marker: '<i class="fa-solid fa-location-dot"></i>'
        }
      },
      zoomControl: {
        type: "Boolean",
        description: "Specify if you want the zom control or not",
        default: false
      },
      mapTypeControl: {
        type: "Boolean",
        description: "Specify if you want the map type control or not",
        default: false
      },
      scaleControl: {
        type: "Boolean",
        description: "Specify if you want the map scale control or not",
        default: false
      },
      streetViewControl: {
        type: "Boolean",
        description: "Specify if you want the streeview control or not",
        default: false
      },
      rotateControl: {
        type: "Boolean",
        description: "Specify if you want the rotate control or not",
        default: false
      },
      fullscreenControl: {
        type: "Boolean",
        description: "Specify if you want the fullscreen control or not",
        default: false
      }
    };
  }
}
const __css = `.s-google-map {
    display: block;
    position: relative;
}

    .s-google-map:not([mounted]) {
        opacity: 0.001;
        pointer-events: none;
    }

    .s-lod--1 .s-google-map > div[style] {
        background: none !important;
}

    .s-google-map .gm-style {
        font: inherit;
    }body:after {
                    display: none;;
                    content: '{"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"lnf","speedIndex":30},"2":{"name":"theme","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"ultra","speedIndex":60}},"method":"class","defaultAction":">=","cssProperties":{"animation":2,"animation-delay":2,"animation-direction":2,"animation-duration":2,"animation-fill-mode":2,"animation-iteration-count":2,"animation-name":2,"animation-play-state":2,"animation-timing-function":2,"backdrop-filter":3,"background":1,"background-attachment":1,"background-blend-mode":3,"background-clip":1,"background-color":1,"background-image":1,"background-origin":1,"background-position":1,"background-repeat":1,"background-size":1,"border":1,"border-bottom":1,"border-bottom-color":1,"border-bottom-left-radius":1,"border-bottom-right-radius":1,"border-bottom-style":1,"border-bottom-width":1,"border-collapse":1,"border-color":1,"border-image":1,"border-image-outset":1,"border-image-repeat":1,"border-image-slice":1,"border-image-source":1,"border-image-width":1,"border-left":1,"border-left-color":1,"border-left-style":1,"border-left-width":1,"border-radius":1,"border-right":1,"border-right-color":1,"border-right-style":1,"border-right-width":1,"border-spacing":1,"border-style":1,"border-top":1,"border-top-color":1,"border-top-left-radius":1,"border-top-right-radius":1,"border-top-style":1,"border-top-width":1,"border-width":1,"box-shadow":1,"caret-color":1,"color":1,"column-count":1,"column-fill":1,"column-rule":1,"column-rule-color":1,"column-rule-style":1,"column-rule-width":1,"counter-increment":1,"counter-reset":1,"filter":1,"list-style-image":1,"outline":1,"outline-color":1,"outline-offset":1,"outline-style":1,"outline-width":1,"text-decoration":1,"text-decoration-color":1,"text-decoration-line":1,"text-indent":1,"text-justify":1,"text-overflow":1,"text-shadow":2,"text-transform":1,"transition":1,"transition-delay":1,"transition-duration":1,"transition-property":1,"transition-timing-function":1,"word-break":1,"word-spacing":1,"word-wrap":1}},"clean":{"variables":false},"compress":{"variables":false}}';
}
`;
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SGoogleMapComponent extends SLitComponent {
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SGoogleMapComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  static loadApi(apiKey) {
    if (this._loadApiPromise) {
      return this._loadApiPromise;
    }
    this._loadApiPromise = new Promise((resolve) => {
      const $script = document.createElement("script");
      $script.setAttribute("id", "s-google-map-component");
      $script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=beta&libraries=marker&callback=_initMap`;
      $script.async = true;
      window._initMap = function() {
        resolve(null);
      };
      document.head.appendChild($script);
    });
    return this._loadApiPromise;
  }
  constructor() {
    super(__deepMerge({
      name: "s-google-map",
      interface: SGoogleMapComponentInterface
    }));
    this._markers = this._getMarkers();
  }
  mount() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.constructor.loadApi(this.props.apiKey);
      this._map = new google.maps.Map(this, {
        center: { lat: this.props.lat, lng: this.props.lng },
        zoom: 8,
        mapId: this.props.mapId,
        zoomControl: this.props.zoomControl,
        mapTypeControl: this.props.mapTypeControl,
        scaleControl: this.props.scaleControl,
        streetViewControl: this.props.streetViewControl,
        rotateControl: this.props.rotateControl,
        fullscreenControl: this.props.fullscreenControl,
        disableDefaultUI: true
      });
      this._createMarkers(this._markers);
      this._handleBoundsAndZoom();
    });
  }
  /**
   * Handle bounds and zoom
   */
  _handleBoundsAndZoom() {
    const boundsListener = this._map.addListener("bounds_changed", () => {
      google.maps.event.removeListener(boundsListener);
      if (this.props.bounds) {
        this._bounds(this._markers);
      }
      if (this.props.zoom) {
        this._map.setZoom(this.props.zoom);
      }
    });
  }
  /**
   * Bounds markers
   */
  _bounds(markers) {
    const bounds = new google.maps.LatLngBounds();
    for (let marker of markers) {
      const latLng = new google.maps.LatLng(marker.lat, marker.lng);
      bounds.extend(latLng);
    }
    this._map.fitBounds(bounds);
  }
  /**
   * Create the markers
   */
  _createMarkers(markers) {
    for (let marker of markers) {
      const latLng = { lat: marker.lat, lng: marker.lng };
      if (!marker.content) {
        document.createElement("div");
        const domParser = new DOMParser(), markerDocument = domParser.parseFromString(`
                        <div class="${this.utils.cls("-marker")}">
                            <div class="${this.utils.cls("-marker__icon")}">
                                ${this.props.icons.marker}
                            </div>
                        </div>
                    `, "text/html");
        marker.content = markerDocument.body.children[0];
      }
      marker.marker = new google.maps.marker.AdvancedMarkerView({
        map: this._map,
        content: marker.content,
        position: latLng
      });
    }
  }
  /**
   * Get the markers from the component children
   */
  _getMarkers() {
    const markers = Array.from(
      // @ts-ignore
      this.querySelectorAll(`${this.tagName.toLowerCase()}-marker`)
    ).map(($marker) => {
      var _a, _b;
      return {
        lat: parseFloat((_a = $marker.getAttribute("lat")) !== null && _a !== void 0 ? _a : "0"),
        lng: parseFloat((_b = $marker.getAttribute("lng")) !== null && _b !== void 0 ? _b : "0"),
        icon: $marker.getAttribute("icon"),
        content: $marker.children.length ? $marker.children[0] : null
      };
    });
    return markers;
  }
  render() {
    return html``;
  }
}
SGoogleMapComponent.state = {};
function define(props = {}, tagName = "s-google-map", settings) {
  SGoogleMapComponent.define(tagName, SGoogleMapComponent, props, settings);
}
export {
  define as default
};
