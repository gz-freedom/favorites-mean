import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AppService } from "../app.service";
import { Tag } from "../tag";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [AppService]
})
export class TagsListComponent implements OnInit {
  tags: Tag[] = [];
  constructor(
    private appService: AppService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.appService.getAllTags()
        .subscribe(tags => {
          this.tags = tags;
        });
    this.titleService.setTitle("Tags");
  }
}
