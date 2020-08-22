<template>
  <v-app>
    <v-main>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline">
              Sound Generator
            </v-card-title>
            <v-radio-group
              class="pa-6"
              label="Sound Type"
              v-model="frequencyType"
              :mandatory="true"
            >
              <v-radio label="sine" value="sine"></v-radio>
              <v-radio label="square" value="square"></v-radio>
              <v-radio label="sawtooth" value="sawtooth"></v-radio>
              <v-radio label="triangle" value="triangle"></v-radio>
            </v-radio-group>
            <v-slider
              label="Frequency"
              v-model="frequency"
              thumb-label="always"
              class="pa-6"
              :thumb-size="40"
              :max="20000"
              :min="100"
              hide-details
            >
            </v-slider>
            <v-card-actions class="pa-6">
              <v-btn color="primary" @click="audioPlay">play</v-btn>
              <v-btn color="primary" @click="showStatus">status</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <template>
      <v-card
      height="150">
        <v-footer absolute class="font-weight-medium">
          <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} — monja lab
          </v-col>
        </v-footer>
      </v-card>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      frequencyType: "sine",
      oscillator: {},
      isPlaying: false,
      frequency: 440
    };
  },
  methods: {
    audioPlay() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.3;
      if (this.isPlaying) return;
      this.oscillator = ctx.createOscillator();
      this.oscillator.type = this.frequencyType;
      this.oscillator.frequency.setValueAtTime(this.frequency, ctx.currentTime);
      this.oscillator.connect(gainNode).connect(ctx.destination);
      this.oscillator.start();
      this.oscillator.stop(2);
    },
    audioStop() {
      this.oscillator.stop();
      this.isPlaying = false;
      console.log(this.isPlaying);
    },
    showStatus() {
      console.log(this.isPlaying);
      console.log(this.oscillator);
      console.log(this.frequencyType);
      console.log(this.frequency);
    }
  }
};
</script>
