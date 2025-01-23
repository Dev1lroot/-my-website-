class GrindstoneRecipe extends Recipe
{
	constructor(input,output)
	{
		super(input,output)
		this.name = "Crusher";
		this.registry_name = "crusher";
		this.form = [
			{x:1,y:0,role:`input` ,content:false},
			{x:1,y:1,role:`icon`,icon:root.editor.getTextureGUI(`arrow_down`),content:false},
			{x:0,y:2,role:`output` ,content:false},
			{x:1,y:2,role:`output` ,content:false},
			{x:2,y:2,role:`output` ,content:false},
		];
		this.create(input,output);
	}
}