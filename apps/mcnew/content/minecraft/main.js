var minecraft = new Minecraft(root);

// Создание экземпляров предметов
minecraft.createBlock(new Block("Glass","glass").addTag("mineral"));
minecraft.createBlock(new Block("Granite","granite").tagged(["mineral","mineral_block"]));
minecraft.createBlock(new Block("Andesite","andesite").tagged(["mineral","mineral_block"]));
minecraft.createItem(new Item("Flint","flint").addTag("silicon"));
minecraft.createItem(new Item("Redstone Dust","redstone"));
minecraft.createItem(new Item("Quartz","quartz"));