import { Injectable } from '@angular/core';
import { Favorite } from "./favorite";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { Tag } from "./tag";
import { Collection } from "./collection";

@Injectable()
export class AppService {
  lastId: number = 0;

  constructor(
    private api: ApiService
  ) { }

  getAllFavorites(): Observable<Favorite[]> {
    return this.api.getAllFavorites();
  }
  getFavoritesByTagId(tagId: number) {
    return this.api.getFavoritesByTagId(tagId);
  }
  getFavoritesByCollectionId(collectionId: number): Observable<Favorite[]> {
    return this.api.getFavoritesByCollectionId(collectionId);
  }

  getAllTags(): Observable<Tag[]> {
    return this.api.getAllTags();
  }

  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.api.addFavorite(favorite);
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.api.addTag(tag);
  }

  deleteFavoriteById(id: number) {
    return this.api.deleteFavoriteById(id);
  }

  getTagById(id: number): Observable<Tag> {
    return this.api.getTagById(id);
  }

  getCollections(): Observable<Collection[]> {
    return this.api.getAllCollections();
  }
  addCollection(collection: Collection): Observable<Collection> {
    return this.api.addCollection(collection);
  }
  getCollectionById(collectionId: number): Observable<Collection> {
    return this.api.getCollectionById(collectionId);
  }
}
