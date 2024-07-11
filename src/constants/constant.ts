import { h } from 'vue'
import { BookOutlined, CommentOutlined, ProfileOutlined } from '@ant-design/icons-vue'
import type { MenuItem } from '@/interfaces/MenuInterface'
import {
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Undo,
  Code,
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
  ImageResize
} from 'ckeditor5'
import UploadAdapter from '@/utils/upload-file'

export const pageSize = 5
export const pageSizeAdmin = 10
export const limitString = 120
export const ROUTE_TYPE = {
  UNAUTH: 1,
  AUTH: 2
}
export const validErrorStatus = [404, 500]

export const menuItemAdmin: MenuItem[] = [
  {
    key: 'blog',
    label: 'Blogs',
    title: 'Blogs',
    icon: () => h(BookOutlined),
    children: [
      {
        key: 'admin.blogs.index',
        label: 'List',
        title: 'List',
        to: 'admin.blogs.index'
      },
      {
        key: 'admin.blogs.create',
        label: 'Create',
        title: 'Create',
        to: 'admin.blogs.create'
      }
    ]
  },
  {
    key: 'comment',
    label: 'Comments',
    title: 'Comments',
    icon: () => h(CommentOutlined),
    children: [
      {
        key: 'admin.comments.index',
        label: 'List',
        title: 'List',
        to: 'admin.comments.index'
      }
    ]
  },
  {
    key: 'admin.profile',
    label: 'Profile',
    title: 'Profile',
    icon: () => h(ProfileOutlined),
    to: 'admin.profile'
  }
]

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    // Configure the URL to the upload script in your back-end here!
    return new UploadAdapter(loader, {
      uploadUrl: 'http://192.168.3.152:8080/api/upload'
    })
  }
}

export const editorConfig = {
  plugins: [
    Undo,
    Bold,
    Essentials,
    Italic,
    Paragraph,
    Code,
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
    MyCustomUploadAdapterPlugin,
    ImageInsert,
    ImageResizeEditing,
    ImageResizeButtons,
    ImageToolbar,
    ImageCaption,
    ImageResize
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
  // extraPlugins: [uploader]
}
