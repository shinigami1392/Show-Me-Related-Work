import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResearchAreasComponent } from './research-areas/research-areas.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    ResearchAreasComponent,
    HeaderComponent,
    DetailsComponent,
    InfoBoxComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
