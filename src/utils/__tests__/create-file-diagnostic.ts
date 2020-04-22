import {
  DiagnosticWithLocation,
  createFileDiagnostic,
} from '../create-file-diagnostic'

// eslint-disable-next-line jest/no-mocks-import
import { text } from 'lexical-analysis/__mocks__'
import { Node, SourceFile, SyntaxKind } from 'types'

describe('createFileDiagnostic', () => {
  it('should return a `DiagnosticWithLocation` object', () => {
    // arrange
    expect.hasAssertions()
    const message = 'error message'
    const start = 0
    const length = 0
    const file: SourceFile = {
      _declarationBrand: 'SourceFile',
      end: 0,
      identifierCount: 0,
      kind: SyntaxKind.SourceFile,
      nodeCount: 0,
      parent: ({} as unknown) as Node,
      pos: 0,
      symbolCount: 0,
      text,
    }

    const diagnosticWithLocation: DiagnosticWithLocation = {
      file,
      length,
      message,
      start,
    }
    // act
    const diagnostic = createFileDiagnostic(file, start, length, message)
    // assert
    expect(diagnostic).toStrictEqual(diagnosticWithLocation)
  })
})
