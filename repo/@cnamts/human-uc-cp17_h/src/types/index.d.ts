// Here you can define types that
// you'll be using across your application
export interface IndexedObject<T = string> {
	[key: string]: T;
}

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
