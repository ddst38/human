// Here you can define types that
// you'll be using across your application

export interface Link {
	id: number;
	url: string;
	name: string;
}

export interface LinkItem {
	title: string;
	links: Link[];
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
