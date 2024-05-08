
// Тип данных ответа сервера T - тип данных запроса
export interface ResponseData<T> {
    data: T;
    status: number;
}

export async function createRequest<T>(data: T, delay = 1000): Promise<ResponseData<T>> {
    await new Promise((resolve) => setTimeout(resolve, delay));

    const responseData: ResponseData = {
        data,
        status: 200, // Успешный ответ
    };

    return responseData;
}