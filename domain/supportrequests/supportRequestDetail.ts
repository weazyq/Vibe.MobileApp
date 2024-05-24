import { SupportMessage, mapToSupportMessages } from "./messages/supportMessage";

export class SupportRequestDetail {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public clientId: string,
        public employeeId: string | null,
        public openedAt: Date,
        public lastEmployeeAnswerAt: Date | null,
        public lastClientAnswerAt: Date | null,
        public isClosed: boolean,
        public messages: SupportMessage[] = []
    ) { }
}

export function mapToSupportRequestDetail(data: any): SupportRequestDetail {
    const messages: SupportMessage[] = mapToSupportMessages(data.messages)
    
    const lastEmployeeAnswerAt = data.lastEmployeeAnswerAt != null 
        ? new Date(data.lastEmployeeAnswerAt)
        : null
    
    const lastClientAnswerAt = data.lastClientAnswerAt != null 
        ? new Date(data.lastClientAnswerAt)
        : null

    return new SupportRequestDetail(data.id, data.title, data.description, data.clientId, data.employeeId,
        new Date(data.openedAt), lastEmployeeAnswerAt, lastClientAnswerAt, data.isClosed, messages)
}