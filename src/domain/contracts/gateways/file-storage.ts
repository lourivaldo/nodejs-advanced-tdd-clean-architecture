export namespace UploadFile {
  export type Input = { file: Buffer, key: string }
}
export interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<void>
}
