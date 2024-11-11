class Note {
    constructor(note, octave, duration = 0.5) {
        this.note = note;
        this.octave = octave;
        this.frequency = this.calculateFrequency();
        this.duration = duration;
    }

    // Список полутонов относительно ноты A4 (440 Гц)
    static noteSemitoneOffsets = {
        'C': -9,
        'C#': -8,
        'D': -7,
        'D#': -6,
        'E': -5,
        'F': -4,
        'F#': -3,
        'G': -2,
        'G#': -1,
        'A': 0,  // Нота A4 это референс с частотой 440 Гц
        'A#': 1,
        'B': 2
    };

    // Вычисление частоты по формуле
    calculateFrequency() {
        const A4_FREQUENCY = 440; // Частота ноты A4
        const semitoneOffset = Note.noteSemitoneOffsets[this.note]; // Смещение полутонов относительно A4
        const octaveOffset = (this.octave - 4) * 12; // Смещение по октавам (каждая октава 12 полутонов)
        const totalOffset = semitoneOffset + octaveOffset; // Общий сдвиг полутонов

        // Вычисляем частоту
        return A4_FREQUENCY * Math.pow(2, totalOffset / 12);
    }
}