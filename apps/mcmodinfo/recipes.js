// Minecraft Recipe Framework v2.0 (27 FEB 2020)
// =============================================
// Author:      Dev1lroot
// Dependecies: jQuery, ColorizeLib
// =============================================
class ItemStack
{
	constructor(object,quantity){
		this.quantity = quantity;
		this.item = object.item;
	}
	getId(){
		return this.item.id;
	}
	append()
	{
		var resource = this.item.id;
		resource = resource.replace(":","/");
		var it = "";
		it += '<div class="item" id="'+this.item.id+'" style="background: url(items/'+resource+'.png); background-size: 32px;">';
		if(this.quantity != 1)
		{
			it += '<div class="quantity">'+this.quantity+'</div>';
		}
		if (this.item.display != undefined) {
			it += '<div class="tooltip">'
			if (this.item.display.name != undefined) {
				it += '<p class="name">'+ColorizedOut(this.item.display.name)+'</p>';
			}
			if (this.item.display.lore != undefined) {
				it += '<p class="lore">'+ColorizedOut(this.item.display.lore)+'</p>';
			}
			if (this.item.id != undefined) {
				it += '<p class="modid">'+ColorizedOut(this.item.id)+'</p>';
			}
			it += '</div>';
		}
		it += '</div>';
		return it;
	}
}
class Item
{
	constructor(object){
		this.quantity = 0;
		this.item = object;
	}
	getId(){
		return this.item.id;
	}
	append(){
		var resource = this.item.id;
		resource = resource.replace(":","/");
		var it = "";
		it += '<div class="item" id="'+this.item.id+'" style="background: url(items/'+resource+'.png); background-size: 32px;">';
		if (this.item.display != undefined) {
			it += '<div class="tooltip">'
			if (this.item.display.name != undefined) {
				it += '<p class="name">'+ColorizedOut(this.item.display.name)+'</p>';
			}
			if (this.item.display.lore != undefined) {
				it += '<p class="lore">'+ColorizedOut(this.item.display.lore)+'</p>';
			}
			if (this.item.id != undefined) {
				it += '<p class="modid">'+ColorizedOut(this.item.id)+'</p>';
			}
			it += '</div>';
		}
		it += '</div>';
		return it;
	}
}
class Block
{
	constructor(object){
		this.block = object;
	}
	getId(){
		return this.block.id;
	}
	append(){
		var blockItem = '<div class="item" id="'+this.block.id+'">';
		if (this.block.display != undefined) {
			blockItem += '<div class="tooltip">'
			if (this.block.display.name != undefined) {
				blockItem += '<p class="name">'+ColorizedOut(this.block.display.name)+'</p>';
			}
			if (this.block.display.lore != undefined) {
				blockItem += '<p class="lore">'+ColorizedOut(this.block.display.lore)+'</p>';
			}
			if (this.block.id != undefined) {
				blockItem += '<p class="modid">'+ColorizedOut(this.block.id)+'</p>';
			}
			blockItem += '</div>';
		}
		blockItem += '<div class="block">';
		blockItem +='<div class="front" style="background: url(blocks/'+this.block.front+'.png); background-size: 20px;"></div>';
		if (this.block.top != undefined){
			blockItem +='<div class="top" style="background: url(blocks/'+this.block.top+'.png); background-size: 20px;"></div>';
		}
		else
		{
			blockItem +='<div class="top" style="background: url(blocks/'+this.block.front+'.png); background-size: 20px;"></div>';
		}
		if (this.block.side != undefined){
			blockItem +='<div class="side" style="background: url(blocks/'+this.block.side+'.png); background-size: 20px;"></div>';
		}
		else
		{
			blockItem +='<div class="side" style="background: url(blocks/'+this.block.front+'.png); background-size: 20px;"></div>';
		}
		blockItem +='</div></div>';
		return blockItem;
	}
}
class GenericRecipe
{
	constructor(object){
		this.recipe = object;
		this.gui = {};
		this.gui.name = "Generic";
		this.gui.slots = [];
		this.arrow = '<div class="arrow w4 h2 "></div>';
		this.power = '<div class="power w15 h2 "></div>';
		this.ctformula = "addGenericRecipe()";
		this.ctfunction = null;
		this.gui.inheritedStyles = "";
	}
	processformula()
	{
		var formula = this.ctformula;
		for (var slot in this.gui.slots){
			if (this.recipe.slot != undefined) {
				if (this.recipe.slot[slot] != null) {
					var q = "";
					if (this.recipe.slot[slot].quantity != undefined && this.recipe.slot[slot].quantity != 0) {
						q = " * "+	this.recipe.slot[slot].quantity;
					}
					formula = formula.replace("%"+slot+"%","<"+this.recipe.slot[slot].getId()+">"+q);
				}
				else
				{
					formula = formula.replace("%"+slot+"%","null");
				}
			}
		}
		if (this.recipe.input != null) {
			var q = "";
			if (this.recipe.input.quantity != undefined && this.recipe.input.quantity != 0) {
				q = " * "+	this.recipe.input.quantity;
			}
			formula = formula.replace("%input%","<"+this.recipe.input.getId()+">"+q);
		}
		else
		{
			formula = formula.replace("%input%","null");
		}
		if (this.recipe.output != null) {
			var q = "";
			if (this.recipe.output.quantity != undefined && this.recipe.output.quantity != 0) {
				q = " * "+	this.recipe.output.quantity;
			}
			formula = formula.replace("%output%","<"+this.recipe.output.getId()+">"+q);
		}
		else
		{
			formula = formula.replace("%output%","null");
		}
		this.ctfunction = formula;
		return formula;
	}
	parse(){
		var recipeDOM = '<div class="guiframe">'
		var formula = this.processformula();
		recipeDOM +='<button onclick="alert(`'+formula+'`)">CT</button>';
		recipeDOM +='<p>'+this.name+'</p>';
		recipeDOM +='<div class="craftingtable" style="'+this.gui.inheritedStyles+'">';
		recipeDOM += this.arrow;
		recipeDOM += this.power;
		for (var slot in this.gui.slots)
		{
			if (this.gui.slots[slot] != null)
			{
				var w = 1;
				var h = 1;
				if (this.gui.slots[slot].w != null) {
					w = this.gui.slots[slot].w;
				}
				if (this.gui.slots[slot].h != null) {
					h = this.gui.slots[slot].h;
				}
				if (this.gui.slots[slot].m == "output") {
					recipeDOM += '<div class="output w'+w+' h'+h+' ">';
					if (this.recipe.output != null)
					{
						recipeDOM += this.recipe.output.append();
					}
				}
				else
				{
					if (this.gui.slots[slot].m == "fuel")
					{
						recipeDOM += '<div class="slot w'+w+' h'+h+' ">';
						if (this.recipe.fuel != null) {
							recipeDOM += this.recipe.fuel.append();
						}
					}
					else
					{
						if (this.gui.slots[slot].m == "input")
						{
							recipeDOM += '<div class="slot w'+w+' h'+h+' ">';
							if (this.recipe.input != null) {
								recipeDOM += this.recipe.input.append();
							}
						}
						else
						{
							recipeDOM += '<div class="slot w'+w+' h'+h+' ">';
							if (this.recipe.slot[slot] != null) {
								recipeDOM += this.recipe.slot[slot].append();
							}
						}
					}
				}
				recipeDOM += '</div>';
			}
		}
		recipeDOM += '</div></div>';
		return recipeDOM;
	}
}
class CraftingTableRecipe extends GenericRecipe {
	constructor(object){
    	super(object);
    	this.name = "Верстак";
		this.arrow = '<div class="arrow w4 h2 "></div>';
		this.power = '';
		this.ctformula = "recipes.addShaped(%output%, [[%0%,%1%,%2%],[%3%,%4%,%5%], [%6%,%7%,%8%]]);";
		this.gui.slots = [
			{w:1,h:1},{w:2,h:1},{w:3,h:1},
			{w:1,h:2},{w:2,h:2},{w:3,h:2},
			{w:1,h:3},{w:2,h:3},{w:3,h:3},
			{
				w:65,
				h:2,
				m: "output"
			}
		];
	}
}
class FurnaceRecipe extends GenericRecipe {
	constructor(object){
    	super(object);
    	this.name = "Печь";
		this.arrow = '<div class="arrow w4 h2 "></div>';
		this.power = '<div class="fire w15 h2 "></div>';
		this.ctformula = "furnace.addRecipe(%output%, %input%, 1.0);";
		this.gui.slots = [
			{
				w:15,
				h:1,
				m: "input"
			},
			{
				w:15,
				h:3,
				m: "fuel"
			},
			{
				w:65,
				h:2,
				m: "output"
			}
		];
	}
}
class MaceratorRecipe extends FurnaceRecipe {
	constructor(object){
    	super(object);
    	this.name = "Дробитель";
		this.power = '<div class="power w15 h2 "></div>';
		this.arrow = '<div class="crush w35 h2 "></div>';
		this.ctformula = "Macerator.addRecipe(%output%,%input%);";
	}
}
class CompressorRecipe extends MaceratorRecipe {
	constructor(object){
    	super(object);
    	this.name = "Компрессор";
		this.arrow = '<div class="compress w35 h2 "></div>';
		this.ctformula = "Compressor.addRecipe(%output%, %input%);";
	}
}
class MetalformerRecipe extends MaceratorRecipe {
	constructor(object){
    	super(object);
    	this.name = object.mode;
		this.arrow = '<div class="metalformer w25 h2 "></div>';
	}
}
class CutterRecipe extends MaceratorRecipe {
	constructor(object){
    	super(object);
    	this.hardness = 3;
    	if (object.hardness != undefined) {
    		this.hardness = object.hardness;
    	}
    	this.name = 'Пилорама';
		this.arrow = '<div class="cutter w3 h2 "></div>';
		this.ctformula = "BlockCutter.addRecipe(%output%, %input%, "+this.hardness+");";
	}
}
class InductionSmelterRecipe extends GenericRecipe {
	constructor(object){
    	super(object);
    	this.name = "Плавильня"
		this.arrow = '<div class="arrow w4 h2 "></div>';
		this.power = '<div class="fire w15 h2 "></div>';
		this.ctformula = 'InductionSmelter.addRecipe(%output%, %0%, %1%, 1500);';
		this.gui.slots = [
			{
				w:1,
				h:1
			},
			{
				w:2,
				h:1
			},
			{
				w:15,
				h:3,
				m: "fuel"
			},
			{
				w:65,
				h:2,
				m: "output"
			}
		];
	}
}
class CircuitFabricatorRecipe extends GenericRecipe {
	constructor(object){
    	super(object);
    	this.name = "Завод Электросхем"
		this.arrow = '<div class="cf w1 h1 "></div>';
		this.power = '';
		this.ctformula = "mods.GalacticraftTweaker.addCircuitFabricatorRecipe(%output%, %0%, %1%, %2%, %3%, %4%);";
		this.gui.slots = [
			{
				w:1,
				h:1
			},
			{
				w:3,
				h:2
			},
			{
				w:3,
				h:3
			},
			{
				w:5,
				h:2
			},
			{
				w:7,
				h:1
			},
			{
				w:7,
				h:3,
				m: "output"
			}
		];
	}
}
class ReactorRecipe extends GenericRecipe {
	constructor(object){
    	super(object);
    	this.name = "Ядерный Реактор";
		this.arrow = '<div class="arrow w4 h2 "></div>';
		this.power = '';
		this.ctformula = "recipes.addShaped(%output%, [[%0%,%1%,%2%],[%3%,%4%,%5%], [%6%,%7%,%8%]]);";
		this.gui.slots = [
			{w:1,h:2},{w:2,h:15},{w:3,h:1},{w:4,h:15},{w:5,h:2},
			{w:1,h:3},{w:2,h:25},{w:3,h:2},{w:4,h:25},{w:5,h:3},
			{w:1,h:4},{w:2,h:35},{w:3,h:3},{w:4,h:35},{w:5,h:4},
			          {w:2,h:45},{w:3,h:4},{w:4,h:45},
			                     {w:3,h:5},
			{
				w:65,
				h:2,
				m: "output"
			}
		];
		this.gui.inheritedStyles = "height: calc(36px * 5);";
	}
}