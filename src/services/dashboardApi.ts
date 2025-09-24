import api from './api';

import { mockDocuments } from './mock/mockData';

import type { IDocument } from './types/dashboardTypes.ts';

export async function fetchDocuments(query: string): Promise<IDocument[]> {
    return mockDocuments.filter((doc: IDocument) =>
        doc.name.toLowerCase().includes(query.toLowerCase())
    );

    const response = await api.get<IDocument[]>(
        '/user/docs',
        {
            params: { search: query },
        },
    );

    return response.data;
}

