const playSound = (oscillator, frequencyType, frequency, gain) => {
    var ctx = new AudioContext();
    oscillator = ctx.createOscillator();
    oscillator.type = frequencyType;
    oscillator.frequency.setValueAtTime(
      frequency,
      ctx.currentTime
    );
    var gainNode = ctx.createGain();
    gainNode.gain.value = gain;
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination);
    oscillator.start(0);
}

const stopSound = (oscillator, isPlaying, intervalid) => {
  oscillator.stop(0);
  isPlaying = false;
  if (intervalid !== null) {
    window.clearTimeout(intervalid);
    intervalid = null;
  }
}

const setter = (test, test1) => {
  test = test1
}


export default ({}, inject) => {
  inject('playSound', playSound);
  inject('stopSound', stopSound);
  inject('setter', setter);

}
