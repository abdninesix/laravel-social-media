export interface UserMeta {
    id:string;
    email: string;
    name: string;
    avatar: string | null;
}

export interface ProfileResponse {
    id: string;
    email: string;
    description: string;
    name: string;
    avatar: string | null;
    banner: string | null;
}