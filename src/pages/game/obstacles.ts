export const matrix = () => {
  const arr = []
  let i = 0

  for (let row = 0; row <= 24; row++) {
    arr[row] = []
    for (let col = 0; col <= 23; col++) {
      arr[row].push(i)
      i++
    }
  }
  return arr
}

export const walls: number[] = [
  6, 30, 54, 77, 76, 75, 74, 73, 72, 96, 8, 9, 33, 57, 81, 129, 153, 154, 157, 158, 134, 110, 86, 62, 38, 14, 15,
  17, 41, 65, 89, 113, 138, 139, 140, 141, 142, 143, 167, 215, 239, 238, 237, 236, 235, 234, 232, 256, 280, 328, 352, 353, 354, 355, 379, 380, 381, 382,
  383, 407, 201, 202, 203, 204, 205, 229, 253, 277, 301, 325, 349, 348, 347, 346, 345, 321, 297, 273, 249, 225, 144, 145, 146, 147, 148, 149, 174, 222,
  245, 244, 242, 241, 240, 264, 288, 290, 291, 292, 293, 317, 341, 389, 388, 387, 386, 385, 384, 408, 456, 457, 458, 459, 485, 509, 533, 557, 558, 582,
  583, 584, 586, 562, 538, 537, 536, 512, 488, 440, 416, 418, 419, 420, 421, 423, 447, 495, 519, 543, 542, 541, 565, 589, 591, 592, 593, 569, 570, 546,
  522, 498, 474, 450, 452, 453, 454, 455, 106, 131, 132, 305, 475, 470, 446, 441, 465, 484, 364, 219, 197, 119, 192, 431
];

interface IDoor {
  door: number;
  entry: number;
  place: string;
}

export const doors: IDoor[] = [
  {
    door: 78,
    entry: 102,
    place: 'study'
  },
  {
    door: 105,
    entry: 104,
    place: 'hall'
  },
  {
    door: 155,
    entry: 179,
    place: 'hall'
  },
  {
    door: 156,
    entry: 180,
    place: 'hall'
  },
  {
    door: 137,
    entry: 161,
    place: 'louge'
  },
  {
    door: 233,
    entry: 209,
    place: 'dinning'
  },
  {
    door: 304,
    entry: 303,
    place: 'dinning'
  },
  {
    door: 451,
    entry: 427,
    place: 'kitchen'
  },
  {
    door: 471,
    entry: 472,
    place: 'ballroom'
  },
  {
    door: 422,
    entry: 398,
    place: 'ballroom'
  },
  {
    door: 417,
    entry: 393,
    place: 'ballroom'
  },
  {
    door: 464,
    entry: 463,
    place: 'ballroom'
  },
  {
    door: 460,
    entry: 461,
    place: 'conservatory'
  },
  {
    door: 365,
    entry: 366,
    place: 'billiard'
  },
  {
    door: 289,
    entry: 265,
    place: 'billiard'
  },
  {
    door: 198,
    entry: 199,
    place: 'library'
  },
  {
    door: 243,
    entry: 267,
    place: 'library'
  },
];
