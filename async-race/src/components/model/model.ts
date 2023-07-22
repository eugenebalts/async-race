export default class Model {
    
    readonly baseLink: string = 'http://127.0.0.1:3000';

    async fetchData(endpoint: string) {
        return await fetch(`${this.baseLink}${endpoint}`)
            .then((res) => res.json())
            .then((data) => data);
    }
}

// type Car = Record<string, string>;