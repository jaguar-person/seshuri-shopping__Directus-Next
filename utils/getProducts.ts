import { API_URL } from "../constants"
import { Product } from "../types/Product"
import getCategory from "./getCategory"
import serialize from "./serialize"

/**
 * Gets all products from API
 * @params filter Filter condition
 * @returns Product[]
 */
export default async function getProducts<T extends { [key: string]: any }>(filter = {} as T): Promise<Product[]> {
    const allParams = { fields: '*.*', ...filter }
    const fetchURL = `${API_URL}/items/products?${serialize(allParams)}`
    let { data } = await fetch(fetchURL).then(r => r.json())
    data = await Promise.all(data.map(async product => ({
        ...product,
        image: `${API_URL}/assets/${product.image.id}`,
        thumbnail: `${API_URL}/assets/${product.image.id}?width=400&height=400&fit=inside`,
        secondary_images: product.secondary_images.map(image => `${API_URL}/assets/${image.directus_files_id}?width=400&height=400&fit=inside`),
        categories: (await Promise.all(product.categories.map(category => getCategory(category.categories_id))))
    })))

    return data
}

// get all products who has includes categories_id = 4
// http://localhost:8055/items/products?filter[categories][categories_id][_in]=4