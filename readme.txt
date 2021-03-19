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

# MENU to select 

- Select any visualisation.

  ![Menu](https://github.com/notadepapel/MusicVisualisation/blob/master/assets/menu.gif)

## Quick Start

There Many visualisation yet to come but now following is available.

- Nature with rain drops with p5.FFTanalyze.

  ![Nature Rain Visualisation](https://github.com/notadepapel/MusicVisualisation/blob/master/assets/nature.gif)

- Circle with high value Bubles p5.FFTanalyze.

  ![Circles bubble Visualisation](https://github.com/notadepapel/MusicVisualisation/blob/master/assets/circle.gif)


- Wave with vertex p5.FFTanalyze.


  ![Circles bubble Visualisation](https://github.com/notadepapel/MusicVisualisation/blob/master/assets/wave.gif)


- Spectrum  p5.FFTanalyze.

  ![Circles bubble Visualisation](https://github.com/notadepapel/MusicVisualisation/blob/master/assets/spectrum.gif)

- 3D Visualisation

  ![3D Visualisation](https://github.com/notadepapel/MusicVisualisation/blob/master/assets/Music_3D.png)

## Upcoming implementation
### 1: User Defined Music (SoundCloud API)
  - User can search the song and play so user can view the music visualisation on any custom song
### 2: Using MIC
  - User can get input from mic to view the visualisation
### 3: Interactive User interface
  - Going to implement the web interface using p5js Dom objects
### 4: 1 or more 3D visualisation using WEBGL
  - 3d visualisation using WEBGL p5js
  - Expand on the current 3D visualisation sketch, which will dynamically change colours based on the frequency provided
    by the sound
  - Create a recurring generative mechanism that will visualise sound frequencies in the sphere, altering the width of it
    accordingly
