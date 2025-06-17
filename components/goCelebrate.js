import confetti from 'canvas-confetti'

export const goCelebrate = () =>{
    // this.setCelebrateClass(true);
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'],
        disableForReducedMotion: false
    })

}