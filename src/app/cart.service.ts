import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Message } from 'primeng/api'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly overlayVisible = new BehaviorSubject<boolean>(false)

  // Observable to be used by components to react to changes
  public overlayVisible$ = this.overlayVisible.asObservable()

  private readonly _messages = new BehaviorSubject<Message[]>([])

  // Observable message stream
  public messages = this._messages.asObservable()

  // Method to toggle visibility based on current state
  toggleOverlay (): void {
    this.overlayVisible.next(!this.overlayVisible.value)
  }

  // Method to set specific visibility state
  setOverlayVisible (visible: boolean): void {
    this.overlayVisible.next(visible !== null ? visible : false)
  }

  // Method to set messages
  addMessage (message: Message): void {
    const currentMessages = this._messages.getValue()
    this._messages.next([...currentMessages, message])
  }
}
