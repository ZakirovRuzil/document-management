import api from './api';

import type { IDocument } from './types/dashboardTypes.ts';

export async function fetchDocuments(query: string): Promise<IDocument[]> {
    const response = await api.get<IDocument[]>(
        '/user/docs',
        {
            params: { search: query },
        },
    );

    return response.data;
}

