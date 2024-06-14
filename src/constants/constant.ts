export const pageSize = 5
export const pageSizeAdmin = 10
export const limitString = 120
export const ROUTE_TYPE = {
  UNAUTH: 1,
  AUTH: 2
}
export const validErrorStatus = [404, 500, 401]

export const initEditor = {
  toolbar_mode: 'sliding',
  plugins:
    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
  toolbar:
    'undo redo | blocks fontfamily | fontsizeinput | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  tinycomments_mode: 'embedded',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
  font_size_input_default_unit: 'px'
}
