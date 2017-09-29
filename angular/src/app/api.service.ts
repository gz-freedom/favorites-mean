import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Favorite } from "./favorite";
import { Tag } from "./tag";
import { Collection } from "./collection";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/concatMap";

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  public getAllFavorites(): Observable<Favorite[]> {
    return this.http.get(API_URL + "/favorites")
        .map(res => {
          let result = res.json();
          if(result.success) {
            return result.data;
          }
        });
  }
  
  public addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post(API_URL + "/add-favorite", favorite)
          .map(res => {
            let result = res.json();
            if(result.success) {
              return result.data;
            }
          });
  }
  
  public getAllTags(): Observable<Tag[]> {
    return this.http.get(API_URL + "/tags")
        .map(res => {
          let result = res.json();
          if(result.success) {
            return result.data;
          }
        });
  }
  
  public addTag(tag: Tag): Observable<Tag> {
    return this.http.post(API_URL + "/add-tag", tag)
        .map(response => response.json());
  }

  public updateTag(tag: Tag): Observable<Tag> {
    return this.http.put(API_URL + "/update-tag", tag)
            .map(response => {
              return response.json();
            });
  }

  public deleteFavoriteById(id: number) {
    this.http.get(API_URL + "/favorites/" + id).subscribe(fav => {
      // update collection
      this.getCollectionById(fav.json().collectionId).subscribe(collection => {
        collection.articleIds.splice(collection.articleIds.indexOf(id), 1);
        this.updateCollection(collection).subscribe();
      });
    });

    // update tag
    this.http.get(API_URL + "/tags").subscribe(tags => {
      tags.json().forEach(tag => {
        if(tag.articleIds.includes(id)) {
          tag.articleIds.splice(tag.articleIds.indexOf(id), 1);
          if(tag.articleIds.length === 0) {
            // delete tag
            return this.http.delete(API_URL + "/tags/" + tag.id).map(response => null).subscribe();
          } else {
            // update tag
            return this.http.put(API_URL + "/tags/" + tag.id, tag).map(response => response.json()).subscribe();
          }
        }
      });
    });

    return this.http.delete(API_URL + "/favorites/" + id)
      .map(res => {
        return null;
      });
  }

  public updateFavorite(fav: Favorite) {
    return this.http.put(API_URL + "/favorites/" + fav.articleId, fav)
      .map(res => res.json());
  }

  public getTagById(id: number): Observable<Tag> {
    return this.http.get(API_URL + "/tags/" + id)
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data[0];
        }
      });
  }

  public getCollections(): Observable<Collection[]> {
    return this.http.get(API_URL + "/collections")
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data;
        }
      });
  }

  public addCollection(collection: Collection): Observable<Collection> {
    return this.http.post(API_URL + "/add-collection/", collection)
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data;
        }
      });
  }
  
  public getCollectionById(id: number): Observable<Collection> {
    return this.http.get(API_URL + "/collections/" + id)
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data[0];
        }
      });
  }

  public getFavoritesByCollectionId(id: number): Observable<Favorite[]> {
    return this.http.get(API_URL + "/collections/" + id)
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data;
        }
      });
  }

  public updateCollection(collection: Collection): Observable<Collection> {
    return this.http.put(API_URL + "/update-collection", collection)
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data;
        }
      });
  }

  public getFavoritesByTagId(tagId: number): Observable<Favorite[]> {
    return this.http.get(API_URL + "/tags/" + tagId)
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data;
        }
      });
  }
}
