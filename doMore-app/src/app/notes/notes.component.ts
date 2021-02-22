import { Component, OnInit } from '@angular/core';
import { Notebook } from 'src/app/model/notebook';
import { Note } from '../model/note';
import { NotebooksService } from '../service/notebooks.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  notes: Note[] = [];
  notebooksLength: number = this.notebooks.length;
  selectedNoteboook: Notebook | undefined;
  searchText: string = "";

  constructor(private service: NotebooksService) { }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks() {

    this.service.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("An error has occured when getting the notebooks ")
      }
    );
  }

  createNotebook() {

    let newNotebook: Notebook = {
      name: 'New notebook',
      id: this.notebooksLength + 1,
      ndNotes: 0,
    }

    this.service.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert("An error has occured while saving the notebook");
      }
    );

  }

  deleteNotebook(notebook: Notebook) {
    if (confirm("Ae you sure that you want to delete notebook?")) {
      this.service.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        err => {
          alert("Could not delete notebook");
        }
      );
    }
  }

  updateNotebook(notebook: Notebook) {
    this.service.patchNotebook(notebook).subscribe(
      res => {

      },
      err => { alert("An error has occured while updating the notebook! ") }
    );
  }

  getAllNotes() {
    this.service.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => { alert("Error occured while when getting the notes ") }
    );
  }

  deleteNote(note: Note) {
    if (confirm("Are you sure that you want to delete this note?")) {
      this.service.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => { alert("An error has occured deleting the note") }
      );
    }
  }

  createNote(notebookId: number) {
    let newNote: Note = {
      id: 0,
      title: "New Note",
      text: "Write some text in here",
      lastModifiedOn: new Date(),
      notebookId: notebookId
    };
    this.service.postNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        newNote.lastModifiedOn = res.lastModifiedOn;
        this.notes.push(newNote);
      },
      err => { alert("An error occured while saving the notes"); }
    );
  }

  updateNote(note: Note) {
    this.service.patchNote(note).subscribe(
      res => {
        this.notes.filter(nL => {
          if (nL.id = res.id) {
            nL.lastModifiedOn = res.lastModifiedOn;
          }
        })
      },
      err => { alert("An error has occured while updating the note! ") }
    );
  }

  selectedNotebook(notebook: Notebook) {
    this.selectedNoteboook = notebook;
    this.service.getNotesByNotebook(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err => { alert("An error has occured while getting the notes") }
    );
  }

  selectAllNotes() {
    this.selectedNoteboook = undefined;
    this.getAllNotes();
  }

}
