import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Favorite } from "../favorite";
import { AppService } from "../app.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers: [AppService]
})
export class FavoritesComponent implements OnInit {
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

}
