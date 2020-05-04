export interface Clue {
    id: number,
    answer: string,
    value: number,
    categoryId: number,
    category: {
        id: number,
        title: string,
        cluesCount: number,
    }
}