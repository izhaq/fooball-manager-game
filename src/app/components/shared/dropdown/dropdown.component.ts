import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isChoice} from './Utils';


export interface Choice {
  code: string;
  value: any;
}

export type ChoiceList = Array<Choice>;

export const resetSelectionCode = '-100';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {

  @Input() options: ChoiceList = [];
  @Input() placeholder: any;
  @Input() formatter?: (elm: Choice) => any;
  @Output() itemSelectedEvent: EventEmitter<Choice> = new EventEmitter<Choice>();
  public selectedValue: Choice = {} as Choice;
  private selected: Choice = {} as Choice;

  constructor() {
    this.placeholder = {
      code: resetSelectionCode,
      value: this.placeholder
    } as Choice;
  }

  ngOnInit(): void {
    this.resetSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newEl: Choice = (changes.options.currentValue).find((value: Choice) =>
      value.code === this.selectedValue.code);
    if (newEl?.code) {
      this.selectedValue = newEl;
    }
  }

  private resetSelection(): void {
    if (!isChoice(this.placeholder)) {
      this.placeholder = {
        code: '-100',
        value: this.placeholder
      } as Choice;
    }
    this.selectedValue = this.placeholder;
  }

  onSelectedOption(event: any): void {
    this.selected = {...event.value};
    console.log(event.value);
    this.itemSelectedEvent.emit(event.value);
  }

  get placeholderValue(): string {
    return (isChoice(this.placeholder)) ? this.placeholder.value : this.placeholder;
  }
}
