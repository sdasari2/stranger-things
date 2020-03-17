import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { IOption } from '../../models/select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options: IOption[] = [];
  @Input() defaultValue: string;
  @Input() hasBorder = true;
  @Output() changeOption = new EventEmitter<IOption>();

  constructor() { }

  ngOnInit(): void { }

  onValueChange(ev): void {
    this.options.forEach((option) => {
      if (option.value.toString() === ev.toString()) {
        this.changeOption.emit(option);
      }
    });
  }

}
