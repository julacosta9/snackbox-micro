export type CaseTypes = {
  // added string type to be able to reference an object string/variable
  [black: string]: boolean;
  red: boolean;
  blue: boolean;
  white: boolean;
  evo: boolean;
  artworkClear: boolean;
  artworkSmoke: boolean;
  artworkRed: boolean;
  artworkBlue: boolean;
  artworkGreen: boolean;
  artworkYellow: boolean;
};

export type ButtonColors = {
  [black: string]: boolean;
  white: boolean;
  red: boolean;
  blueRoyal: boolean;
  blueLight: boolean;
  aqua: boolean;
  purple: boolean;
  pinkLight: boolean;
  yellow: boolean;
};

export type ButtonShapes = {
  [mixed: string]: boolean;
  concave: boolean;
  convex: boolean;
};

export type Case = {
  name: string;
  value: string;
};

export type Button = {
  name: string;
  value: string;
};

export type ButtonShape = {
  name: string;
  value: string;
};
