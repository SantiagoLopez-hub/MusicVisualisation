### *Computing Project  1 (Music Visualiser)*

## Audio visualiser


To turn the sound into something that can be visualised p5.js provides
a Fast Fourier Transform object. Take a look at its description in the
[p5.sound documentation](https://p5js.org/reference/#/p5.FFT).


- `FFT.analyze()` returns an array of 1024 values between 0
  and 255. Each value represents the amplitude (loudness) of a small
  frequency range (pitch of the sound).

- `FFT.waveform()` returns an array of 1024 values between -1
  and 1. Each value represents the amplitude of the sound for a tiny
  portion of time.

- `FFT.energy(freq1, [freq2])` returns the volume of the sound at
  frequency range specified by the `freq1` and `freq2` parameter. You
  can specify `freq1` as a number or p5.js provides strings for common
  values such as “bass” and “treble”, and leave `freq2` empty.


## Quick Start

There Many visualisation yet to come but now following is available.
- Nature with rain drops with p5.FFTanalyze.
  ![Nature Rain Visualisation](https://github.com/notadepapel/MusicVisualisation/blob/master/assets/nature.gif)
- I want livereload or babel auto-compiling to improve my p5.js development experience. Go check `Collection`.
- I just need a CLI command to easily initialize a new p5 project (with default p5.js libraries in it). Go check `Bundle`.

