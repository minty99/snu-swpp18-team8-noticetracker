import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  submitTimeTable() {
    this.router.navigate(['/submit_time_table']);
  }

  siteRecommendation() {
    this.router.navigate(['/site_recommendation']);
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['']);
  }
}
