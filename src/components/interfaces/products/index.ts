export interface IProductItem {
    id: number;
    name: string,
    price: string,
    images: string[],
    categoryName: string,
    categoryId: number,
    description: string,
    
}

// export interface IProductItem {
//     id: number;
//     name: string,
//     price: number,
//     images: string[],
//     categoryName: string,
//     categoryId: number,
// }
export interface IProductImageDesc {
    id: number,
    image: string,
}

export interface IProductCreate {
    name: string,
    price: number,
    categoryId: number,
    images: File[]|null,
    description: string,
}

export interface IProductEdit {
    name: string;
    price: number;
    categoryId: number;
    images?: File[];
    deletedPhotoNames?: string[];
    description: string,  // Додаємо поле для імен видалених фото
}

// export interface IProductEdit {
//     id: number;
//     name: string;
//     price: number;
//     categoryId: number;
//     newImages?: File[];
//     removeImages?: string[];
// }
