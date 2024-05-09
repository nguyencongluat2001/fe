import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';

@Injectable()

export class EvaluationModel {
    public Group:any;
    constructor(
        private HttpService: HttpService,
        private apiservice: ApiService,
        private route: Router, 
    ) {}
    setGroup(Group) {
         this.Group = Group;
    }
    getGroup() {
        return this.Group;
    }
}
