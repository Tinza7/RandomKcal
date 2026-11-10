import { Component, inject, signal } from '@angular/core';
import { FoodApiService, Food } from './food-api.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>RandomKcal</h1>

    <button (click)="random()" [disabled]="loading()">สุ่มอาหาร</button>

    @if (loading()) {
      <p>กำลังสุ่ม...</p>
    }

    @if (error()) {
      <p>{{ error() }}</p>
    }

    @if (food(); as f) {
      <h2>{{ f.name }}</h2>
      <p>หมวด: {{ f.category.name }}</p>
    }
  `,
})
export class App {
  private api = inject(FoodApiService);

  food = signal<Food | null>(null);
  loading = signal(false);
  error = signal('');

  random() {
    this.loading.set(true);
    this.error.set('');

    this.api.getRandomFood().subscribe({
      next: (result) => {
        this.food.set(result);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('สุ่มไม่สำเร็จ ลองใหม่อีกครั้ง');
        this.loading.set(false);
      },
    });
  }
}