var mod = new Zaebcraft(root);

// Пыли

mod.createItem(new Item("Silicon Dust","zaebcraft:silicon_dust").tagged(["dust","silicon"]));
mod.createItem(new Item("Фосфорная пыль","zaebcraft:phosphoric_dust").addTag("dust"));
mod.createItem(new Item("Sand","zaebcraft:sand_dust").addTag("dust"));
mod.createItem(new Item("Arsenic","zaebcraft:arsenic_dust").addTag("dust"));
mod.createItem(new Item("Sulfur","zaebcraft:sulfur").addTag("mineral"));
mod.createItem(new Item("Granite Dust","zaebcraft:granite_dust").addTag("mineral"));
mod.createItem(new Item("Granite Dust","zaebcraft:cinnabar_crystal").addTag("mineral"));
mod.createItem(new Item("Raw Magnet","zaebcraft:raw_magnet").addTag("tool"));
mod.createItem(new Item("Magnet","zaebcraft:magnet").addTag("tool"));
mod.createItem(new Item("Vacuum Radio Lamp","zaebcraft:rled01").addTag("radiolamp"));
mod.createItem(new Item("Vacuum Radio Lamp","zaebcraft:rled02").addTag("radiolamp"));
mod.createItem(new Item("Vacuum Radio Lamp","zaebcraft:rled03").addTag("radiolamp"));
// Металлы

mod.createMaterial("Aluminium");
mod.createMaterial("Chromium");
mod.createMaterial("Nichromium");
mod.createMaterialFromVanilla("Copper");
mod.createMaterial("Chromel");
mod.createMaterial("Alumel");
mod.createMaterial("Magnesium");
mod.createMaterial("Manganese");
mod.createMaterial("Constantan");
mod.createMaterial("Tungsten");
mod.createMaterial("Cobalt");
mod.createMaterial("Nickel");
mod.createMaterial("Zink");
mod.createMaterial("Tin");
mod.createMaterial("Steel");
mod.createMaterial("Uranium");
mod.createMaterialFromVanilla("Iron");
mod.createMaterial("Lead");
mod.createAssembly("Rust",["mote","dust","cog","reductor","plate"]);

// Создание подземных пород
mod.createMineral("Limestone");
mod.createMineral("Biotite");
mod.createMineral("Wolframite");
mod.createMineral("Albite");
mod.createMineral("Orthoclase");
mod.createMineral("Andesite");
mod.createMineral("Skutterudite",{
	lore: "Редкий минерал кобальта, крайне токсичен, содержит мышьяк",
	worldgen: {
		amount: [4,12],
		chunks: [0,5],
		height: [40,30],
		biomes: []
	}
});
mod.createMineral("Sphalerite",{
	lore: "Основной минерал цинка",
	worldgen: {
		amount: [4,12],
		chunks: [0,5],
		height: [40,30],
		biomes: []
	}
});
mod.createMineral("Galena",{
	lore: "Основной минерал свинца, встречается везде",
	worldgen: {
		amount: [4,12],
		chunks: [0,5],
		height: [40,30],
		biomes: ["OCEAN","RIVER"]
	}
});
mod.createMineral("Borax",{
	lore: "Основной минерал тетрабората натрия, встречается в морских глубинах, используется в качестве флюса в металлургии",
	worldgen: {
		amount: [4,12],
		chunks: [0,5],
		height: [40,30],
		biomes: ["OCEAN","RIVER"]
	}
});
mod.createMineral("Cinnabar",{
	lore: "Основной минерал ртути, крайне токсичен",
	worldgen: {
		amount: [4,12],
		chunks: [0,5],
		height: [40,30],
		biomes: []
	}
});
mod.createMineral("Baddeleyite",{
	lore: "Редкий минерал циркона",
	worldgen: {
		amount: [4,12],
		chunks: [0,5],
		height: [40,30],
		biomes: []
	}
});

// Первичные Компоненты

mod.createSiliconSet("P");
mod.createSiliconSet("N");
mod.createSiliconSet("PN");

// Элементы микросхем

mod.createDiode("Diode");
mod.createDiode("Tunnel diode");
mod.createDiode("Zener diode");

mod.createRecipe(new GrindstoneRecipe([
	new ItemStack("minecraft:flint",1)
],[
	new ItemStack("zaebcraft:silicon_dust",1)
]));

mod.createRecipe(new BlastFurnaceRecipe([
	new ItemStack("zaebcraft:silicon_dust",1),
	new ItemStack("zaebcraft:aluminium_dust",1)
],[
	new ItemStack("zaebcraft:element_p",1)
]));

mod.createRecipe(new BlastFurnaceRecipe([
	new ItemStack("zaebcraft:element_p",1),
	new ItemStack("zaebcraft:element_n",1)
],[
	new ItemStack("zaebcraft:element_pn",1)
]));

mod.createRecipe(new BlastFurnaceRecipe([
	new ItemStack("zaebcraft:silicon_dust",1),
	new ItemStack("zaebcraft:phosphoric_dust",1)
],[
	new ItemStack("zaebcraft:element_n",1)
]));


mod.createRecipe(new BlastFurnaceRecipe([
	new ItemStack("zaebcraft:tin_wire",1),
	new ItemStack("zaebcraft:element_pn",1)
],[
	new ItemStack("zaebcraft:diode",1)
]));

mod.createRecipe(new BlastFurnaceRecipe([
	new ItemStack("zaebcraft:aluminium_dust",1),
	new ItemStack("zaebcraft:diode",1),
	new ItemStack("zaebcraft:phosphoric_dust",1),
],[
	new ItemStack("zaebcraft:tunnel_diode",1)
]));

mod.createRecipe(new BlastFurnaceRecipe([
	new ItemStack("zaebcraft:tin_wire",1),
	new ItemStack("zaebcraft:element_pn",1),
	new ItemStack("minecraft:redstone",1),
],[
	new ItemStack("zaebcraft:tunnel_diode",1)
]));

mod.createRecipe(new BlastFurnaceRecipe([
	new ItemStack("zaebcraft:tin_wire",1),
	new ItemStack("zaebcraft:element_pn",1),
	new ItemStack("minecraft:glass",1),
],[
	new ItemStack("zaebcraft:zener_diode",1)
]));

mod.createRecipe(new BlastFurnaceRecipe([
	new ItemStack("zaebcraft:diode",1),
	new ItemStack("minecraft:glass",1),
],[
	new ItemStack("zaebcraft:zener_diode",1)
]));

mod.createRecipe(new GrindstoneRecipe([
	new ItemStack("minecraft:granite",1)
],[
	new ItemStack("zaebcraft:granite_dust",1),
	new ItemStack("minecraft:quartz",1),
	new ItemStack("zaebcraft:aluminium_mote",3),
]));

mod.createRecipe(new GrindstoneRecipe([
	new ItemStack("minecraft:andesite",1)
],[
	new ItemStack("zaebcraft:andesite_dust",1),
	new ItemStack("zaebcraft:aluminium_mote",3),
	new ItemStack("zaebcraft:iron_mote",1),
]));

mod.createRecipe(new GrindstoneRecipe([
	new ItemStack("zaebcraft:skutterudite",1)
],[
	new ItemStack("zaebcraft:skutterudite_dust",1),
	new ItemStack("zaebcraft:arsenic_dust",1),
	new ItemStack("zaebcraft:cobalt_mote",3)
]));

mod.createRecipe(new GrindstoneRecipe([
	new ItemStack("zaebcraft:sphalerite",1)
],[
	new ItemStack("zaebcraft:sphalerite_dust",1),
	new ItemStack("zaebcraft:sulfur",1),
	new ItemStack("zaebcraft:zink_mote",3)
]));

mod.createRecipe(new GrindstoneRecipe([
	new ItemStack("zaebcraft:borax",1)
],[
	false,
	new ItemStack("zaebcraft:borax_dust",4)
]));

mod.createRecipe(new GrindstoneRecipe([
	new ItemStack("zaebcraft:cinnabar",1)
],[
	new ItemStack("zaebcraft:cinnabar_crystal",1),
	new ItemStack("zaebcraft:sulfur",1),
]));

mod.createRecipe(new GrindstoneRecipe([
	new ItemStack("zaebcraft:galena",1)
],[
	new ItemStack("zaebcraft:sand_dust",1),
	new ItemStack("zaebcraft:sulfur",1),
	new ItemStack("zaebcraft:lead_mote",6)
]));

mod.createRecipe(new ChemicalCentrifugeRecipe([
	new ItemStack("zaebcraft:granite_dust",1)
],[
	new ItemStack("zaebcraft:aluminium_mote",3),
	new ItemStack("zaebcraft:magnesium_mote",2),
	new ItemStack("zaebcraft:sand_dust",1),
	new ItemStack("zaebcraft:uranium_mote",1,10),
]));

mod.createRecipe(new ChemicalCentrifugeRecipe([
	new ItemStack("zaebcraft:andesite_dust",1)
],[
	new ItemStack("zaebcraft:aluminium_mote",3),
	new ItemStack("zaebcraft:iron_mote",1,25),
	new ItemStack("zaebcraft:sand_dust",1)
]));

mod.createRecipe(new ChemicalCentrifugeRecipe([
	new ItemStack("zaebcraft:skutterudite_dust",1)
],[
	new ItemStack("zaebcraft:arsenic_dust",1),
	new ItemStack("zaebcraft:nickel_mote",3),
	new ItemStack("zaebcraft:sand_dust",1),
	new ItemStack("zaebcraft:iron_mote",1,50),
	new ItemStack("zaebcraft:cobalt_mote",1,75),
]));
mod.createRecipe(new ChemicalCentrifugeRecipe([
	new ItemStack("minecraft:redstone",1)
],[
	new ItemStack("zaebcraft:phosphoric_dust",1),
	new ItemStack("zaebcraft:aluminium_mote",3),
]));
mod.createRecipe(new Recipe([
	undefined,new ItemStack("zaebcraft:iron_wire",1),undefined,
	new ItemStack("zaebcraft:iron_plate",1),new ItemStack("zaebcraft:copper_coil",1),
	new ItemStack("zaebcraft:iron_plate",1),undefined,new ItemStack("zaebcraft:magnet",1),undefined
],[
	undefined
]));