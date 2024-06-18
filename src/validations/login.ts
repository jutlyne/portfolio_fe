export const usernameRules = [
  {
    required: true,
    whitespace: true,
    message: 'Nhập vào tên đăng nhập!'
  },
  {
    min: 6,
    message: 'Tên đăng nhập phải lớn hơn 6 ký tự!'
  }
]

export const passwordRules = [
  {
    required: true,
    whitespace: true,
    message: 'Nhập vào mật khẩu!'
  },
  {
    min: 6,
    message: 'Mật khẩu phải lớn hơn 6 ký tự!'
  }
]
