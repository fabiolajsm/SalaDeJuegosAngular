import { Component, inject } from '@angular/core';
import { ChatMessage } from '../../../interfaces/message.interface';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { format } from 'date-fns';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    newMessage: ['', Validators.required],
  });
  authService = inject(AuthService);
  chatService = inject(ChatService);

  currentUserEmailMessage: string = '';
  replyEmail: string = '';
  selectedUserName: string = '';

  subsUsers!: Subscription;
  subsChatHistory!: Subscription;
  messages: ChatMessage[] = [];
  users: any[] = [];
  hasToShowSelector: boolean = true;
  isUserSelected: boolean = false;

  ngOnInit(): void {
    this.subsUsers = this.authService
      .getUsers()
      .subscribe((response: UserInterface[]) => {
        this.users = response.filter(
          (user) => user.email !== this.currentUserEmailMessage
        );
      });

    this.authService.user$.subscribe((user) => {
      if (user?.email) {
        this.currentUserEmailMessage = user.email;
      }
    });
    this.loadMessages();
  }

  ngOnDestroy(): void {
    this.subsUsers.unsubscribe();
    this.subsChatHistory.unsubscribe();
  }

  loadMessages() {
    this.subsChatHistory = this.chatService
      .getMessages()
      .subscribe((data: ChatMessage[]) => {
        this.messages = data;
        this.messages.sort(this.orderByDateAndTime);
      });
  }

  sendMessage() {
    const rawForm = this.form.getRawValue();

    if (rawForm.newMessage.length > 0) {
      const newDate = new Date();
      let date = format(newDate, 'dd MMMM yyyy');
      let time = format(newDate, 'hh:mm a');

      this.chatService.updateMessages(
        this.currentUserEmailMessage,
        rawForm.newMessage,
        date,
        time,
        this.replyEmail
      );

      this.form.reset();
    }
  }

  toggleView(name: string) {
    if (name === 'ver chat') {
      this.loadMessages();
    } else {
      this.selectedUserName = '';
    }
    this.hasToShowSelector = !this.hasToShowSelector;
    this.isUserSelected = !this.hasToShowSelector;
  }

  selectUser(event: Event) {
    if (!event) return;
    const target = event.target as HTMLSelectElement;
    const selectedEmail = target.value;
    if (!selectedEmail) return;
    this.replyEmail = selectedEmail;
    this.messages = this.messages.filter(
      (message) =>
        message.email === this.currentUserEmailMessage ||
        message.sendTo === this.currentUserEmailMessage ||
        message.email === selectedEmail ||
        message.sendTo === selectedEmail
    );
    this.isUserSelected = true;
    this.authService.getUserName(selectedEmail).subscribe((name) => {
      this.selectedUserName = name;
    });
  }

  orderByDateAndTime(messageA: any, messageB: any) {
    if (messageA.date < messageB.date) {
      return -1;
    } else if (messageA.date > messageB.date) {
      return 1;
    } else if (messageA.date == messageB.date) {
      if (messageA.time < messageB.time) {
        return -1;
      }
      if (messageA.time > messageB.time) {
        return 1;
      }
      return 0;
    }
    return 0;
  }
}
