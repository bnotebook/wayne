import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {State} from '@clr/angular';
import {CronjobTpl} from '../../../shared/model/v1/cronjobtpl';
import {Page} from '../../../shared/page/page-state';
import {AceEditorService} from '../../../shared/ace-editor/ace-editor.service';
import {AceEditorMsg} from '../../../shared/ace-editor/ace-editor';

@Component({
  selector: 'list-cronjobtpl',
  templateUrl: 'list-cronjobtpl.component.html'
})
export class ListCronjobTplComponent implements OnInit {

  @Input() cronjobTpls: CronjobTpl[];

  @Input() page: Page;
  currentPage: number = 1;
  state: State;

  @Output() paginate = new EventEmitter<State>();
  @Output() delete = new EventEmitter<CronjobTpl>();
  @Output() edit = new EventEmitter<CronjobTpl>();


  constructor(private router: Router,
              private aceEditorService: AceEditorService) {
  }

  ngOnInit(): void {
  }

  pageSizeChange(pageSize: number) {
    this.state.page.to = pageSize - 1;
    this.state.page.size = pageSize;
    this.currentPage = 1;
    this.paginate.emit(this.state);
  }


  refresh(state: State) {
    this.state = state;
    this.paginate.emit(state);
  }

  deleteCronjobTpl(cronjobTpl: CronjobTpl) {
    this.delete.emit(cronjobTpl);
  }

  editCronjobTpl(cronjobTpl: CronjobTpl){
    this.edit.emit(cronjobTpl);
  }

  detailMetaDataTpl(tpl: string) {
    this.aceEditorService.announceMessage(AceEditorMsg.Instance(tpl, false, '元数据查看'));
  }
}
