function exportRecipes(recipes)
{
	for(var recipe of recipes)
	{
		console.log(recipe.processformula());
	}
}
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function exportItems(items)
{
	var output = "";
	for(var item of items)
	{
		var item = item.item;
		var itemid = item.id.split(":")[1];
		var itemclassname = "";
		var capital = true;
		for(var letter of itemid)
		{
			if(capital)
			{
				itemclassname += letter.toUpperCase();
			}
			else
			{
				itemclassname += letter;
			}
			capital = false;
			if(letter == "_")
			{
				capital = true;
			}
		}
		itemclassname = itemclassname.replace(/_/g,"");
		itemclassname = itemclassname.replace(/-/g,"");
		if(isNumber(itemid[0]))
		{
			output += `\nzaebcraft.createItem(".items", "Hueta", "Item${itemclassname}", "item_${itemid}", "${item.display.name}")`;
		}
		else
		{
			output += `\nzaebcraft.createItem(".items", "Hueta", "Item${itemclassname}", "${itemid}", "${item.display.name}")`;
		}
	}
	console.log(output);
}