Vue.component('minecraft-item', {
	props: [`item`,`amount`,`chance`],
	template:  `<a v-if="item != undefined" class="item" :title="item.name" @mouseover="selected = true" @mouseout="selected = false">
					<img :src="item.getTexture()" width="32px" height="32px" onerror="this.src = 'assets/editor/textures/item/null.png'">
					<div class="amount" v-if="amount > 1  ">{{amount}}</div>
					<div class="chance" v-if="chance < 100">{{chance}}%</div>
					<minecraft-item-popup v-bind:item="item" v-if="selected"></minecraft-item-popup>
				</a>`,
	data: function() {
       	return {
			selected: false
        }
  	}
});