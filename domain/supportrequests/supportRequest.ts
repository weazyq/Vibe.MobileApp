export class SupportRequest{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public clientId: string,
        public employeeId: string | null,
        public openedAt: Date,
        public lastEmployeeAnswerAt: Date | null,
        public lastClientAnswerAt: Date | null,
        public isClosed: boolean
    ) { }
}

export function mapToSupportRequest(data: any): SupportRequest {

    const lastEmployeeAnswerAt = data.lastEmployeeAnswerAt != null 
        ? new Date(data.lastEmployeeAnswerAt)
        : null
    
    const lastClientAnswerAt = data.lastClientAnswerAt != null 
        ? new Date(data.lastClientAnswerAt)
        : null

    return new SupportRequest(data.id, data.title, data.description, data.clientId, data.employeeId, new Date(data.openedAt), lastEmployeeAnswerAt, lastClientAnswerAt, 
        data.isClosed)    
}

export function mapToSupportRequests(data: any[]): SupportRequest[] {
    return data.map(d => mapToSupportRequest(d))
}