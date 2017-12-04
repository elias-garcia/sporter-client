import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [CardComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardComponent
  ]
})
export class SharedModule { }
