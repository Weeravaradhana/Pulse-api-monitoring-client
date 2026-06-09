export enum HttpMethod {
    GET    = "GET",
    POST   = "POST",
    PUT    = "PUT",
    PATCH  = "PATCH",
    DELETE = "DELETE",
    HEAD   = "HEAD",
}

export interface HeaderEntry {
    id: string;
    key: string;
    value: string;
}

export interface CreateMonitorFormValues {
    name: string;
    url: string;
    method: HttpMethod;
    interval: number;
    timeout: number;
    headers: HeaderEntry[];
    body?: string;
}