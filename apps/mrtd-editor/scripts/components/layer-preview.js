Vue.component('layer-preview',{
	props: ["layer"],
	template: `
		<a class="preview" :style="style(layer)">
            <slot></slot>
        </a>`,
    methods: {
        style(layer){
            return {
                filter: `brightness(${layer.brightness}) contrast(${layer.contrast}) blur(${layer.blur}px) hue-rotate(${layer.hue}deg)`,
                opacity: layer.opacity,
                backgroundImage: `url(${layer.image})`,
            }
        }
    }
})