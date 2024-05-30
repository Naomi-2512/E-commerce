

interface Items {
    id: string;
    image : String;
    productName : String;
    description : String;
    amount : string;
}

class Display {
    static urlEndPoint:string = 'http://localhost:3000';

    public static async fetchProducts(): Promise<Items[]>{
        const response = await fetch(`${this.urlEndPoint}/holder`);
        const data = await response.json();
        return data;
    }

    public static async getItemsByproductName(productName:string):Promise<Items[]>{
        const response = await fetch(`${this.urlEndPoint}/holder?name=${productName}`);
        const data = await response.json();
        return data;

    }

    public static async createItems(myObject: Partial<Items>) : Promise<Items[]>{
        const response = await fetch (`${this.urlEndPoint}/holder` , {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myObject)
        });
        const data = await response.json();
        return data;
    }

    public static async updateItems(id:string, myObject:Partial<Items>) : Promise<Items[]>{
        const response = await fetch (`${this.urlEndPoint}/holder/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myObject) 
        });
        const data = await response.json();
        return data;
    }

    public static async deleteItems(id:string): Promise<void>{
        const response = await fetch(`${this.urlEndPoint}/holder/${id}` ,{
            method:'DELETE',
            
            
        });

    }
}