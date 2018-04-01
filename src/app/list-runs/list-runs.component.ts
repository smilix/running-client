import {Component, OnInit} from '@angular/core';
import {Run} from "../shared/run";
import {RunRepositoryService} from "../shared/run-repository.service";
import {Router, ActivatedRoute} from "@angular/router";
import {IPaginationInstance} from "ng2-pagination/index";

@Component({
  selector: 'app-list-runs',
  templateUrl: './list-runs.component.html',
  styleUrls: ['./list-runs.component.scss']
})
export class ListRunsComponent implements OnInit {
  
  runList:Run[];
  highlight:number = -1;
  
  public paginateConfig:IPaginationInstance = {
    itemsPerPage: 30,
    currentPage: 1
  };

  constructor(private runRepository:RunRepositoryService, private router:Router, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.loadPage(0);

    this.route.params.subscribe(params => {
      this.highlight = +params['highlight'];
    }).unsubscribe();
  }
  
  loadPage(pageIndex:number) {
    this.runRepository.getRuns(0)
      .then(result => {
        this.runList = result.runs;
      });
  }
}
