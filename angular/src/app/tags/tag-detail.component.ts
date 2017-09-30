import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AppService } from "../app.service";
import { Favorite } from "../favorite";
import { Tag } from "../tag";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [AppService]
})
export class TagDetailComponent implements OnInit {
  favorites: Favorite[];
  tagId: number;
  tagName: string = '';
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.tagId = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.appService.getFavoritesByTagId(+params['id']))
      .subscribe(res => {
        this.favorites = res;
      });
    
    this.appService.getTagById(this.tagId).subscribe(tag => {
      this.tagName = tag.name;
      this.titleService.setTitle("Tag: " + tag.name);
    });
  }

  deleteFavorite(id: number) {
    // todo
    this.appService.deleteFavoriteById(id).subscribe();
  }
}
