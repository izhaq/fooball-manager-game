import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player-list/player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { HttpClientModule } from '@angular/common/http';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSelectModule} from '@angular/material/select';
import {faUserGraduate, faUserAlt, faUserCircle, faWarehouse, faFutbol} from '@fortawesome/free-solid-svg-icons';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PercentPipe } from '@angular/common';
import { ConvertToShortNumberPipe } from './pipes/convert-to-short-number.pipe';
import { FilterBoardComponent } from './components/filter-board/filter-board.component';
import { FormsModule } from '@angular/forms';
import {DropdownComponent} from './components/shared/dropdown/dropdown.component';
import { InfoBoardComponent } from './components/info-board/info-board.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ProgressBarComponent,
    PlayerListComponent,
    ConvertToShortNumberPipe,
    FilterBoardComponent,
    DropdownComponent,
    InfoBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    MatSelectModule,
  ],
  providers: [PercentPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUserGraduate, faUserAlt, faUserCircle, faWarehouse, faFutbol);
  }
}
