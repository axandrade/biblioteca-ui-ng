import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {


  public mensagem = new Subject<any>();

  constructor() {
  }

  getValue() {
    return this.mensagem.asObservable();
  }

  emitirMensagem(msg: any) {
    this.mensagem.next(msg);
  }
}
