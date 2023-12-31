export const walls: number[] = [
  6, 30, 54, 77, 76, 75, 74, 73, 72, 96, 8, 9, 33, 57, 81, 129, 153, 154, 157, 158, 134, 110, 86, 62, 38, 14, 15,
  17, 41, 65, 89, 113, 138, 139, 140, 141, 142, 143, 167, 215, 239, 238, 237, 236, 235, 234, 232, 256, 280, 328, 352, 353, 354, 355, 379, 380, 381, 382,
  383, 407, 201, 202, 203, 204, 205, 229, 253, 277, 301, 325, 349, 348, 347, 346, 345, 321, 297, 273, 249, 225, 144, 145, 146, 147, 148, 149, 174, 222,
  245, 244, 242, 241, 240, 264, 288, 290, 291, 292, 293, 317, 341, 389, 388, 387, 386, 385, 384, 408, 456, 457, 458, 459, 485, 509, 533, 557, 558, 582,
  583, 584, 586, 562, 538, 537, 536, 512, 488, 440, 416, 418, 419, 420, 421, 423, 447, 495, 519, 543, 542, 541, 565, 589, 591, 592, 593, 569, 570, 546,
  522, 498, 474, 450, 452, 453, 454, 455
];

interface IDoor {
  door: number;
  place: string;
}

export const doors: IDoor[] = [
  {
    door: 78,
    place: 'study'
  },
  {
    door: 105,
    place: 'hall'
  },
  {
    door: 155,
    place: 'hall'
  },
  {
    door: 156,
    place: 'hall'
  },
  {
    door: 137,
    place: 'louge'
  },
  {
    door: 233,
    place: 'dinning'
  },
  {
    door: 304,
    place: 'dinning'
  },
  {
    door: 451,
    place: 'kitchen'
  },
  {
    door: 471,
    place: 'ballroom'
  },
  {
    door: 422,
    place: 'ballroom'
  },
  {
    door: 417,
    place: 'ballroom'
  },
  {
    door: 464,
    place: 'ballroom'
  },
  {
    door: 460,
    place: 'conservatory'
  },
  {
    door: 365,
    place: 'billiard'
  },
  {
    door: 289,
    place: 'billiard'
  },
  {
    door: 198,
    place: 'library'
  },
  {
    door: 243,
    place: 'library'
  },
];
