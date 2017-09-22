import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Favorite } from "../favorite";
import { AppService } from "../app.service";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  providers: [AppService]
})
export class FavoritesListComponent implements OnInit {
  favorites: Favorite[] = [];
  constructor(
    private appService: AppService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Favorites");
    this.appService.getAllFavorites()
      .subscribe(favorites => {
          this.favorites = favorites;
        });
  }

  deleteFavorite(id: number) {
    // todo
    this.appService.deleteFavoriteById(id).subscribe(res => {
      this.favorites = this.favorites.filter(fav => {
        return fav.id !== id;
      });
    });
  }
  markAsRead(favorite: Favorite) {
    favorite.read = !favorite.read;
    this.appService.updateFavorite(favorite).subscribe();
  }
}
