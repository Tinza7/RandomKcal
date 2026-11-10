import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

export interface Food {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  category: Category;
}

@Injectable({ providedIn: 'root' })
export class FoodApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  getRandomFood(categoryId?: string): Observable<Food> {
    const params: Record<string, string> = {};
    if (categoryId) params['categoryId'] = categoryId;

    return this.http.get<Food>(`${this.baseUrl}/foods/random`, { params });
  }
}