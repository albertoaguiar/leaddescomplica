import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_PATH } from "src/environments/environment.development";
import { LeadInterface } from "../interfaces/LeadInterface";

@Injectable({
    providedIn: 'root'
})
export class LeadService {
    constructor(private httpClient: HttpClient) {}

    getLeads() {
        return this.httpClient.get<LeadInterface[]>(`${API_PATH}leads`).toPromise();
    }

    createLead(lead:LeadInterface) {
        return this.httpClient.post<LeadInterface>(`${API_PATH}leads`, lead).toPromise();
    }
}