class GameObject
{
	constructor(name,registry_name)
	{
		this.name = name;
		this.lore = "";
		this.type = "unknown";
		this.texture = false;
		this.stack_size = 64;
		this.modid = "minecraft";
		this.registry_name = registry_name;
		this.absolute_name = "";
		this.oredictionary = [];
		this.worldgen      = false;

		// Экстраполируем параметры
		this.getModid();
	}
	addTag(tag)
	{
		this.oredictionary.push(tag);
		return this;
	}
	tagged(tags)
	{
		this.oredictionary = tags;
		return this;
	}
	getModid()
	{
		var slice = this.registry_name.split(":");
		if(slice.length > 1)
		{
			this.modid         = slice[0];
			this.absolute_name = slice[1];
		}
		else
		{
			this.absolute_name = this.registry_name;
		}
	}
	getTexture()
	{
		var comp = this;
		var textures = {
			real: "assets/"+this.modid+"/textures/"+this.type+"/"+this.absolute_name+".png",
			null: "assets/editor/textures/item/null.png"
		}
		this.texture = textures.real;
		return this.texture;
	}
}