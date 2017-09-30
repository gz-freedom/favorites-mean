import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { ArrayToString } from './app.pipe';
import { TagsListComponent } from './tags/tags.component';
import { TagDetailComponent } from './tags/tag-detail.component';
import { AddFavoriteComponent } from './add-favorite/add-favorite.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionDetailComponent } from "./collections/collection-detail.component";
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrayToString,
    TagsListComponent,
    TagDetailComponent,
    AddFavoriteComponent,
    FavoritesListComponent,
    CollectionsComponent,
    CollectionDetailComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ApiService, Title],
  bootstrap: [AppComponent]
})

export class AppModule { }
