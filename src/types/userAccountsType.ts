type user = {
    email: string,
    uid: string,
    accounts: Record<string, account>,
}

type account = {
    number: string,
    description: string,
    transactions: Record<string, transaction>,
    type: string,
    currency: string,
}

type transaction = {
    date: Date | string,
    description: string,
    amount: number | null,
    type: string,
    currency?: string
}

export type { user, account, transaction }