import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getPokemons(page: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/api/?page=${page}`, { headers });
  }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api-token-auth/', credentials);
  }

  register(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/register/', newUser);
  }

  getPokemon(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any>(this.apiUrl + '/api/' + id + '/', {headers});
  }
}
