export interface User {
    value: Value;
}

export interface Value {
    authorities: Authority[];
    username:    string;
}

export interface Authority {
    authority:  string;
    perimeters: string[];
}

export interface UserState {
	user: User | null;
}
