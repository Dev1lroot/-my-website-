class ItemStack
{
	constructor(...args)
	{
		this.object = root.game.registry.find(args[0]);
		if(this.object.getTexture() == undefined)
		{
			this.object.getTexture = function(){return "";}
		}
		this.amount = (args[1] != undefined) ? args[1] : 1;
		this.chance = (args[2] != undefined) ? args[2] : 100;
	}
}