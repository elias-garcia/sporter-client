import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerOutsideClickDirective } from './directives/datepicker-outside-click.directive';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { GooglePlacesAutocompleteDirective } from './directives/google-places-autocomplete.directive';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    CardComponent,
    DatepickerComponent,
    DatepickerOutsideClickDirective,
    OutsideClickDirective,
    DropdownComponent,
    GooglePlacesAutocompleteDirective,
    JumbotronComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardComponent,
    DatepickerComponent,
    DropdownComponent,
    OutsideClickDirective,
    GooglePlacesAutocompleteDirective,
    JumbotronComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
