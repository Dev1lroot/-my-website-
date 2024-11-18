export var app = new Vue({
    el: "main",
    data: {
        updatePlayer: function () {
            this.client.socket.send(JSON.stringify({
                path: "update_player",
                data: this.modal.data
            }));
            this.modal.name = "";
        },
        lock: false,
        turn: {
            uuid: "",
            name: "",
        },
        need_update: true,
        trades: [],
        sounds: {
            dices: new Audio("assets/sounds/dices.mp3"),
            curse: new Audio("assets/sounds/curse.mp3"),
            bonus: new Audio("assets/sounds/bonus.mp3"),
            money: new Audio("assets/sounds/money.mp3")
        },
        prepareUpdate: function(){
            const p = this.getPlayer(this.player.uuid);
            this.modal.name = "player";
            this.modal.data = {
                name: p.name,
                color: p.color,
                model: p.model,
            }
        },
        player: {
            uuid: "",
            name: "",
            buffs: [],
            balance: 0,
        },
        modal: {
            name: "",
            data: {}
        },
        notifications: {
            queue: [],
            add: function(data,time = 3000)
            {
                data.time = time;
                this.queue.push(data);
            },
            tickUpdate()
            {
                // Если сейчас нет уведомления и в очереди есть хоть одно уведомление
                if(app.modal.name == "" && this.queue.length > 0)
                {
                    // Берем первое же уведомление из очереди
                    const record = this.queue[0];

                    // Устанавливаем его как модалку
                    app.modal = record;

                    // Проверяем наличие эффекта
                    if(record.data.hasOwnProperty("effect"))
                    {
                        // Если эффект положительный то
                        if(record.data.effect > 0) app.sounds.money.play();
                        if(0 > record.data.effect) app.sounds.curse.play();
                    }
                    
                    // Устанавливаем срок его жизни
                    if(record.time > 0)
                    {
                        setTimeout(() => {
                            app.modal.name = "";
                        },record.time);
                    }

                    // Удаляем из очереди
                    this.queue.splice(0);
                }
            }
        },
        openTrade(uuid)
        {
            for(let t of this.trades)
            {
                if(t.uuid === uuid)
                {
                    t.destination = "";
                    this.modal.data = t;
                    this.modal.name = "trade";
                }
            }
        },
        prepareTrade(to_uuid)
        {
            this.modal.data = {
                a: {
                    uuid: this.player.uuid,
                    rows: [],
                },
                b: {
                    uuid: to_uuid,
                    rows: []
                },
                uuid: "",
                status: "EDITING",
                destination: "",
            }
            this.modal.name = "trade";
        },
        getPlayer(uuid)
        {
            for(let p of this.players)
            {
                if(p.uuid == uuid) return p;
            }
            return {};
        },
        cards: [],
        getPositionsInCircleOf(origin,distance,count)
        {
            if(count == 1) return [origin];

            const step = 1 / count;
            var positions = [];

            for(var i = 0; i < count; i++)
            {
                const angle = (step*i) * 2 * Math.PI;

                positions.push({
                    x: origin.x + distance * Math.cos(angle),
                    y: origin.y + distance * Math.sin(angle),
                })
            }

            return positions;
        },
        ownedCardsOfSet(color)
        {
            let owned_cards = 0;
            for(let card of this.cards)
            {
                if(card.owner == this.player.uuid && card.color == color)
                {
                    owned_cards += 1;
                    console.log(card);
                }
            }
            return owned_cards;
        },
        getBoardPositionByTurn(turn)
        {
            const board  = 600;
            const q = turn % 40;
            const offset = 90;
            const interval = 46.7;

            var x = 0;
            var y = 0;

            if(q == 0)
            {
                x = offset/2;
                y = offset/2
            }
            if(q > 0)
            {
                x = offset/2;
                y = (q-1) * interval + (interval/2 + offset);
            }
            if(q == 10)
            {
                x = offset/2;
                y = board - offset/2;
            }
            if(q > 10)
            {
                x = (q-11) * interval + (interval/2 + offset);
                y = board - offset/2;
            }
            if(q == 20)
            {
                x = board  - offset/2;
                y = board - offset/2;
            }
            if(q > 20)
            {
                x = board  - offset/2;
                y = (9 - (q-20)) * interval + (interval/2 + offset);
            }
            if(q == 30)
            {
                x = board  - offset/2;
                y = offset/2;
            }
            if(q > 30)
            {
                x = (9 - (q-30)) * interval + (interval/2 + offset);
                y = offset/2;
            }

            return {x: x, y: y};
        },
        playersGroupedByFolds: function()
        {
            // Отмечаем одну из 40 блоков
            var folds = {

            };

            // Рисуем игроков
            for(let player of app.players)
            {
                const q = player.turn % 40;                
                if(folds.hasOwnProperty(q) && Array.isArray(folds[q]))
                {
                    folds[q].push(player);
                }
                else
                {
                    folds[q] = [];   
                    folds[q].push(player);
                }
            }

            return folds;
        },
        client: {
            socket: "",
            request: function(path,data = {})
            {
                this.socket.send(JSON.stringify({
                    path: path,
                    data: data
                }));
            },
            connect: function()
            {
                const ip = prompt("IP:","localhost:3000");
                this.socket = new WebSocket(`ws://${ip}`);
                this.socket.addEventListener('open', (event) => {
                    console.log("socket open");

                    this.request("players");
                    this.request("game");

                });
                this.socket.addEventListener('message', (event) => {
                    try{
                        const r = JSON.parse(event.data);
                        //console.log(r);

                        if(r.path == "player")
                        {
                            app.player = r.data;
                        }
                        if(r.path == "players")
                        {
                            app.players = r.data;
                            document.title = app.getPlayer(app.player.uuid).name + " | Чайнаполия";
                        }
                        if(r.path == "game")
                        {
                            app.turn   = r.data.turn;
                            app.lock   = r.data.lock;
                            app.cards  = r.data.cards;
                            app.trades = r.data.trades;
                            
                            // for(let i in app.cards)
                            // {
                            //     app.cards[i].level = 3;
                            // }

                            app.need_update = true;
                            document.getElementById("game").style = "";
                        }
                        if(r.path == "dices")
                        {
                            app.notifications.add({
                                name: "dices",
                                data: r.data
                            },1000);
                        }
                        if(r.path == "alert")
                        {
                            app.notifications.add({
                                name: "alert",
                                data: r.data
                            },5000);
                        }
                        if(r.path == "prompt")
                        {
                            app.notifications.add({
                                name: "prompt",
                                data: r.data // { type: trade, trade: id }
                            },0);
                        }
                    }
                    catch(e)
                    {
                        console.error(e);
                    }
                });
                this.socket.addEventListener('error', (event) => {
                    console.error('WebSocket error:', event);
                    app.players = [];
                    alert("Соединение Потеряно");
                    app.client.connect();

                });
                this.socket.addEventListener('close', (event) => {
                    console.log('WebSocket connection closed');
                    document.getElementById("game").style = "display: none;";
                });
            }
        },
        players: []
    }
});