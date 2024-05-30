import { Client, mapToClient } from "../clients/client";
import { Employee, mapToEmployee } from "../employees/employee";
import { SupportMessage, mapToSupportMessages } from "./messages/supportMessage";

export class SupportRequestDetail {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public client: Client,
        public employee: Employee | null,
        public openedAt: Date,
        public isClosed: boolean,
        public messages: SupportMessage[] = []
    ) { }
}

export function mapToSupportRequestDetail(data: any): SupportRequestDetail {
    const messages: SupportMessage[] = mapToSupportMessages(data.messages)
    
    const client: Client = mapToClient(data.client)
    const employee: Employee | null = data.employee != null ? mapToEmployee(data.employee) : null

    return new SupportRequestDetail(data.id, data.title, data.description, client, employee,
        new Date(data.openedAt), data.isClosed, messages)
}