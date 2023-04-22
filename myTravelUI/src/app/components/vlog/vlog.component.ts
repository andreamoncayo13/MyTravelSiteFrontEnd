import{FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit } from '@angular/core';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vlog',
  templateUrl: './vlog.component.html',
  styleUrls: ['./vlog.component.scss']
})
export class VlogComponent {
  constructor (private fb: FormBuilder, private auth: AuthService, private router: Router){ }
  
}
