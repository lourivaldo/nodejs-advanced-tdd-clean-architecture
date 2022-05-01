export namespace UploadFile {
  export type Input = { file: Buffer, key: string }
  export type Output = string
}

export interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<UploadFile.Output>
}

export namespace DeleteFile {
  export type Input = { key: string }
}

export interface DeleteFile {
  delete: (input: DeleteFile.Input) => Promise<void>
}
