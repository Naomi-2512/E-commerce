"use strict";
class Display {
    static urlEndPoint = 'http://localhost:3000';
    static async fetchProducts() {
        const response = await fetch(`${this.urlEndPoint}/holder`);
        const data = await response.json();
        return data;
    }
    static async getItemsByproductName(productName) {
        const response = await fetch(`${this.urlEndPoint}/holder?name=${productName}`);
        const data = await response.json();
        return data;
    }
    static async createItems(myObject) {
        const response = await fetch(`${this.urlEndPoint}/holder`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myObject)
        });
        const data = await response.json();
        return data;
    }
    static async updateItems(id, myObject) {
        const response = await fetch(`${this.urlEndPoint}/holder/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myObject)
        });
        const data = await response.json();
        return data;
    }
    static async deleteItems(id) {
        const response = await fetch(`${this.urlEndPoint}/holder/${id}`, {
            method: 'DELETE',
        });
    }
}
