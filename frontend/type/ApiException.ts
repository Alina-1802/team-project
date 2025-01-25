
export class ApiException<Payload, Response> {
    constructor(public readonly payload: Payload, public readonly response: Response) {
    }
}
