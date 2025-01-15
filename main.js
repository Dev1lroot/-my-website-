var app = Vue.createApp({
    data() {
        return {
            my: {
                life: {
                    spent: 0,
                    remaining: 0,
                    percent: 0,
                    text: "",
                    events: [
                        {
                            title: "Life in Russia",
                            color: "rgb(94, 57, 9)",
                            times: {
                                from: new Date("1999-04-25T16:00:00+03:00").getTime(),
                                to:   new Date("2022-05-06T18:00:00+05:00").getTime()
                            }
                        },
                        {
                            title: "Imprisonment",
                            color: "#AF0000",
                            times: {
                                from: new Date("2022-05-06T18:00:00+05:00").getTime(),
                                to:   new Date("2022-08-08T15:00:00+05:00").getTime()
                            }
                        },
                        {
                            title: "Life in Russia",
                            color: "rgb(94, 57, 9)",
                            times: {
                                from: new Date("2022-05-06T18:00:00+05:00").getTime(),
                                to:   new Date("2022-11-12T22:00:00+03:00").getTime()
                            }
                        },
                        {
                            title: "Life in Armenia",
                            color: "#FF7F27",
                            times: {
                                from: new Date("2022-11-12T22:00:00+03:00").getTime(),
                                to:   new Date("2023-02-05T02:00:00+04:00").getTime()
                            }
                        },
                        {
                            title: "Life in republic of Georgia",
                            color: "#F8FF1A",
                            times: {
                                from: new Date("2023-02-05T02:00:00+04:00").getTime(),
                                to:   new Date("2024-06-11T15:00:00+04:00").getTime()
                            }
                        },
                        {
                            title: "Life in France",
                            color: "#00AF00",
                            times: {
                                from: new Date("2024-06-11T15:00:00+04:00").getTime(),
                                to:   new Date().getTime()
                            }
                        }
                    ]
                }
            },
            navigation: [
                { active: true, path: "",           icon: "fa-solid fa-house",          displayName: "Main" },
                { active: true, path: "activity",   icon: "fa-solid fa-person-running", displayName: "Activity" },
                { active: true, path: "bio",        icon: "fa-solid fa-book-skull",     displayName: "Bio" },
                { active: true, path: "projects",   icon: "fa-solid fa-code-branch",    displayName: "Projects" },
                { active: true, path: "contact_me", icon: "fa-solid fa-envelope",       displayName: "Contact Me" }
            ],
            window: {
                innerWidth: 0,
            },
            project: {
                id: 0,
                slide: 0,
            },
            projects: [
                {
                    title: "Russian Detention Simulator",
                    description: "Russian Prison Simulator, based on my story of imprisonment, with my own prison cell",
                    keywords: ["Unreal Engine 5","Games"],
                    slideshow: new slideshow([
                        "https://www.youtube.com/embed/KZ41UXnwYY0?si=SO33L76Jy8-dCqup",
                        "/uploads/sizo_simulator/screenshots/01.png",
                        "/uploads/sizo_simulator/screenshots/02.jpg",
                        "/uploads/sizo_simulator/screenshots/03.jpg",
                        "/uploads/sizo_simulator/screenshots/04.jpg",
                        "/uploads/sizo_simulator/screenshots/05.jpg",
                        "/uploads/sizo_simulator/screenshots/06.jpg",
                    ])
                },
                {
                    title: "Commandline Mineswepper Written in Nim Language",
                    description: "A Mineswepper example written in Nim Language",
                    keywords: ["Nim"],
                    slideshow: new slideshow([
                        "https://github.com/Dev1lroot/NimSwepper/raw/main/screenshot.png",
                    ]),
                    link: "https://github.com/Dev1lroot/NimSwepper"
                },
                {
                    title: "ICAO-9303 MRTD Editor Software",
                    description: "ICAO-9303 Machine Readable Travel Documents designing and development software",
                    keywords: ["Vue","Javascript","Web"],
                    slideshow: new slideshow([]),
                    link: "https://github.com/Dev1lroot/MRTDCAD"
                },
                {
                    title: "RobCo Industries (TM) Termlink Emulator",
                    description: "Fallout terminal simulator for fans",
                    keywords: ["Nim"],
                    slideshow: new slideshow([]),
                    link: "https://github.com/Dev1lroot/robco"
                },
            ],
            languages: [
                { code: "en-GB", name: "English" },
                { code: "es-ES", name: "Español" },
                { code: "fr-FR", name: "Français" },
                { code: "de-DE", name: "Deutsch" },
                { code: "uk-UA", name: "Українська" },
                { code: "ru-RU", name: "Русский" },
                { code: "he-IL", name: "עִבְרִית" },
                { code: "ar-AE", name: "العربية" },
                { code: "hi-IN", name: "हिन्दी" },
                { code: "zh-CN", name: "中文" },
                { code: "ko-KR", name: "한국어" },
                { code: "ja-JP", name: "日本語" }
            ],
            contact: {
                form: {
                    subject: "",
                    email: "",
                    message: ""
                }
            },
            recaptcha: {
                public: "6Lelm6AnAAAAAFl6VKXRyvHLYWWOfSDm4msWfXzn"
            },
            page: "",
            dialogs: []
        }
    },
    methods: {
        initSending: function()
        {
            this.openDialog("confirm_message");
            setTimeout(()=>{
                this.initReCaptcha();
            },100);
        },
        calculateDuration(event)
        {
            return event.times.to - event.times.from;
        },
        calculatePercentage(event)
        {
            let totalDuration = 0;
            let eventDuration = this.calculateDuration(event);

            for(let e of this.my.life.events) totalDuration += this.calculateDuration(e);

            if(totalDuration == 0) return 0;

            return (eventDuration / totalDuration) * 100;
        },
        sendMessage: function(token)
        {
            let send = this.contact.form;
            send.token = token;         
            fetch("/api/messages/send",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(send)
            }).then((resp) => {
                if(resp.ok)
                {
                    app.closeDialog("confirm_message");
                    app.openDialog("message_sent");
                    app.contact.form.message = "";
                    app.contact.form.subject = "";
                }
            })
        },
        initReCaptcha: function()
        {
            grecaptcha.render('send-me-message-rc', {
                'sitekey': this.recaptcha.public,
                'callback': this.sendMessage,
                'expired-callback': setTimeout(()=>{this.initReCaptcha(),1000})
            });
        },
        viewProject: function(id)
        {
            this.project.slide = 0;
            this.project.id = id;
            this.dialogs.push("project_preview");
        },
        updateDavy: function()
        {
            const days_in_year = 365.2419;
            const avg_life_expectancy_france = 79
            const avg_life_expectancy_russia = 68
            const life_expectancy_davy = (avg_life_expectancy_france + avg_life_expectancy_russia) / 2;

            this.my.life.spent = new Date().getTime() - new Date("1999-04-25T16:00:00+03:00").getTime();
            this.my.life.remaining = 3600*24*days_in_year*life_expectancy_davy*1000;
            this.my.life.percent = (this.my.life.spent / this.my.life.remaining) * 100;
        },
        convertTimeToStr: function(ms)
        {
            // Константы для расчетов
            const millisecondsInASecond = 1000;
            const secondsInAMinute = 60;
            const minutesInAnHour = 60;
            const hoursInADay = 24;
            const daysInAYear = 365.2419;
        
            // Преобразование миллисекунд в секунды
            let totalSeconds = ms / millisecondsInASecond;
        
            // Массив для хранения частей времени
            const params = [];
        
            // Вычисляем количество лет
            const years = Math.floor(totalSeconds / (daysInAYear * hoursInADay * secondsInAMinute * minutesInAnHour));
            if (years > 0) {
                params.push(`${years}y`);
            }
            totalSeconds %= (daysInAYear * hoursInADay * secondsInAMinute * minutesInAnHour);
        
            // Вычисляем количество дней
            const days = Math.floor(totalSeconds / (hoursInADay * secondsInAMinute * minutesInAnHour));
            if (days > 0) {
                params.push(`${days}d`);
            }
            totalSeconds %= (hoursInADay * secondsInAMinute * minutesInAnHour);
        
            // Вычисляем количество часов
            const hours = Math.floor(totalSeconds / (secondsInAMinute * minutesInAnHour));
            if (hours > 0) {
                params.push(`${hours}h`);
            }
            totalSeconds %= (secondsInAMinute * minutesInAnHour);
        
            // Вычисляем количество минут
            const minutes = Math.floor(totalSeconds / secondsInAMinute);
            if (minutes > 0) {
                params.push(`${minutes}m`);
            }
            totalSeconds %= secondsInAMinute;
        
            // Остаток - это секунды
            const seconds = Math.floor(totalSeconds);
            if (seconds > 0) {
                params.push(`${seconds}s`);
            }
        
            // Форматируем строку для вывода
            return params.join(" ");
        },
        closeDialog: function(name)
        {
            var o = [];
            for(let dialog of this.dialogs) if(dialog != name) o.push(dialog);
            this.dialogs = o;
        },
        openDialog: function(name)
        {
            this.dialogs.push(name);
        },
        adaptivity: function()
        {
            this.window.innerWidth = window.innerWidth;
        }
    },
    mounted() {
        setInterval(() => {
            this.updateDavy();
        }, 1000);
        window.addEventListener('resize', this.adaptivity());
        this.adaptivity();
    }
});
app.mount("main");