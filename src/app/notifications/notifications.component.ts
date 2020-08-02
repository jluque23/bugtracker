import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { BugNotification } from '../shared/models/bugnotification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: BugNotification[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.notificationService.getNotifications().subscribe(response => {
      this.notifications = response as BugNotification[];
      this.notifications = this.notifications.reverse();
    });
  }

}
