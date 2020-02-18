//import APP_CONFIG from '../../app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  fixed: boolean;
  name: string;
  id: string;
  linkCount: number = 0;

  SPECTRUM: [
    // "rgb(222,237,250)"
    "rgb(176,212,243)",
    "rgb(128,186,236)",
    "rgb(77,158,228)",
    "rgb(38,137,223)",
    "rgb(0,116,217)",
    "rgb(0,106,197)"
    // "rgb(0,94,176)"
    // "rgb(0,82,154)"
    // "rgb(0,60,113)"
  ]

  constructor(id) {
    this.id = id;
  }

  // size for font and radius and color based on number of links
  normal = () => {
    return Math.sqrt(this.linkCount / 20);
  }

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {
    let index = Math.floor(this.SPECTRUM.length * this.normal());
    return this.SPECTRUM[index];
  }
}
