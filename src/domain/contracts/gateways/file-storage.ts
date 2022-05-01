export namespace UploadFile {
  export type Input = { file: Buffer, key: string }
  export type Output = string
}
export interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<UploadFile.Output>
}
