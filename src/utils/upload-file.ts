import { api } from './axios'

export default class UploadAdapter {
  loader: any
  options: any
  xhr: any
  /**
   * Creates a new adapter instance.
   */
  constructor(loader: any, options: any) {
    this.loader = loader
    this.options = options
  }
  /**
   * Starts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#upload
   */
  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          const data = new FormData()
          data.append('upload', file)
          api.post('http://192.168.3.152:8080/api/upload', data)
          //   this._initRequest()
          //   this._initListeners(resolve, reject, file)
          // this._sendRequest(file)
        })
    )
  }
  /**
   * Aborts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#abort
   */
  abort() {
    if (this.xhr) {
      this.xhr.abort()
    }
  }
  /**
   * Initializes the `XMLHttpRequest` object using the URL specified as
   * {@link module:upload/uploadconfig~SimpleUploadConfig#uploadUrl `simpleUpload.uploadUrl`} in the editor's
   * configuration.
   */
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest())
    xhr.open('POST', this.options.uploadUrl, true)
    xhr.responseType = 'json'
  }
  /**
   * Initializes XMLHttpRequest listeners
   *
   * @param resolve Callback function to be called when the request is successful.
   * @param reject Callback function to be called when the request cannot be completed.
   * @param file Native File object.
   */
  _initListeners(
    resolve: { (value: unknown): void; (arg0: any): void },
    reject: { (reason?: any): void; (arg0: string | undefined): any },
    file: { name: any }
  ) {
    const xhr = this.xhr
    const loader = this.loader
    const genericErrorText = `Couldn't upload file: ${file.name}.`
    xhr.addEventListener('error', () => reject(genericErrorText))
    xhr.addEventListener('abort', () => reject())
    xhr.addEventListener('load', () => {
      const response = xhr.response
      if (!response || response.error) {
        return reject(
          response && response.error && response.error.message
            ? response.error.message
            : genericErrorText
        )
      }
      const urls = response.url ? { default: response.url } : response.urls
      // Resolve with the normalized `urls` property and pass the rest of the response
      // to allow customizing the behavior of features relying on the upload adapters.
      resolve({
        ...response,
        urls
      })
    })
    // Upload progress when it is supported.
    /* istanbul ignore else -- @preserve */
    if (xhr.upload) {
      xhr.upload.addEventListener(
        'progress',
        (evt: { lengthComputable: any; total: any; loaded: any }) => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total
            loader.uploaded = evt.loaded
          }
        }
      )
    }
  }
  /**
   * Prepares the data and sends the request.
   *
   * @param file File instance to be uploaded.
   */
  _sendRequest(file: string | Blob) {
    // Set headers if specified.
    const headers = this.options.headers || {}
    // Use the withCredentials flag if specified.
    const withCredentials = this.options.withCredentials || false
    for (const headerName of Object.keys(headers)) {
      this.xhr.setRequestHeader(headerName, headers[headerName])
    }
    this.xhr.withCredentials = withCredentials
    // Prepare the form data.
    const data = new FormData()
    data.append('upload', file)
    // Send the request.
    this.xhr.send(data)
  }
}

// export default class UploadAdapter {
//   loader: any
//   constructor(loader: any) {
//     // The file loader instance to use during the upload.
//     this.loader = loader
//   }

//   // Starts the upload process.
//   upload() {
//     // Update the loader's progress.
//     server.onUploadProgress((data: { total: any; uploaded: any }) => {
//       this.loader.uploadTotal = data.total
//       this.loader.uploaded = data.uploaded
//     })

//     // Return a promise that will be resolved when the file is uploaded.
//     return this.loader.file.then((file: any) => server.upload(file))
//   }

//   // Aborts the upload process.
//   abort() {
//     // Reject the promise returned from the upload() method.
//     server.abortUpload()
//   }
// }
