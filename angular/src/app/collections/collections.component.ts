import { Component, OnInit } from '@angular/core';
import { Collection } from "../collection";
import { AppService } from "../app.service";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  providers: [AppService]
})
export class CollectionsComponent implements OnInit {
  collections: Collection[] = [];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.getCollections()
      .subscribe(collections => {
        console.log(collections);
        this.collections = collections.filter(collection => collection.articleIds.length !==0);
      });
  }

}
