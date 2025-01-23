Vue.component('minecraft-recipe', {
	props: [`recipe`,`grid`],
	template: `<div class="recipe" v-if="recipe != undefined">
					<h1>{{recipe.name}}</h1>
			   		<div class="recipe-form" v-if="recipe.form != undefined" :style="'width:'+recipe.getWidth()+'px;height:'+recipe.getHeight()+'px;'">
						<minecraft-recipe-cell v-for="i in recipe.form" v-bind:param="i" v-bind:grid="grid"></minecraft-recipe-cell>
			   		</div>
			   	</div>`
});