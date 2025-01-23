class Zaebcraft extends Mod{
	constructor(root)
	{
		super("Zaebcraft","zaebcraft",root);
	}
	createAssembly(name,types)
	{
		var registry_name = this.createRegistryName(name);
		for(var type of types)
		{
			var item = new Item(name+" "+type,registry_name+"_"+type);
			this.createItem(item.tagged([type,registry_name]));
		}
	}
	createMaterialFromVanilla(name)
	{
		var registry_name = this.createRegistryName(name);
		this.createAssembly(name,["mote","dust","nugget","coil","wire","cog","reductor","plate"]);

		var m = new ItemStack(this.modid+":"+registry_name+"_mote",1)
		this.createRecipe(new Recipe([
			m,m,m,m,m,m,m,m,m
		],[
			new ItemStack(this.modid+":"+registry_name+"_dust",1),
		]));
		this.createRecipe(new Recipe([
			new ItemStack(this.modid+":"+registry_name+"_dust",1)
		],[
			new ItemStack(this.modid+":"+registry_name+"_mote",9)
		]));
	}
	createMaterial(name)
	{
		var registry_name = this.createRegistryName(name);
		this.createAssembly(name,["mote","dust","nugget","ingot","coil","wire","cog","reductor","plate"]);

		var m = new ItemStack(this.modid+":"+registry_name+"_mote",1)
		this.createRecipe(new Recipe([
			m,m,m,m,m,m,m,m,m
		],[
			new ItemStack(this.modid+":"+registry_name+"_dust",1),
		]));
		this.createRecipe(new Recipe([
			new ItemStack(this.modid+":"+registry_name+"_dust",1)
		],[
			new ItemStack(this.modid+":"+registry_name+"_mote",9)
		]));
	}
	createMineral(...args)
	{
		var name = args[0];
		var registry_name = this.createRegistryName(name);
		var ore  = new Block(name,registry_name).tagged([registry_name,"mineral","mineral_block"]);
		if(args[1] != undefined)
		{
			ore.lore     = args[1].lore;
			ore.worldgen = args[1].worldgen;
		}
		this.createBlock(ore);
		this.createItem( new Item(name+" Dust",registry_name+"_dust").tagged([registry_name,"mineral","dust"]));

	}
	createSiliconSet(name)
	{
		var registry_name = this.createRegistryName(name);
		var types = ["element","alloy","microelement"];
		for(var type of types)
		{
			var item = new Item(name+" "+type,type+"_"+registry_name).tagged(["silicon",type,"type_"+registry_name])
			this.createItem(item);
		}
	}
	createDiode = function(name)
	{
		var registry_name = this.createRegistryName(name);
		var item = new Item(name,registry_name).tagged(["diode","silicon"])
		this.createItem(item);
	}
}