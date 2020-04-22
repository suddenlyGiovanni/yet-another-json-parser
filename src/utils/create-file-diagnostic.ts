import { SourceFile } from 'types'

export function createFileDiagnostic(
  file: SourceFile,
  start: number,
  length: number,
  message: string
): DiagnosticWithLocation {
  return {
    file,
    length,
    message,
    start,
  }
}

export interface DiagnosticWithLocation {
  file: SourceFile
  length: number
  message: string
  start: number
}
