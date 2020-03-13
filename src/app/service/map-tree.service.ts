import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Node, Link, MapTree } from '../models';

@Injectable()
export class MapTreeService {
    /***
    private mockData: IData[] = [
        {
            label: "data1",
            value: 1,
        },
        {
            label: "data2",
            value: 2,
        },
	{
		label: "data3",
		value: 3,
	},
	{
		label: "data4",
		value: 4,
	}
    ];

    ***/
    private mockData: MapTree = new MapTree()
    //private mockData: MapTree = 
    //private mockData = 
    //nodes: Node[] = [],
    //links: Link[] = []
    //;

    private dataSubject = new BehaviorSubject<MapTree>(this.mockData);
    
    $data = this.dataSubject.asObservable();

    constructor(){
      this.populateData();
    }

    populateData() {  // just some static data for 1 MapTree/root Query
      // now populate it
   // node 0 points to 1, 2, 3, 4, 5
   // node 1 points to 6, 7, 8, 9
   // node 2 points to 10, 11
   // node 3 points to 12, 13
   // node 4 points to 14, 15, 16
   // node 5 points to 17, 18
   // node 6 points to 19, 20
     for (let i = 1; i <= 21; i++) {
        this.mockData.nodes.push(new Node(i));
     };
      this.mockData.nodes[0].linkCount=5;
      //this.nodes[0].x = 20;
      //this.nodes[getIndex(1)].y = 20;
      this.mockData.nodes[0].fx = 200;
      this.mockData.nodes[0].fy = 200;
      this.mockData.nodes[0].fixed = true;
      this.mockData.nodes[0].name = "cars";

      this.mockData.links.push(new Link(0, 1));
      this.mockData.links.push(new Link(0, 2));
      this.mockData.links.push(new Link(0, 3));
      this.mockData.links.push(new Link(0, 4));
      this.mockData.links.push(new Link(0, 5));

      this.mockData.nodes[1].linkCount=4;
      this.mockData.links.push(new Link(1, 6));
      this.mockData.links.push(new Link(1, 7));
      this.mockData.links.push(new Link(1, 8));
      this.mockData.links.push(new Link(1, 9));
      this.mockData.nodes[1].name = "old cars";
    /***
      this.nodes[2].linkCount=2;
      this.links.push(new Link(2, 10));
      this.links.push(new Link(2, 11));
      this.nodes[2].name = "used cars";

      this.nodes[3].linkCount=2;
      this.links.push(new Link(3, 12));
      this.links.push(new Link(3, 13));
      this.nodes[3].name = "new cars";

      this.nodes[4].linkCount=3;
      this.links.push(new Link(4, 14));
      this.links.push(new Link(4, 15));
      this.links.push(new Link(4, 16));
      this.nodes[4].name = "cars for sale";

      this.nodes[5].linkCount=2;
      this.links.push(new Link(5, 17));
      this.links.push(new Link(5, 18));

      this.nodes[6].linkCount=2;
      this.links.push(new Link(6, 19));
      this.links.push(new Link(6, 20));
    ***/
    console.log("done populating data for MapTreeService")
   }

    addNewQueryData(newData: MapTree) {
    //this.mockData.push(newData);
        this.dataSubject.next(this.mockData);
    }
}
