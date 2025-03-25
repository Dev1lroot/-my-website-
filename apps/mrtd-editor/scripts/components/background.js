Vue.component('background-component',{
	props: ["page"],
	template: `<div class="background">
		<div class="layer" 
			v-for="layer,id in $parent.background" 
			:style="style(layer, id)" 
			v-if="layer.active && (layer.pageBound == false || (layer.pageBound == true && layer.pageNumber == page))">
		</div>
		<div class="layer" style="background-color: #FFF;"></div>
	</div>`,
    methods: {
        style(layer,position){
            return {
				zIndex: 993 - position,
                filter: `brightness(${layer.brightness}) contrast(${layer.contrast}) blur(${layer.blur}px) hue-rotate(${layer.hue}deg)`,
                opacity: layer.opacity,
				backgroundImage: `url(${layer.image})`,
				backgroundSize: layer.backgroundSize,
				backgroundRepeat: layer.backgroundRepeat
			}
        }
    }
})