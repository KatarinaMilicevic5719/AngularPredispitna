export interface Product {
    id:number,
    name:string,
    image:string,
    price:{
        current:number,
        old:number|null
    },
    brandId:number,
    categoryId:number,
    genderId:number,
    sizes:number[],
    availability:string
}
