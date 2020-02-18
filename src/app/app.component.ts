import { Component } from '@angular/core';
//import APP_CONFIG from './app.config';
import { Node } from './models/node';
import { Link } from './models/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    const N = 20,
          getIndex = number => number - 1;

/***
    // constructing the nodes array
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        // increasing connections toll on connecting nodes
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        // connecting the nodes before starting the simulation
        this.links.push(new Link(i, i * m));
      }
   }
***/

   // node 1 points to 2, 3, 4, 5
   // node 2 points to 6, 7, 8, 9
   // node 3 points to 10, 11
   // node 4 points to 12, 13
   // node 5 points to 14, 15, 16
   // node 6 points to 17, 18
   // node 7 points to 19, 20
    for (let i = 1; i <= 21; i++) {
      this.nodes.push(new Node(i));
    }
    this.nodes[getIndex(1)].linkCount=4;
    //this.nodes[getIndex(1)].x = 20;
    //this.nodes[getIndex(1)].y = 20;
    this.nodes[getIndex(1)].fx = 200;
    this.nodes[getIndex(1)].fy = 200;
    this.nodes[getIndex(1)].fixed = true;
    this.nodes[getIndex(1)].name = "cars";

    this.links.push(new Link(1, 2));
    this.links.push(new Link(1, 3));
    this.links.push(new Link(1, 4));
    this.links.push(new Link(1, 5));

    this.nodes[getIndex(2)].linkCount=4;
    this.links.push(new Link(2, 6));
    this.links.push(new Link(2, 7));
    this.links.push(new Link(2, 8));
    this.links.push(new Link(2, 9));
    this.nodes[getIndex(2)].name = "old cars";

    this.nodes[getIndex(3)].linkCount=2;
    this.links.push(new Link(3, 10));
    this.links.push(new Link(3, 11));
    this.nodes[getIndex(3)].name = "used cars";

    this.nodes[getIndex(4)].linkCount=2;
    this.links.push(new Link(4, 12));
    this.links.push(new Link(4, 13));
    this.nodes[getIndex(4)].name = "new cars";

    this.nodes[getIndex(5)].linkCount=3;
    this.links.push(new Link(5, 14));
    this.links.push(new Link(5, 15));
    this.links.push(new Link(5, 16));
    this.nodes[getIndex(5)].name = "cars for sale";

    this.nodes[getIndex(6)].linkCount=2;
    this.links.push(new Link(6, 17));
    this.links.push(new Link(6, 18));

    this.nodes[getIndex(7)].linkCount=2;
    this.links.push(new Link(6, 19));
    this.links.push(new Link(6, 20));

  }
}
