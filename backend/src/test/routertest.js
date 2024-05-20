const { faker, id_ID, fa } = require('@faker-js/faker')

const generateProducts = () => {
    return {
        id: faker.commerce.productAdjective,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.commerce.isbn(),
        stock: faker.string.numeric(),
        category: faker.word.noun(),
        status: true
    }
}

module.exports = {
    generateProducts
}