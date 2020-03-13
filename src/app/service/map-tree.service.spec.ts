//import { TestBed, inject } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { MapTreeService } from './map-tree.service';

/* globals describe, beforeEach, it, expect */

describe('MapTreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    //providers: [MapTreeService]
    });
  });

  //it('should be created', inject([MapTreeService], (service: MapTreeService) => {
  it('should be created', () => {
    const service: ActiveQueryService = TestBed.get(ActiveQueryService)
    expect(service).toBeTruthy()
    //}));
    });
});
