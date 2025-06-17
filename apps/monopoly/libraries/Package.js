class Package
{
    constructor(data)
    {
        this.callbacks = {};

        // Значение пакета по умолчанию
        this.init({
            path: "/dev/null",
        });

        // Значение пакета эксгумированное из конструктора
        this.init(data);
    }
    init(data)
    {
        // Если передан объект то все окич
        if(typeof data === 'object')
        {
            if(data.hasOwnProperty('path') && typeof data.path === 'string')
            {
                this.path = data.path;
            }
            else
            {
                throw new Error(`Forbidden path type '${typeof data.path}' for 'Package'`);
            }
        }
        else
        {
            throw new Error("Attempted to initialize `Package` from undefined");
        }
    }
    on(path, callback)
    {
        this.callbacks[path] = callback;
    }
    serve()
    {
        if(this.path in this.callbacks)
        {
            console.log(`Received: '${this.path}' request`);
            this.callbacks[this.path](this);
        }
        else
        {
            console.log(`No actions for: '${this.path}' request found`);
        }
    }
    serialize()
    {
        return JSON.stringify(this);
    }
}