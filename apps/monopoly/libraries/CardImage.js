export default class CardImage
{
    constructor(card, type = "default")
    {
        this.card = card;
        this.type = type;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 200;
        this.canvas.height = 400;

        this.ctx = this.canvas.getContext('2d');

        if(type == "square") this.canvas.width = 400;

        this.drawFrame();
            
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = '#000';

        this.drawTitle();
        this.drawStatus();
    }

    // Рисование рамки карточки
    drawFrame()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(2, 2, this.canvas.width-4, this.canvas.height-4);

        this.ctx.fillStyle = this.card.color;
        this.ctx.fillRect(2, 2, this.canvas.width-4, 25);
    }

    // Рисование построчного текста
    drawText(rows,position,line_height = 32)
    {
        const initial = ((rows.length * line_height) / 2) - line_height/2;

        for(let r in rows)
        {
            const y = position.y + (r * line_height) - initial;
            this.ctx.fillText(rows[r], position.x, y);
        }
    }

    // Рисование названия на карте
    drawTitle()
    {
        if(this.type == "default")
        {
            let name = this.card.title;
            let rows = [name];
            if(name.length > 10 && name.includes(" ")) rows = name.split(/ /g);

            // Пишем название
            this.drawText(rows,{
                x: this.canvas.width/2,
                y: this.canvas.height/2 - 120
            },26);
        }
        else
        {
            const rotateAngle = Math.PI / 4;

            this.ctx.rotate(rotateAngle);

            const cx =  Math.cos(rotateAngle) * this.canvas.width/2 + Math.sin(rotateAngle) * this.canvas.height/2;
            const cy = -Math.sin(rotateAngle) * this.canvas.width/2 + Math.cos(rotateAngle) * this.canvas.height/2;

            // Пишем название
            this.ctx.fillText(this.card.title, cx, cy);

            this.ctx.rotate(-rotateAngle);
        }
    }

    // Рисование статуса на карте
    drawStatus()
    {
        if(this.card.price > 0)
        {
            if(this.card.owner.length > 0)
            {
                if(this.card.laid)
                {
                    this.ctx.fillText("ЗАЛОЖЕНО", this.canvas.width/2, this.canvas.height-30);
                }
                else
                {
                    this.ctx.fillText("КУПЛЕНО", this.canvas.width/2, this.canvas.height-30);
                }
            }
            else
            {
                this.ctx.fillText(`$`+this.card.price, this.canvas.width/2, this.canvas.height-30);
            }
        }
    }
}