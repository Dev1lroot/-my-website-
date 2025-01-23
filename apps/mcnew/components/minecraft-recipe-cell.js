Vue.component('minecraft-recipe-cell', {
	props: [`param`,`grid`],
	template:  `<div class="cell" :style="'width:'+grid+'px;height:'+grid+'px;top: calc('+param.y+' * '+grid+'px);left: calc('+param.x+' * '+grid+'px);'">
					<div :class="(param.role == 'icon' || param.role == 'string') ? 'nodraw' : ''" :style="(param.icon != undefined) ? 'background-image:url('+param.icon+')' : ''">
						<h1 v-if="param.role == 'string' && param.data != undefined">{{param.data}}</h1>
						<minecraft-item 
							v-if="param.content != undefined && param.content.object != undefined && param.content.object != false && param.content.object != null" 
							v-bind:item="param.content.object"
							v-bind:amount="param.content.amount"
							v-bind:chance="param.content.chance"
						></minecraft-item>
					</div>
				</div>`
});