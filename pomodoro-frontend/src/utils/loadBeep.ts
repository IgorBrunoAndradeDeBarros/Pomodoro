import gravitationalBeep from '../assets/audios/freesoundsforyou-gravity-coil-sound-195556.mp3';

export function loadBeep() {
    const audio = new Audio(gravitationalBeep);
    audio.load();

    return () => {
        audio.currentTime = 0;
        audio.play().catch(error => console.log('Erro ao tocar áudio', error));
    };
}
