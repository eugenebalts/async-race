export default class Model {
    
    readonly baseLink: string = 'http://127.0.0.1:3000';

    async getData(path: string, queryParams?: Array<IQueryParams>) {
        const generateQueryString = () => {
            if (queryParams?.length) {
                return `?${queryParams.map(param => `${param.key}=${param.value}`).join('&')}`;
            } else {
                return '';
            }
        };

        let endpoint = `${this.baseLink}${path}`;
        if (queryParams) {
            endpoint = `${endpoint}${generateQueryString()}`;
        }
        return await fetch(endpoint)
            .then((res) => res.json())
            .then((data) => data);
    }

    async postData(method: string, path: string, data: object) {
        const endpoint = `${this.baseLink}${path}`;
        const response = await fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const newElement = await response.json();
        return newElement;
    }
}

interface IQueryParams {
    key: string;
    value: number;
}