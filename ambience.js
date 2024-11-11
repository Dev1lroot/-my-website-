function ambience() {

    var playnote = 0;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Функция для создания звука с быстрой атакой и затуханием (эффект щипка струны)
    function createGuitarSound(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.type = 'triangle'; // Используем треугольную волну, похожую на щипковый звук
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        // Настройка фильтра для смягчения высокочастотных шумов
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, audioContext.currentTime);

        // Подключаем осциллятор через фильтр и усиление к выходу
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Плавная атака и экспоненциальное затухание громкости, имитирующее щипок струны
        gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Начальная громкость
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration); // Затухание

        // Запускаем и останавливаем осциллятор
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration); // Останавливаем через указанное время
    }

    // Функция для проигрывания мелодии
    function playMelody(melody, start = 0, loop = false)
    {
        console.log(start)
        let currentTime = audioContext.currentTime;

        let section = melody[start];

        if(section.hasOwnProperty("note"))
        {
            createGuitarSound(section.note.frequency, section.note.duration);
        }
        if(section.hasOwnProperty("notes"))
        {
            section.notes.forEach(note => {
                createGuitarSound(note.frequency, note.duration);
            });
        }

        currentTime += section.duration;
        start += 1;

        if(start == melody.length)
        {
            start = 0;
            if(!loop) return true;
        }

        setTimeout(() => {
            playMelody(melody, start, loop)
        },1000 * section.duration);
    }
    const melody = [
        { note: new Note('E', 4, 2), duration: 0.5 },  // E4
        { note: new Note('E', 4, 0.5), duration: 0.3 },  // E4
        { note: new Note('E', 4, 0.5), duration: 0.3 },  // E4
        { note: new Note('D', 4, 0.5), duration: 0.3 },  // D4
        { note: new Note('E', 4, 1), duration: 0.5 },  // E4
        { note: new Note('F', 4, 1), duration: 0.5 },  // F4
        { note: new Note('G', 4, 1), duration: 0.5 },  // G4
        { note: new Note('F', 4, 1), duration: 0.5 },  // F4
        { note: new Note('E', 4, 1), duration: 0.5 },  // E4
        { note: new Note('D', 4, 1), duration: 0.5 },  // D4
        { note: new Note('C', 4, 1), duration: 0.5 },  // C4
        { note: new Note('E', 4, 1), duration: 0.5 },  // E4
        { note: new Note('B', 3, 1), duration: 0.5 },  // B3
        { note: new Note('E', 4, 1), duration: 0.5 },  // E4
        { note: new Note('A', 3, 1), duration: 0.5 },  // A3
        { note: new Note('B', 3, 1), duration: 0.5 },  // B3
        { note: new Note('C', 4, 1), duration: 0.5 },  // C4
        { note: new Note('D', 4, 1), duration: 0.5 }   // D4
    ];
    const bass = [
        {
            notes: [
                new Note('C', 3, 4), // C3
                new Note('G', 3, 4), // G3
                new Note('E', 3, 4)  // E3
            ],
            duration: 4 // Время, через которое будет играть следующий блок
        },
        {
            notes: [
                new Note('C', 3, 4),
                new Note('G', 3, 4),
                new Note('D', 3, 4)  // D3
            ],
            duration: 4
        },
        {
            notes: [
                new Note('E', 3, 4), // E3
                new Note('C', 3, 4),
                new Note('G', 3, 4)  // G3
            ],
            duration: 4
        },
        {
            notes: [
                new Note('C', 3, 4),
                new Note('G', 3, 4),
                new Note('E', 3, 4)  // E3
            ],
            duration: 4
        }
    ];
    playMelody(melody,0,true);
    playMelody(bass,0,true);
};