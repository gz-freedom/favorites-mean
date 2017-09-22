import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AppService } from "../app.service";
import { Favorite } from "../favorite";
import { Collection } from "../collection";

@Component({
    selector: 'app-collection-detail',
    templateUrl: './collection-detail.component.html',
    styleUrls: ['./collections.component.scss'],
    providers: [AppService]
})

export class CollectionDetailComponent implements OnInit {
    favorites: Favorite[]
    collection: Collection = new Collection()
    constructor(
        private appService: AppService,
        private route: ActivatedRoute
    ) {}
    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => {
            this.appService.getCollectionById(+params['id']).subscribe(collection => {
                this.collection = collection;
            });
            return this.appService.getFavoritesByCollectionId(+params['id']);
        })
        .subscribe(favorites => {
            this.favorites = favorites;
        })
    }
}