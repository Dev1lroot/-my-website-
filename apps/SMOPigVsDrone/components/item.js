import { app } from './../main.js';
Vue.component('item', {
    props: ['item'],
    data() {
		return {

		};
	},
    methods: {
        drawHouses(card_id)
        {
            const card = this.getCard(card_id);
            if(card.level == 0) return "домов нет";
            return "*".repeat(card.level);
        },
        drawStatus(card_id)
        {
            const card = this.getCard(card_id);
            return (card.laid) ? "ЗАЛОЖЕНА" : "СОБСТВЕННОСТЬ";
        },
        getCard(id)
        {
            return app.cards[id]
        },
        getDisplay()
        {
            if(this.item.type == "cash") return `$`+this.item.item;
            if(this.item.type == "card") return this.getCard(this.item.item).title;
            return "NULL";
        },
    },
    template: `
    <div class="item">
        <slot></slot>
        <div v-if="item.type == 'card'">
            <center>
                <div style="width: 32px; height: 32px; border-radius: 50%" :style="{ backgroundColor: getCard(item.item).color }"></div>
            </center>
            <center style="font-weight: bolder;">{{ getCard(item.item).title }}</center>
            <center>{{ drawHouses(item.item) }}</center>
            <center style="font-size: 10px;">{{ drawStatus(item.item) }}</center>
        </div>
        <div v-if="item.type == 'cash'">
            <center style="font-weight: bolder;">\${{ item.item }}</center>
            <center style="font-size: 10px;">СУММА ДЕНЕГ</center>
        </div>
    </div>`
});