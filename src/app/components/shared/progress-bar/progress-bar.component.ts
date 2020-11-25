import {Component, Input, OnInit} from '@angular/core';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() progress = 0;
  @Input() total?: number;
  barProgress: string | null;
  constructor(private percentPipe: PercentPipe) {
    this.barProgress = '';
  }

  ngOnInit(): void {
    this.barProgress = this.percentPipe.transform((this.progress / (this.total || 100)));
  }

}
