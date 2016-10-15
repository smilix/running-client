import {Component, OnInit} from '@angular/core';
import {Run} from "../shared/run";
import {RunRepositoryService} from "../shared/run-repository.service";
import {Router, ActivatedRoute} from "@angular/router";
import {IPaginationInstance} from "ng2-pagination/index";

@Component({
  selector: 'app-list-runs',
  templateUrl: './list-runs.component.html',
  styleUrls: ['./list-runs.component.scss'],
  providers: [RunRepositoryService]
})
export class ListRunsComponent implements OnInit {
  
  runList:Run[];
  highlight:number = -1;
  
  // pageIndex:number = 0;
  // pageCount:number = null;

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
    // this.pageIndex = pageIndex;
    //
    // let begin = this.pageIndex * this.PAGE_SIZE;
    this.runRepository.getRuns(0)
      .then(result => {
        // console.log('r', result);
        this.runList = result.runs;
        
        // if (this.pageCount === null) {
        //   return;
        // }
        // this.pageCount = Math.ceil(result.count / this.PAGE_SIZE);
      });
  }


  goTo(id:number) {
    this.router.navigate(['/runs', id]);
  }
}
