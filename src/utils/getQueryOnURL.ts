import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getProductsByFilter} from "../slice/product.slice";
import {useAppDispatch} from "../configs/store";

function getQueryOnURL(category_id: number, page: number) {
    let isHasFilter = false
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()
    const brands: string[] = searchParams.getAll('brands[]') as string[]
    const wheelSizes: string[] = searchParams.getAll('wheelSizes[]') as string[]
    const materials: string[] = searchParams.getAll('materials[]') as string[]
    const targetUsings: string[] = searchParams.getAll('targetUsings[]') as string[]
    const prices: string = searchParams.get('prices') as string
    const newProduct: string | null = searchParams.get('newProduct')
    const sort: string | null = searchParams.get('sort') as string
    const bestSale: string | null = searchParams.get('bestSale')
    const additional: number | null = getValueAdditional(newProduct, sort, bestSale)

    if (brands.length > 0 || wheelSizes.length > 0 || materials.length > 0 || targetUsings.length > 0 || prices !== null || additional !== null) {
        isHasFilter = true
    }

    const query = createQueryFilter(brands, wheelSizes, materials, targetUsings, prices, additional)

    useEffect(() => {
        const promiseFilter = dispatch(getProductsByFilter({category: category_id, page: page, queryParams: query}))
        promiseFilter.abort()
    }, []);
    return isHasFilter
}

const getValueAdditional = (newProduct: string | null, sort: string | null, bestSale: string | null) => {
    if (newProduct !== null) return 1
    if (bestSale !== null) return 3
    if (sort !== null) {
        if (sort === 'asc') return 2
        if (sort === 'desc') return 3
    }
    return null
}

const createQueryFilter = (brands: string[], wheelSizes: string[], materials: string[], targetUsings: string[], prices: string, additional: string | number | null) => {
    let query = ''
    brands.map((brand) => {
        query += `brands[]=` + brand.replace(' ', '-') + '&'
    })
    wheelSizes.map((wheelSize) => {
        query += `wheelSizes[]=` + wheelSize.replace(' ', '-') + '&'
    })
    materials.map((material) => {
        query += `materials[]=` + material.replace(' ', '-') + '&'
    })
    targetUsings.map((targetUsing) => {
        query += `targetUsings[]=` + targetUsing.replace(' ', '-') + '&'
    })

    if (additional !== null) {
        switch (Number(additional)) {
            case 1:
                query += `newProduct=true&`
                break
            case 2:
                query += `sort=asc&`
                break
            case 3:
                query += `sort=desc&`
                break
            case 4:
                query += `bestSale=true&`
                break
            default:
                break
        }
    }
    if (prices !== null && prices.split('-')[1] == '0') return query.substring(0, query.length - 1)
    query += `prices=` + prices + '&'
    return query.substring(0, query.length - 1)
}

export {getQueryOnURL, createQueryFilter}
