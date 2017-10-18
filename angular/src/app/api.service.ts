import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Favorite } from "./favorite";
import { Tag } from "./tag";
import { Collection } from "./collection";
//import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/concat";
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
  public getAllTags(): Observable<Tag[]> {
    return this.http.get(API_URL + "/tags")
        .map(res => {
          let result = res.json();
          if(result.success) {
            return result.data;
          }
        });
  }
  public getAllCollections(): Observable<Collection[]> {
    return this.http.get(API_URL + "/collections")
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data;
        }
      });
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
  public getCollectionById(id: number): Observable<Collection> {
    return this.http.get(API_URL + "/collections/" + id)
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
  public getFavoritesByCollectionId(id: number): Observable<Favorite[]> {
    return this.http.get(API_URL + "/collections/" + id)
      .map(res => {
        let result = res.json();
        if(result.success) {
          return result.data;
        }
      });
  }
  
  public addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post(API_URL + "/add-favorite", favorite).switchMap(res => {
      let addedFav = res.json().data;
      let updateCollection$ = Observable.of(null), updateTags$ = Observable.of(null), addOrUpdateTag$ = Observable.of(null);
      if(addedFav.collectionId) {
        updateCollection$ = this.getCollectionById(favorite.collectionId).concatMap((collection) => {
          collection.articleIds.push(addedFav.articleId);
          return this.updateCollection(collection);
        });
      }

      addedFav.tags.split(",").forEach(tagName => {
        let isExist = false;
        updateTags$ = this.getAllTags().concatMap(allTags => {
          let allStream$ = null;
          for(let i = 0, len = allTags.length; i < len; i++) {
            let thisTag = allTags[i];
            if(thisTag.name.toLowerCase() === tagName.trim().toLowerCase()) {
              // exists, then update tag
              thisTag.articleIds.push(addedFav.articleId);
              allStream$ = allStream$ ? allStream$.merge(this.updateTag(thisTag)) : Observable.merge(this.updateTag(thisTag));
              isExist = true;
              break;
            }
          }
          if(!isExist) {
            let lastTag = allTags[allTags.length - 1];
            let tag: Tag = new Tag({
              articleIds: [addedFav.articleId],
              name: tagName.trim(),
              tagId: lastTag.tagId + 1
            });
            allStream$ = allStream$ ? allStream$.merge(this.addTag(tag)) : Observable.merge(this.addTag(tag));
          }
          return allStream$;
        });
      });

      return updateCollection$.merge(updateTags$).map(() => addedFav);
    });
  }
  public addTag(tag: Tag): Observable<Tag> {
    return this.http.post(API_URL + "/add-tag", tag)
        .map(response => response.json());
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

  public updateTag(tag: Tag) {
    return this.http.put(API_URL + "/update-tag", tag);
  }
  public updateCollection(collection: Collection) {
    return this.http.put(API_URL + "/update-collection", collection)
  }

  public deleteFavoriteById(id: number) {
    let updateCollectionStream = this.http.get(API_URL + "/collection-by-favid/" + id).concatMap(res => {
      let collection = res.json().data;
      return this.updateCollection(collection);
    });

    let updateTagStream = this.http.get(API_URL + "/tags-by-favid/" + id).concat(res => {
      let tags = res.json().data, tempStream = null;
      tags.forEach(tag => {
        tag.articleIds.splice(tag.articleIds.indexOf(id), 1);
        if(tag.articleIds.length === 0) {
          // delete tag
          tempStream.merge(this.http.delete(API_URL + "/tags/" + tag.id));
        } else {
          // update tag
          tempStream.merge(this.http.put(API_URL + "/update-tag", tag));
        }
      });
      return tempStream;
    });

    return this.http.delete(API_URL + "/favorites/" + id).concat(updateCollectionStream, updateTagStream);
  }
}
