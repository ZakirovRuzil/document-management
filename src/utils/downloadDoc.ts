import type { IDocument } from '@/services/types/dashboardTypes'

export function downloadDocFile(doc: IDocument) {
    const blob = new Blob([doc.description], {
        type: 'text/plain;charset=utf-8'
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${doc.name}.txt`
    link.click()
}
