class Item extends GameObject
{
	constructor(name,registry_name)
	{
		super(name,registry_name);
		this.type = "item";
	}
}