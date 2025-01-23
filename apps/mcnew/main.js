var root = new Vue({
	el: "#main",
	data: {
		tick: 1,
		grid: 54,
		page: 'guide',
		navigation: [
			{name:"Guide",page:"guide"},
			{name:"Recipes",page:"recipes"},
			{name:"Items",page:"items"}
		],
		clock: function(max)
		{
			var tick = this.tick;
			while(tick > max)
			{
				tick = tick - max;
			}
			return tick;
		},
		guide_recipes: function(set)
		{
			var o = [];
			if(set == "crusher")
			{
				for(r of this.game.registry.recipes)
				{
					if(r.registry_name == "crusher")
					{
						o.push(r);
					}
				}
			}
			if(set == "crusher_minerals")
			{
				for(r of this.game.registry.recipes)
				{
					if(r.registry_name == "crusher" && r.form[0].content != false && r.form[0].content.object.oredictionary.includes('mineral'))
					{
						o.push(r);
					}
				}
			}
			if(set == "craftingtable_motes")
			{
				for(r of this.game.registry.recipes)
				{
					if(r.registry_name == "craftingtable" && r.form[0].content != false && r.form[0].content.object.oredictionary.includes('mote'))
					{
						o.push(r);
					}
				}
			}
			return o;
		},
		editor: {
			getTexture: function(name)
			{
				return "assets/editor/textures/"+name+".png";
			},
			getTextureGUI: function(name)
			{
				return "assets/editor/textures/gui/"+name+".png";
			}
		},
		game: {
			add: function(object)
			{
				if(object != undefined && object.type != undefined)
				{
					if(object.type == "recipe")
					{
						this.registry.recipes.push(object);
					}
					else
					{
						this.registry.objects.push(object);
					}
				}
			},
			registry: {
				recipe_types: function()
				{
					var types = [];
					for(i of this.recipes)
					{
						if(!types.includes(i.registry_name))
						{
							types.push(i.registry_name);
						}
					}
					return types;
				},
				tags: function()
				{
					var tags = [];
					for(i of this.objects)
					{
						if(Array.isArray(i.oredictionary))
						{
							for(tag of i.oredictionary)
							{
								if(!tags.includes(tag))
								{
									tags.push(tag);
								}
							}
						}
					}
					return tags;
				},
				find: function(registry_name)
				{
					for(i of this.objects)
					{
						if(i.registry_name != undefined && i.registry_name == registry_name)
						{
							return i;
						}
					}
					return false;
				},
				objects: [],
				recipes: []
			}
		}
	}
});
setInterval(function(){
	root.tick += 1;
}.bind(root),1000);