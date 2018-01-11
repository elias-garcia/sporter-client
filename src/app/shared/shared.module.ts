import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { GooglePlacesAutocompleteDirective } from './directives/google-places-autocomplete.directive';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { PaddingZeroPipe } from './pipes/padding-zero.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    CardComponent,
    DatepickerComponent,
    OutsideClickDirective,
    DropdownComponent,
    GooglePlacesAutocompleteDirective,
    JumbotronComponent,
    TimepickerComponent,
    PaddingZeroPipe
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
    JumbotronComponent,
    TimepickerComponent,
    PaddingZeroPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
