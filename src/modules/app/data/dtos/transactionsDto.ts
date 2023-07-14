import { Timestamp } from "@angular/fire/firestore";

export interface TransactionsDto{
    requestFrom: number;
    pageNumber: number;
}

type BaseTransaction = {
    tid: string;
    sender: MyUser;
    receiver: MyUser;
    timestamp: Timestamp;
    amount: number;
    fee: number;
    result: boolean;
}

export interface MyTransaction {
    senderBalance: number;
    receiverBalance: number;
    receiverEmail: string;
    senderEmail: string;
    receiverName: string;
    senderName: string;
    receiverPhone: string;
    senderPhone: string;
    timestamp: Timestamp;
    amount: number;
    fee: number;
    result: boolean;
}

export interface MyUser {
    name: string | null;
    uid: string;
    location: string | null;
    email: string | null;
    phone: string | null;
    timestamp: Timestamp;
    balance: number;
}