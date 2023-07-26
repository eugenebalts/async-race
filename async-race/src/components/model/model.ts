export default class Model {
    
    readonly baseLink: string = 'http://localhost:3000';

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

    async deleteData(path: string, id: number) {
        const endpoint = `${this.baseLink}${path}${id}`;
        return await fetch(endpoint, {
            method: 'DELETE',
        })
        .then((data) => {
            return data.ok;
        });
    }

    async patchData(path: string, queryParams: Array<IQueryParams>) {

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
        try {
            const response = await fetch(endpoint, {
                method: 'PATCH',
            });
            const data = response.json();
            return data;
        } catch(err) {
            console.log(err);
        }
        // return await fetch(endpoint, {
        //     method: 'PATCH',
        // })
        // .then((data) => {
        //     return data.json();
        // });
    }
}

interface IQueryParams {
    key: string;
    value: number | string;
}