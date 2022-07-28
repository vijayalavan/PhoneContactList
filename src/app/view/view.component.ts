import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {
      this.data = JSON.parse(params['data']);
    });
  }

}
