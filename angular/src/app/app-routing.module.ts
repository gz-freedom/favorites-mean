import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { AddFavoriteComponent } from "./add-favorite/add-favorite.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { FavoritesListComponent } from "./favorites-list/favorites-list.component";
import { TagsListComponent } from "./tags/tags.component";
import { TagDetailComponent } from "./tags/tag-detail.component";
import { CollectionsComponent } from "./collections/collections.component";
import { CollectionDetailComponent } from "./collections/collection-detail.component";

const routes: Routes = [
  {
    path: '',
    component: AddFavoriteComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: 'collections',
    component: CollectionsComponent
  },
  {
    path: 'collections/:id',
    component: CollectionDetailComponent
  },
  {
    path: 'tags',
    component: TagsListComponent
  },
  {
    path: 'tags/:id',
    component: TagDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
