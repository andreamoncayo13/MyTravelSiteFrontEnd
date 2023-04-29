import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  title = 'Comment';
  createCommentError:string | undefined;
  commentForm!: FormGroup;
  commentError: string = "";
  showCreateComment: boolean = false;
  commentList: any[] = [];
 
  constructor(private fb: FormBuilder, private titleService:Title, private commentService: CommentService, private auth: AuthService) {
  }
 
  ngOnInit() {
    this.createCommentError = undefined;
    this.titleService.setTitle(this.title);
    if(!this.auth.isLoggedIn()){
      location.pathname = ('/login');
    }

    this.commentForm = this.fb.group({
      comments: ['', Validators.required]
     });

     this.loadComments();     
  }

  onLogout(){
    this.auth.logOut();
    location.pathname = ('/login');
  }

  isLoggedIn():boolean{
    return this.auth.isLoggedIn();
  }

  onCreateComment() {
    this.createCommentError = '';
    if (this.commentForm.valid){
      let commentCreateObj = {
        userName: this.auth.getCurrentUser(),
        comments:this.commentForm.value.comments
      }
      console.log(commentCreateObj);
      this.commentService.create(commentCreateObj)
      .subscribe({
        next:(res)=>{
          this.showCreateComment = false;
          this.loadComments(); 
        },
        error:(err)=>{
          this.commentError = err?.error.message;
        }
      })

    } else{

      ValidateForm.validateAllFormFields(this.commentForm);
    }
  }

  private loadComments(){
    this.commentService.list().subscribe({
      next:(res)=>{
        this.commentList = res ;
        console.log(this.commentList);
      },
      error:(err)=>{
        this.commentError = err?.error.message;
      }
     });
  }
}
