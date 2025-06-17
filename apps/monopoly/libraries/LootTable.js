export default class LootTable
{
    constructor(array)
    {
        this.array = array;
    }
    randomItem()
    {
        // Generate a random index within the array length
        const randomIndex = Math.floor(Math.random() * this.array.length);
    
        // Return the random item from the array
        return this.array[randomIndex];
    }
}