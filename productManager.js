const fs = require ('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    vacio(toCheck) {
        if (toCheck != "") {
            return true;
        } else {
            throw new Error("One or more info is empty");
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        if (
          this.isEmpty(title) &&
          this.isEmpty(description) &&
          this.isEmpty(price) &&
          this.isEmpty(thumbnail) &&
          this.isEmpty(code) &&
          this.isEmpty(stock) &&
        ) {
          let elements = await fs.promises.readFile(this.path, "utf-8");
          elements = JSON.parse(elements);
            
            if (elements.find((e) => e.code === code) === undefined) {
                elements.push(
                    new Productos(
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                    )
                );
                await fs.promises.writeFile(this.path, JSON.stringify(elements));
            } else {
                console.log("El código ya existe");
            }
        } else {
            console.log ("Uno de los elementos está vacío");
        }
    }

    async updateProduct(id, dataUpdate) {
        const elements = await fs.promises.readFile(this.path, "utf-8");
        elements = JSON.parse(elements);
        const newData = elements.filter((item) => item.id !== id);
        newData = [...newData, {id, ...dataUpdate}];
        await fs.promises.writeFile(this.path, JSON.stringify(newData));
    }

    async deleteProduct(id) {
        const elements = await fs.promises.readFile(this.path, "utf-8");
        elements = JSON.parse(elements);
        const newData = elements.filter((item) => item.id !== id);
        await fs.promises.writeFile(this.páth, JSON.stringify(newData)); 
    }

    async getProducts () {
        const elements = await fs.promises.readFile(this.path, "utf-8");
        console.log("Mostrar los productos ", JSON.parse(elements));
        return;
    }

    async getProductById (id) {
        const elements = await fs.promises.readFile(this.path, "utf-8");
        elements = JSON.parse(elements);

        const laId = elements.find((e) => e.id === id);
        if (laId) {
            console.log("Producto encontrado por ID", laId);
            return laId;
        } else {
            throw new Error ("La ID no fue encontrada");
        }
    }
}

class Productos {
    constructor(id, title, description, price, thumbnail, code, stock) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}