import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  //source: Node | string | number;
  source: Node;
  //target: Node | string | number;
  target: Node;

  constructor(source, target) {
    this.source = source;
    this.target = target;
  }
}
