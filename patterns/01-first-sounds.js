// @title Første lyd
// @by deg
// Fra strudel.cc/workshop/first-sounds – en enkel trommeloop.

setcps(0.5);

stack(s("bd ~ bd ~"), s("~ hh ~ hh").gain(0.7), s("~ ~ sd ~")).bank(
  "RolandTR808",
);
