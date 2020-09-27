<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-col cols="6" sm="12" md="6" align="center" justify="center">
                <v-card class="pa-6　mx-auto" outlined>
                  <v-card-title>Sound 1</v-card-title>
                  <v-radio-group
                    row
                    class="pa-6"
                    label="Sound Type"
                    v-model="sound1.frequencyType"
                    :mandatory="true"
                  >
                    <v-radio label="sine" value="sine"></v-radio>
                    <v-radio label="square" value="square"></v-radio>
                    <v-radio label="sawtooth" value="sawtooth"></v-radio>
                    <v-radio label="triangle" value="triangle"></v-radio>
                  </v-radio-group>
                  <v-slider
                    label="Frequency"
                    v-model="sound1.frequency"
                    thumb-label="always"
                    class="pa-6"
                    :thumb-size="35"
                    :max="2000"
                    :min="100"
                    hide-details
                  >
                  </v-slider>
                  <v-slider
                    label="Gain"
                    v-model="sound1.gain"
                    thumb-label="always"
                    class="pa-6"
                    :thumb-size="35"
                    :min="0"
                    :max="0.5"
                    :step="0.01"
                    hide-details
                  >
                  </v-slider>
                  <v-row align-content="end" justify="center">
                    <v-col cols="4">
                      <v-card-actions class="pa-6">
                        <v-btn color="primary" @click="audioPlay">play</v-btn>
                        <v-btn color="primary" @click="audioStop">stop</v-btn>
                      </v-card-actions>
                    </v-col>
                    <v-col cols="8">
                      <v-card-subtitle class="text-body-1"
                        >Waveform Preview</v-card-subtitle
                      >
                      <canvas ref="canvas1"></canvas>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="6" sm="12" md="6" align="center" justify="center">
                <v-card class="pa-6　mx-auto" outlined>
                  <v-card-title>Sound 2</v-card-title>
                  <v-radio-group
                    row
                    class="pa-6"
                    label="Sound Type"
                    v-model="sound2.frequencyType"
                    :mandatory="true"
                  >
                    <v-radio label="sine" value="sine"></v-radio>
                    <v-radio label="square" value="square"></v-radio>
                    <v-radio label="sawtooth" value="sawtooth"></v-radio>
                    <v-radio label="triangle" value="triangle"></v-radio>
                  </v-radio-group>
                  <v-slider
                    label="Frequency"
                    v-model="sound2.frequency"
                    thumb-label="always"
                    class="pa-6"
                    :thumb-size="35"
                    :max="2000"
                    :min="100"
                    hide-details
                  >
                  </v-slider>
                  <v-slider
                    label="Gain"
                    v-model="sound2.gain"
                    thumb-label="always"
                    class="pa-6"
                    :thumb-size="35"
                    :min="0"
                    :max="0.5"
                    :step="0.01"
                    hide-details
                  >
                  </v-slider>
                  <v-row align-content="end" justify="center">
                    <v-col cols="4">
                      <v-card-actions class="pa-6">
                        <v-btn color="primary" @click="audioPlay2">play</v-btn>
                        <v-btn color="primary" @click="audioStop2">stop</v-btn>
                      </v-card-actions>
                    </v-col>
                    <v-col cols="8">
                      <v-card-subtitle class="text-body-1"
                        >Waveform Preview</v-card-subtitle
                      >
                      <canvas ref="canvas2"></canvas>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" align="center" justify="center">
            <v-card class="pa-6　mx-auto" outlined>
              <v-card-title>Mixed Sound</v-card-title>
              <v-card-actions class="pa-6">
                <v-btn color="primary" @click="mixedAudioPlay">play</v-btn>
                <v-btn color="primary" @click="mixedAudioStop">stop</v-btn>
              </v-card-actions>
              <canvas ref="mixedCanvas" width="1000px" height="400px"></canvas>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <template>
      <v-footer app absolute class="font-weight-medium">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — monja lab
        </v-col>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      oscillator1: null,
      oscillator2: null,
      gainNode1: null,
      gainNode2: null,
      sound1: {
        frequencyType: "sine",
        frequency: 440,
        gain: 0.5,
        canvas: null,
        intervalid: null,
        target_osc: "oscillator1"
      },
      sound2: {
        frequencyType: "sine",
        frequency: 440,
        gain: 0.5,
        canvas: null,
        intervalid: null,
        target_osc: "oscillator2"
      },
      mixedSound: {
        frequencyType: "sine",
        frequency: 440,
        gain: 0.5,
        canvas: null,
        intervalid: null,
        target_osc: "mixedOscillator"
      },
      isPlaying: false
    };
  },
  mounted() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
  },
  methods: {
    audioPlay() {
      if (!this.isPlaying) {
        this.sound1.canvas = this.$refs.canvas1;
        this.$store.commit("sound/playSound", this.sound1);
        this.isPlaying = true;
      }
    },
    audioStop() {
      if (this.isPlaying) {
        this.$store.commit("sound/stopSound", this.sound1);
        this.isPlaying = false;
      }
    },
    audioPlay2() {
      if (!this.isPlaying) {
        this.sound2.canvas = this.$refs.canvas2;
        this.$store.commit("sound/playSound", this.sound2);
        this.isPlaying = true;
      }
    },
    audioStop2() {
      if (this.isPlaying) {
        this.$store.commit("sound/stopSound", this.sound2);
        this.isPlaying = false;
      }
    },
    mixedAudioPlaytest() {
      if (!this.isPlaying) {
        this.mixedSound.canvas = this.$refs.mixedCanvas;
        this.$store.commit("sound/playSound", this.$data);
        this.isPlaying = true;
      }
    },
    mixedAudioPlay() {
      if (!this.isPlaying) {
        var ctx = new AudioContext();
        var analyser = ctx.createAnalyser();
        this.oscillator1 = ctx.createOscillator();
        this.oscillator1.type = this.sound1.frequencyType;
        this.oscillator1.frequency.setValueAtTime(
          this.sound1.frequency,
          ctx.currentTime
        );
        var gainNode1 = ctx.createGain();
        gainNode1.gain.value = this.sound1.gain;
        //this.oscillator.connect(gainNode).connect(analyser);
        //gainNode.connect(ctx.destination);

        this.oscillator2 = ctx.createOscillator();
        this.oscillator2.type = this.sound2.frequencyType;
        this.oscillator2.frequency.setValueAtTime(
          this.sound2.frequency,
          ctx.currentTime
        );
        var gainNode2 = ctx.createGain();
        gainNode2.gain.value = this.sound2.gain;

        //ローパスフィルター
        var vcf = ctx.createBiquadFilter();
        vcf.type = "lowpass";
        vcf.frequency.value = 20000;

        var gainVcf = ctx.createGain();
        gainVcf.gain.value = 1.0;

        this.osc = ctx.createOscillator();
        //接続
        this.osc.connect(this.oscillator1.frequency);
        this.osc.connect(this.oscillator2.frequency);
        this.oscillator1.connect(gainNode1);
        this.oscillator2.connect(gainNode2);
        gainNode1.connect(vcf);
        gainNode2.connect(vcf);
        vcf.connect(gainVcf).connect(analyser);
        gainVcf.connect(ctx.destination);

        //描画用
        analyser.fftSize = 2048; // The default value
        var canvas = this.$refs.mixedCanvas;
        var canvasContext = canvas.getContext("2d");
        this.intervalid = window.setInterval(function() {
          // Clear previous data
          canvasContext.clearRect(0, 0, canvas.width, canvas.height);
          // Get data for drawing sound wave
          var times = new Uint8Array(analyser.fftSize);
          analyser.getByteTimeDomainData(times);
          // Draw sound wave
          canvasContext.beginPath();
          for (var i = 0, len = times.length; i < len; i++) {
            var x = (i / len) * canvas.width;
            var y = (1 - times[i] / 255) * canvas.height;
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

        //this.oscillator.start(0);
        //this.osc.start(0);
        this.oscillator1.start(0);
        this.oscillator2.start(0);
        this.isPlaying = true;
      }
    },
    mixedAudioStop() {
      //this.osc.stop(0);
      this.oscillator1.stop(0);
      this.oscillator2.stop(0);
      this.isPlaying = false;
      if (this.intervalid !== null) {
        window.clearTimeout(this.intervalid);
        this.intervalid = null;
      }
      console.log(this.isPlaying);
    },
    showStatus() {
      console.log(this.isPlaying);
      console.log(this.frequencyType);
      console.log(this.frequency);
      console.log(this.intervalid);
      console.log(this.gain);
    }
  }
};
</script>
