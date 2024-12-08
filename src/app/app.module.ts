import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeadComponent } from './layout/head/head.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeadComponent,
    FooterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShareModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
