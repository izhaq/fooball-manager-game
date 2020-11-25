import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExtendedPlayer, Player} from '../../../models/Player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: ExtendedPlayer;
  @Output() playerSelected: EventEmitter<ExtendedPlayer> = new EventEmitter<ExtendedPlayer>();
  constructor() {
    this.player = {} as ExtendedPlayer;
  }

  ngOnInit(): void {
  }

  onPlayerSelect() {
    this.playerSelected.emit(this.player);
  }

}
