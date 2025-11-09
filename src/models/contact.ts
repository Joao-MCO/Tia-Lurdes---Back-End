import { ContactType, DocType } from "./enums";

export type IContact = {
    name: string;
    email: string;
    phone: string;
    docType: DocType;
    document: string;
    type: ContactType;
    message?: string;
}