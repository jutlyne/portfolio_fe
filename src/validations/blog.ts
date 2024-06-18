export const formRules = {
  titleRules: [
    {
      required: true,
      whitespace: true,
      message: 'Nhập vào tiêu đề bài viết!'
    }
  ],
  shortTextRules: [
    {
      required: true,
      whitespace: true,
      message: 'Nhập vào tiêu đề ngắn của bài viết!'
    },
    {
      max: 100,
      message: 'Tiêu đề ngắn không vượt quá 100 ký tự'
    }
  ],
  tagRules: [
    {
      required: true,
      message: 'Chọn vào nhãn của bài viết!'
    }
  ]
}
