import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Router,RouterModule,Routes} from "@angular/router";
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './notes/notes.component';
import { NoteTextFilterPipe } from './shared/note-text-filter.pipe';

const appRoutes :Routes = [
  {
    path:'notes',
    component:NotesComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteTextFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
