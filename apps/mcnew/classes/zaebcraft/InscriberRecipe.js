class InscriberRecipe extends Recipe
{
	constructor(input,output)
	{
		super(input,output)
		this.name = "Inscriber";
		this.registry_name = "inscriber";
		this.form = [
			{x:0,y:0,role:`input` ,content:false},
			{x:0,y:2,role:`input` ,content:false},
			{x:2,y:1,role:`input` ,content:false},
			{x:2,y:0,role:`icon`,icon:root.editor.getTextureGUI(`press_up`),content:false},
			{x:2,y:2,role:`icon`,icon:root.editor.getTextureGUI(`press_down`),content:false},
			{x:3,y:1,role:`icon`,icon:root.editor.getTextureGUI(`arrow_right`),content:false},
			{x:4,y:1,role:`output`,content:false},
		];
		this.create(input,output);
	}
}