import type { Editor } from '@ckeditor/ckeditor5-core'
import {
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Undo,
  Strikethrough,
  Alignment,
  Underline,
  BlockQuote,
  LegacyList,
  Heading,
  Link,
  MediaEmbed,
  Image,
  ImageCaption,
  FontColor,
  SourceEditing,
  FullPage,
  ImageUpload,
  ImageInsert,
  ImageResizeEditing,
  ImageResizeButtons,
  ImageToolbar,
  ImageResize,
  CodeBlock,
  Code
  // Code,
  // CodeBlock
} from 'ckeditor5'
import UploadAdapter from '@/plugins/ckeditor/upload-file'
import type { EditorConfig, FileLoader } from 'ckeditor5'
import type { Options } from '@/interfaces/CkeditorInterface'

function UploadAdapterPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: FileLoader) => {
    const config: Options = {
      uploadUrl: 'https://v2.convertapi.com/upload'
    }
    return new UploadAdapter(loader, config)
  }
}

export const editorConfig: EditorConfig = {
  plugins: [
    Undo,
    Bold,
    Essentials,
    Italic,
    Paragraph,
    Strikethrough,
    Underline,
    Alignment,
    BlockQuote,
    LegacyList,
    Heading,
    Link,
    MediaEmbed,
    Image,
    FontColor,
    SourceEditing,
    FullPage,
    ImageUpload,
    UploadAdapterPlugin,
    ImageInsert,
    ImageResizeEditing,
    ImageResizeButtons,
    ImageToolbar,
    ImageCaption,
    ImageResize,
    Code,
    CodeBlock
  ],
  image: {
    resizeUnit: 'px',
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        icon: 'original'
      },
      {
        name: 'resizeImage:custom',
        value: 'custom',
        icon: 'custom'
      },
      {
        name: 'resizeImage:300',
        value: '300',
        icon: 'medium'
      },
      {
        name: 'resizeImage:500',
        value: '500',
        icon: 'large'
      }
    ],
    toolbar: [
      'resizeImage:300',
      'resizeImage:500',
      'resizeImage:original',
      'resizeImage:custom',
      'toggleImageCaption',
      'resizeImage'
    ]
  },
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'code',
      'codeBlock',
      '|',
      'heading',
      '|',
      'fontColor',
      '|',
      'link',
      'blockQuote',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'MediaEmbed',
      'insertImage',
      '|',
      'sourceEditing'
    ],
    shouldNotGroupWhenFull: false
  },
  menuBar: {
    isVisible: true
  }
}
