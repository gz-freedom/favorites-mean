import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from "../favorite";
import { AppService } from "../app.service";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  providers: [AppService]
})
export class FavoritesListComponent implements OnInit {
  @Input() favorites: Favorite[];
  
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  deleteFavorite(id: number) {
    // todo
    this.appService.deleteFavoriteById(id).subscribe(res => {
      console.log(res);
      this.favorites = this.favorites.filter(fav => {
        console.log(id);
        console.log(fav);
        return fav.articleId !== id;
      });
    });
  }
}
