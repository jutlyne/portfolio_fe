import type { Options } from '@/interfaces/CkeditorInterface'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { HttpStatusCode } from 'axios'
import type { FileLoader } from 'ckeditor5'

export default class UploadAdapter {
  loader: FileLoader
  options: Options

  /**
   * Creates a new adapter instance.
   */
  constructor(loader: FileLoader, options: Options) {
    this.loader = loader
    this.options = options
  }

  /**
   * Starts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#upload
   */
  upload(): Promise<{ default: string }> {
    return this.loader.file.then(
      (file: File | null) =>
        new Promise((resolve, reject) => {
          const data = new FormData()
          if (file !== null) {
            data.append('file', file)

            const config = this._initRequest()
            this._initListeners(resolve, reject, config)
            this._sendRequest(data, config)
          }
        })
    )
  }

  /**
   * Initializes the `Axios` object using the URL specified as
   * {@link module:upload/uploadconfig~SimpleUploadConfig#uploadUrl `simpleUpload.uploadUrl`} in the editor's
   * configuration.
   */
  _initRequest(): AxiosRequestConfig {
    return {
      headers: {
        ...this.options.headers
      },
      withCredentials: this.options.withCredentials || false
    }
  }

  /**
   * Initializes Axios listeners
   *
   * @param resolve Callback function to be called when the request is successful.
   * @param reject Callback function to be called when the request cannot be completed.
   * @param file Native File object.
   */
  _initListeners(
    resolve: (value: any) => void,
    reject: (reason?: any) => void,
    config: AxiosRequestConfig
  ) {
    config.validateStatus = (status) => {
      return status < HttpStatusCode.InternalServerError
    }

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        const urls = response.data.Url ? { default: response.data.Url } : response.data.urls
        resolve({
          ...response.data,
          urls
        })
        return response
      },
      (error: AxiosError) => {
        const errorMessage = (error.response?.data as { message?: string })?.message || 'An error occurred';
        reject(errorMessage)
        return Promise.reject(error)
      }
    )
  }
  /**
   * Prepares the data and sends the request.
   *
   * @param file File instance to be uploaded.
   */
  _sendRequest(data: FormData, config: AxiosRequestConfig) {
    axios.post(this.options.uploadUrl, data, config)
  }
}
