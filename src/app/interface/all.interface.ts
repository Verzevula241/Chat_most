import { Injectable } from '@angular/core';

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

export interface LastMessage {
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

export interface AllData {
    buildingObjects: BuildingObject[];
    chats: ChatsElement[];
    contractors: ContractorObject[];
    currentUser: { id: number; isAdmin: boolean; isModerator: boolean };
    diskInfo: { usedSize: number; totalSize: number; directorySize: number };
    statSettings: { minHours: number; normHours: number };
    users: UsersElement[];
}

export interface UsersElement {
    activeTimeString: string;
    createTime: string;
    creatorId: number;
    currentTime: string;
    email: string;
    id: number;
    isAdmin: boolean;
    isChatAdmin?: boolean;
    isAutoContact: boolean;
    isChatCreator: boolean;
    isDeleted: boolean;
    isModerator: boolean;
    isStatManager: boolean;
    login: string;
    longName: string;
    longName2: string;
    modifyTime: string;
    modifyUserId: number;
    name: string;
    name2: string;
    patronymic: string;
    patronymic2: string;
    phone: string;
    position: string;
    status: string;
    surname: string;
    surname2: string;
    timeZone: number;
    timeZoneModifyTime: string;
    userAccesses: Array<{ senderId?: number; recipientId: number }>;
    userReporting: number;
    userpic: string;
    password?: string;
    emailPassword?: string;
}

export interface AllObjects {
    buildingObjects: BuildingObject[];
    chats: ChatsElement[];
    contractors: ContractorObject[];
    currentUser: { id: number; isAdmin: boolean; isModerator: boolean };
    diskInfo: { usedSize: number; totalSize: number; directorySize: number };
    statSettings: { minHours: number; normHours: number };
    users: UsersElement[];
}

export interface BuildingObject {
    bankName: string;
    builderName: string;
    buildingControl: string;
    clientName: string;
    contractEnd: string;
    contractNumber: string;
    contractStart: string;
    engineerReportType: number;
    id: number;
    latitude: string;
    longitude: string;
    managerId: number;
    name: string;
    prescriptionReportType: number;
    subContractor: string;
    updateWeatherTime: number;
    workDescriptions: string;
}

export interface AddUsersElement {
    email: string;
    emailPassword: string;
    id: number;
    login: string;
    name: string;
    name2: string;
    password: string;
    patronymic: string;
    patronymic2: string;
    phone: string;
    surname: string;
    surname2: string;
    userAccesses: Array<{ recipientId: number }>;
    userReporting: number;
    userpic: null;
}

export interface DeletedChat {
    'id': number;
    'chatType': number;
    'name': string;
    'chatPic': string;
    'creatorId': number;
    'createTime': Date;
    'modifyUserId': number;
    'modifyTime': Date;
    'isDeleted': boolean;
    'lastMessageId': number;
    'chatUsers': number;
    'messages': string;
    'messageUsers': string;
    'lastMessage': string;

}


export interface ContractorObject { id: number; name: string }


@Injectable()
export abstract class InterfaceService {
}

