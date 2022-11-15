export interface Data<T> {
    getAll: () => Promise<Array<T>>;
}
