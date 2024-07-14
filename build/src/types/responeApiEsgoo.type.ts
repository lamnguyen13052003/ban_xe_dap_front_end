export type ResponseApiEsgoo<T> = {
    error: number,
    error_text: string,
    data_name: string,
    data: T
}