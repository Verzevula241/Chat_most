import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'app/shared/shared.module';
import { chatRoutes } from 'app/modules/admin/chat/chat.routing';
import { ChatComponent } from 'app/modules/admin/chat/chat.component';
import { ChatsComponent } from 'app/modules/admin/chat/chats/chats.component';
import { ContactInfoComponent } from 'app/modules/admin/chat/contact-info/contact-info.component';
import { ConversationComponent } from 'app/modules/admin/chat/conversation/conversation.component';
import { NewChatComponent } from 'app/modules/admin/chat/new-chat/new-chat.component';
import { ProfileComponent } from 'app/modules/admin/chat/profile/profile.component';

@NgModule({
    declarations: [
        ChatComponent,
        ChatsComponent,
        ContactInfoComponent,
        ConversationComponent,
        NewChatComponent,
        ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(chatRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSidenavModule,
        SharedModule
    ]
})
export class ChatModule
{
}
