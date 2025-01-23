class Mod{
	constructor(name,modid,root)
	{
		this.name  = name;
		this.root  = root;
		this.modid = modid;
	}
	import(generic)
	{
		generic.oredictionary.push(this.modid);
		generic.modid = this.modid;
		generic.registry_name = this.modid+":"+generic.absolute_name;
		return generic;
	}
	createItem(item)
	{
		this.root.game.add(this.import(item));
	}
	createBlock(block)
	{
		this.root.game.add(this.import(block));
	}
	createRecipe(recipe)
	{
		this.root.game.add(recipe);
	}
	createRegistryName(name)
	{
		return name.replace(/ /g,"_").toLowerCase();
	}
}