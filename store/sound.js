export const state = () => ({
  oscillator1: null,
  oscillator2: null,
  mixedOscillator: null,
  gainNode: null,
  gainNode2: null
});

export const mutations = {
  playSound(state, payload) {
    console.log(payload);
    var ctx = new AudioContext();
    var analyser = ctx.createAnalyser();

    switch (payload.target_osc) {
      case "oscillator1":
        state.gainNode = ctx.createGain();
        state.gainNode.gain.value = payload.gain;
        state.oscillator1 = ctx.createOscillator();
        state.oscillator1.type = payload.frequencyType;
        state.oscillator1.frequency.setValueAtTime(
          payload.frequency,
          ctx.currentTime
        );
        state.oscillator1.connect(state.gainNode).connect(analyser);
        state.gainNode.connect(ctx.destination);
        state.oscillator1.start(0);
        break;
      case "oscillator2":
        state.gainNode2 = ctx.createGain();
        state.gainNode2.gain.value = payload.gain;
        state.oscillator2 = ctx.createOscillator();
        state.oscillator2.type = payload.frequencyType;
        state.oscillator2.frequency.setValueAtTime(
          payload.frequency,
          ctx.currentTime
        );
        state.oscillator2.connect(state.gainNode2).connect(analyser);
        state.gainNode2.connect(ctx.destination);
        state.oscillator2.start(0);
        break;
      case "mixedOscillator":
        //Sound1
        var oscillator1 = ctx.createOscillator();
        oscillator1.type = payload.sound1.frequencyType;
        oscillator1.frequency.setValueAtTime(
          payload.sound1.frequency,
          ctx.currentTime
        );
        var gainNode = ctx.createGain();
        gainNode.gain.value = payload.sound1.gain;
        //Sound2
        var oscillator2 = ctx.createOscillator();
        oscillator2.type = payload.sound2.frequencyType;
        oscillator2.frequency.setValueAtTime(
          payload.sound2.frequency,
          ctx.currentTime
        );
        var gainNode2 = ctx.createGain();
        gainNode2.gain.value = payload.sound2.gain;

        //ローパスフィルター
        var vcf = ctx.createBiquadFilter();
        vcf.type = "lowpass";
        vcf.frequency.value = 20000;

        var gainVcf = ctx.createGain();
        gainVcf.gain.value = 1.0;

        state.mixedOscillator = ctx.createOscillator();
        //接続
        state.mixedOscillator.connect(oscillator1.frequency);
        state.mixedOscillator.connect(oscillator2.frequency);
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode2);
        gainNode.connect(vcf);
        gainNode2.connect(vcf);
        vcf.connect(gainVcf).connect(analyser);
        gainVcf.connect(ctx.destination);
        break;
      default:
        break;
    }

    if(payload)
    //Draw Waveform
    analyser.fftSize = 2048; // The default value
    //var canvas = this.$refs.canvas;
    var canvasContext = payload.canvas.getContext("2d");
    payload.intervalid = window.setInterval(function() {
      // Clear previous data
      canvasContext.clearRect(
        0,
        0,
        payload.canvas.width,
        payload.canvas.height
      );
      // Get data for drawing sound wave
      var times = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(times);
      // Draw sound wave
      canvasContext.beginPath();
      for (var i = 0, len = times.length; i < len; i++) {
        var x = (i / len) * payload.canvas.width;
        var y = (1 - times[i] / 255) * payload.canvas.height;
        if (i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }
      }
      canvasContext.strokeStyle = "rgba(0, 0, 255, 1.0)";
      canvasContext.lineWidth = 2;
      canvasContext.lineCap = "round";
      canvasContext.lineJoin = "miter";
      canvasContext.stroke();
    }, 100);
    console.log(state.oscillator);
  },


  stopSound(state, payload) {
    switch (payload.target_osc) {
      case "oscillator1":
        state.oscillator1.stop(0);
        if (payload.intervalid !== null) {
          window.clearTimeout(payload.intervalid);
          payload.intervalid = null;
        }
        break;
      case "oscillator2":
        state.oscillator2.stop(0);
        if (payload.intervalid !== null) {
          window.clearTimeout(payload.intervalid);
          payload.intervalid = null;
        }
        break;
      case "mixedOscillator":
      default:
        break;
    }
  }
};
