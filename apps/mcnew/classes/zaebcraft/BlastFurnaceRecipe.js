class BlastFurnaceRecipe extends Recipe
{
	constructor(input,output)
	{
		super(input,output)
		this.name = "Blast Furnace";
		this.registry_name = "custom";
		this.form = [
			{x:0,y:0,role:`input` ,content:false},
			{x:1,y:0,role:`input` ,content:false},
			{x:2,y:0,role:`input` ,content:false},
			{x:1,y:1,role:`icon`,icon:root.editor.getTextureGUI(`fire`),content:false},
			{x:1,y:2,role:`fuel` ,content:false},
			{x:4,y:1,role:`output`,content:false},
		];
		this.create(input,output);
	}
}