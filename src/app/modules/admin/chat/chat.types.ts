export interface Profile
{
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    about?: string;
}

export interface Contact
{
    id?: string;
    avatar?: string;
    name?: string;
    about?: string;
    details?: {
        emails?: {
            email?: string;
            label?: string;
        }[];
        phoneNumbers?: {
            country?: string;
            phoneNumber?: string;
            label?: string;
        }[];
        title?: string;
        company?: string;
        birthday?: string;
        address?: string;
    };
    attachments?: {
        media?: any[];
        docs?: any[];
        links?: any[];
    };
}

export interface Chat
{
    id?: string;
    contactId?: string;
    contact?: Contact;
    unreadCount?: number;
    muted?: boolean;
    lastMessage?: string;
    lastMessageAt?: string;
    messages?: {
        id?: string;
        chatId?: string;
        contactId?: string;
        isMine?: boolean;
        value?: string;
        createdAt?: string;
    }[];
}


export interface ChatsElement {
    adminChatName: string;
    id: number;
    chatType: number;
    name: string;
    lastMessageId: number;
    creatorId: number;
    createTime: string;
    modifyUserId: number;
    modifyTime: string;
    isDeleted: boolean;
    chatUsers: Array<{
        chatId: number;
        userId: number;
        isAdmin: boolean;
    }>;
    lastMessage: LastMessage;
}

interface LastMessage {
    id: number;
    chatId: number;
    userId: number;
    text: string;
    quoteMessageId: number;
    dateTime: string;
    messageType: number;
    fileSize: number;
    contentType: any;
    isRead: boolean;
    chat: any;
    user: any;
    quoteMessage: any;
}
