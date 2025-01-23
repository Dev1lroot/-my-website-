Vue.component('minecraft-item-popup',{
	props: [`item`],
	template:  `<div class="item-popup">
					<div class="name">{{item.name}}</div>
					<div class="lore" v-if="item.lore != undefined">{{item.lore}}</div>
					<div class="modid">{{item.modid}}:{{item.absolute_name}}</div>
				</div>`
});