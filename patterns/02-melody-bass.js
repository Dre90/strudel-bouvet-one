// @title Melodi og bass
// @by deg
// Skala-basert melodi over en enkel bass, med litt romklang.

setcps(0.55);

stack(
  n("<0 2 4 3> [5 7] <4 2> 0*2")
    .scale("C4:minor")
    .s("gm_epiano1")
    .room(0.4)
    .gain(0.8),

  n("<0 0 3 4>").scale("C2:minor").s("gm_synth_bass_1").lpf(600),

  s("bd*2, ~ hh*2, ~ ~ sd ~").bank("RolandTR909").gain(0.9),
);
