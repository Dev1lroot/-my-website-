class Recipe
{
	constructor(input,output)
	{
		this.grid = 54;
		this.name = "Форменное создание";
		this.type = "recipe";
		this.registry_name = "craftingtable";
		this.form = [
			{x:0,y:0,role:`input` ,content:false},
			{x:1,y:0,role:`input` ,content:false},
			{x:2,y:0,role:`input` ,content:false},
			{x:0,y:1,role:`input` ,content:false},
			{x:1,y:1,role:`input` ,content:false},
			{x:2,y:1,role:`input` ,content:false},
			{x:0,y:2,role:`input` ,content:false},
			{x:1,y:2,role:`input` ,content:false},
			{x:2,y:2,role:`input` ,content:false},
			{x:3,y:1,role:`icon`,icon: root.editor.getTextureGUI(`arrow_right`) ,content:false},
			{x:4,y:1,role:`output`,content:false},
		];
		this.create(input,output);
	}
	create(input,output)
	{
		for(var i in input)
		{
			if(this.fieldset("input").length > i && input[i] != undefined)
			{
				this.form[this.fieldset("input")[i]].content = input[i];
			}
		}
		for(var i in output)
		{
			if(this.fieldset("output").length > i && output[i] != undefined)
			{
				this.form[this.fieldset("output")[i]].content = output[i];
			}
		}
	}
	getGrid()
	{
		var x = 0;
		var y = 0;

		for(i in this.form)
		{
			x = Math.max(x,this.form[i].x);
			y = Math.max(y,this.form[i].y);
		}
		return {x:x+1,y:y+1}
	}
	getWidth()
	{
		return this.getGrid().x * this.grid;
	}
	getHeight()
	{
		return this.getGrid().y * this.grid;
	}
	fieldset(role)
	{
		var dump = [];
		for(i in this.form)
		{
			if(this.form[i].role != undefined && this.form[i].role == role)
			{
				dump.push(Number(i));
			}
		}
		return dump;
	}
}