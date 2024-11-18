import { app } from './../main.js';
Vue.component('add-item', {
    props: ['player','destination'],
    data(){
        return {
            type: "card",
            item: -1
        }
    },
    methods: {
        getCard(id)
        {
            return app.cards[id]
        },
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
        getOwnedCards()
        {
            // Берем только те карты которые есть у пользователя
            let o = [];
            for(let i in app.cards)
            {
                let card = app.cards[i];
                card.id = i;
                if(card.owner == this.player.uuid) o.push(card);
            }

            // Берем из тех карт что есть у пользователя, только те что еще не добавлены в корзину
            let o2 = [];
            let already_in_cart = [];
            for(let i in app.modal.data[this.destination].rows)
            {
                // Берем все карты в корзине и хуярим в массив already_in_cart
                const item = app.modal.data[this.destination].rows[i];
                if(item.type == "card") already_in_cart.push(Number(item.item));
            }

            // Убираем лишнее
            for(let i of o) if(!already_in_cart.includes(Number(i.id))) o2.push(i);

            return o2;
        },
        tabs()
        {
            // Дефайним вкладки
            let tabs = [{
                type: "card", name: "Карточки", class: ""
            },{
                type: "cash", name: "Деньги", class: ""
            }];

            // Определяем активную вкладку
            for(let i in tabs) if(tabs[i].type == this.type) tabs[i].class = "active";
            
            return tabs;
        },
        send()
        {
            this.item = Number(this.item);

            if(typeof this.item == "number")
            {
                if(this.type == "cash")
                {
                    if(this.item > 0)
                    {
                        if(this.player.balance >= this.item)
                        {
                            app.modal.data[this.destination].rows.push({
                                type: "cash",
                                item: this.item
                            });
                            app.modal.data.destination = "";
                        }
                        else
                        {
                            alert("Сумма не может превышать баланс игрока");
                        }
                    }
                    else
                    {
                        alert("Сумма не может быть отрицательной");
                    }
                }
                if(this.type == "card")
                {
                    let found = false;
                    for(let card of this.getOwnedCards())
                    {
                        if(Number(card.id) == Number(this.item))
                        {
                            found = true;
                            app.modal.data[this.destination].rows.push({
                                type: "card",
                                item: this.item
                            });
                            app.modal.data.destination = "";
                        }
                    }
                    if(!found) alert("Выберите карту!");
                }
            }
            else
            {
                alert("Вы не можете ввести рандомную хуйню");
            }
        }
    },
    template: `
    <div class="item">
        <div class="tabs">
            <a v-for="t in tabs()" @click="type = t.type" :class="t.class">{{t.name}}</a>
        </div>
        <div v-if="type == 'cash'">
            Введите сумму:
            <input type="number" v-model="item">
            <button @click="send()">Подтвердить</button>
        </div>
        <div v-if="type == 'card'">
            Выберите карту:
            <div class="items">
                <a v-for="c in getOwnedCards()" class="item" @click="item = c.id; send();">
                    <div>
                        <center>
                            <div style="width: 32px; height: 32px; border-radius: 50%" :style="{ backgroundColor: getCard(c.id).color }"></div>
                        </center>
                        <center style="font-weight: bolder;">{{c.title}}</center>
                        <center>{{drawHouses(c.id)}}</center>
                        <center style="font-size: 10px;">{{drawStatus(c.id)}}</center>
                    </div>
                </a><center>
            </center>
            </div>
        </div>
    </div>`
});