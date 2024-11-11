class slideshow
{
    constructor(slides = [])
    {
        this.position = 0;
        this.slides   = [];

        for(let slide of slides)
        {
            let frame = {
                data: slide,
                type: "image"
            }
            if(slide.includes("youtube")) frame.type = "youtube";
            this.slides.push(frame);
        }
    }
    next()
    {
        if(this.position >= this.slides.length - 1)
        {
            this.position = 0;
        }
        else
        {
            this.position += 1;
        }
        console.log(this.position)
    }
    prev()
    {
        if(this.position > 0)
        {
            this.position -= 1;
        }
        else
        {
            this.position = this.slides.length - 1;
        }
        console.log(this.position)
    }
    current()
    {
        return this.slides[this.position];
    }
}