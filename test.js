class ProductManager {

    producto = []
    constructor() { }

    addProduct(title, description, price, thumbnail, code, stock) {
        title = title || "producto prueba"
        description = description || "Este es un producto prueba"
        price = price || 200
        thumbnail = thumbnail || "Sin imagen"
        code = code || Math.random() * 99
        stock = stock || 25

        let id = 0
        for (let i = 0; i < this.producto.length; i++) {
            const element = this.producto[i]
            if (element.id > id) {
                id = element.id
            }
        }
        id++

        if (this.getProductbyCode(code)) {
            console.log("Error, no se puede repetir el mismo codigo")
        } else return this.producto.push({ id: id, title, description, price, thumbnail, code, stock })
    }

    getProductbyCode(code) {
        const product = this.producto.find(product => product.code === code)
        if (product) return true
    }

    getProducts() {
        console.log("PRODUCTOS ENCONTRADOS : ", this.producto)
    }

    getProductByid(id) {
        const findById = this.producto.find((item) => item.id == id)

        if (findById) {
            console.log(`PRODUCTO ENCONTRADO, ID DEL PRODUCTO = ` + id)
        } else console.log("NOT FOUND ID: " + id)
    }
}

const product = new ProductManager()

product.addProduct("oaa", `ooooooo`, 200, "https//:www.google.com", 25, 6)
product.addProduct("oaa", `ooooooo`, 200, "https//:www.google.com", 25, 1)

product.getProductByid(15)
console.log(product)