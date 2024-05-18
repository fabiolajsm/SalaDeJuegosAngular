import { Component, inject } from '@angular/core';
import { ChatMessage } from '../../../interfaces/message.interface';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
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

  currentUsername: string = '';
  subsUsers!: Subscription;
  subsChatHistory!: Subscription;
  messages: ChatMessage[] = [];
  messagesGroupedByDate: { date: string; messages: ChatMessage[] }[] = [];
  users: any[] = [];
  prefixUsername: string = '@';

  ngOnInit(): void {
    this.subsUsers = this.authService
      .getUsers()
      .subscribe((response: UserInterface[]) => {
        this.users = response.filter(
          (user) => user.username !== this.currentUsername
        );
      });

    this.authService.user$.subscribe((user) => {
      if (user?.displayName) {
        this.currentUsername = user.displayName;
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
        this.groupMessagesByDate();
      });
  }

  sendMessage() {
    const rawForm = this.form.getRawValue();

    if (rawForm.newMessage.length > 0) {
      const newDate = new Date();
      const date = format(newDate, 'dd MMMM yyyy');
      const time = format(newDate, 'hh:mm a');

      this.chatService.updateMessages(
        this.currentUsername,
        rawForm.newMessage,
        date,
        time
      );
      this.form.reset();
      this.loadMessages();
    }
  }

  orderByDateAndTime(messageA: ChatMessage, messageB: ChatMessage) {
    const dateA = parse(
      `${messageA.date} ${messageA.time}`,
      'dd MMM yyyy hh:mm a',
      new Date()
    );
    const dateB = parse(
      `${messageB.date} ${messageB.time}`,
      'dd MMM yyyy hh:mm a',
      new Date()
    );
    return dateA.getTime() - dateB.getTime();
  }

  groupMessagesByDate() {
    const grouped: { [key: string]: ChatMessage[] } = {};

    for (const message of this.messages) {
      if (!grouped[message.date]) {
        grouped[message.date] = [];
      }
      grouped[message.date].push(message);
    }

    this.messagesGroupedByDate = Object.keys(grouped)
      .sort((dateA, dateB) => {
        const parsedDateA = parse(dateA, 'dd MMMM yyyy', new Date(), {
          locale: es,
        });
        const parsedDateB = parse(dateB, 'dd MMMM yyyy', new Date(), {
          locale: es,
        });

        return parsedDateA.getTime() - parsedDateB.getTime();
      })
      .map((date) => ({
        date,
        messages: grouped[date].sort(this.orderByDateAndTime),
      }));
  }
}
