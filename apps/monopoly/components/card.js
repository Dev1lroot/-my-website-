import { app } from './../main.js';
Vue.component('card', {
    props: ['player','card','card_id'],
    data() {
		return {
            // player: {
            //     uuid: "",
            //     name: "",
            // },
            // card_id: 0,
			// card: {
            //     owner: "",
            //     laid: false,
            //     rent: 0,
            //     price: 0,
            //     level: 0,
            //     laid_price: 0,
            //     sell_price: 0,
            // }
		};
	},
    methods: {
        isOwned()
        {
            return (this.card.owner.length != 0);
        },
        isYourProperty()
        {
            return (this.player.uuid == this.card.owner);
        },
        getOwner()
        {
            return app.getPlayer(this.card.owner);
        },
        getStatus()
        {
            if(this.card.laid) return "ЗАЛОЖЕНО";
            if(this.card.owner.length == 0) return "ПРОДАЁТСЯ";
            if(this.isYourProperty()) return "СОБСТВЕННОСТЬ";
            if(this.isOwned()) return "СОБСТВЕННОСТЬ";
            return "";
        },
        getRentPrice()
        {
            return this.card.rent * (this.card.level+1);
        }
    },
    template: `
    <div class="card">
        <label :style="{ backgroundColor: card.color }">{{card.title}}</label>
        <center v-if="card.price > 0"><h3>{{ getStatus() }}</h3></center>
        <div class="purchase" v-if="card.price > 0 && card.type == 'estate'">
            <center>Арендная плата: $ {{ getRentPrice() }}</center>
            <div class="houses">
                <img v-if="card.level > 0" src="assets/images/house.png">
                <img v-if="card.level > 1" src="assets/images/house.png">
                <img v-if="card.level > 2" src="assets/images/house.png">
                <a 
                    v-if="3 > card.level && $parent.ownedCardsOfSet(card.color) == 3" 
                    :alt="'Купить дом за '+card.price"
                    :title="'Купить дом за '+card.price"
                    class="blink"
                    @click="$parent.client.request('upgrade',{card: card_id})">
                    <img src="assets/images/add-house.png">
                </a>
            </div>
            <div class="purchase" style="font-size: 10px;">
                Базовая арендная плата {{card.rent}} умножается за каждый построенный дом
            </div>
        </div>
        <div class="purchase" v-if="card.lore.length > 0" style="font-size: 10px;">
            {{card.lore}}
        </div>
        <div class="purchase" v-if="isYourProperty() && card.laid">
            <button @click="$parent.client.request('sell',  {card: card_id})">$ {{card.sell_price - card.laid_price}} | Продать</button>
            <button @click="$parent.client.request('unlaid',{card: card_id})">$ {{card.price}} | Выкупить</button>
        </div>
        <div class="purchase" v-if="isYourProperty() && !card.laid">
            <button @click="$parent.client.request('sell',{card: card_id})">$ {{card.sell_price}} | Продать</button>
            <button @click="$parent.client.request('laid',{card: card_id})">$ {{card.laid_price}} | Заложить</button>
        </div>
        <div class="purchase" v-if="!isOwned() && card.price > 0">
            <button @click="$parent.client.request('buy',{card: card_id})">$ {{card.price}} | Купить</button>
        </div>
        <div class="purchase" v-if="isOwned() && !isYourProperty()">
            <center>ВЛАДЕЛЕЦ</center>
            <center style="font-weight: bolder;">{{ getOwner().name }}</center>
        </div>
    </div>`
});