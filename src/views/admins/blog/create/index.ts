import { defineComponent, inject, reactive, ref, type Ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import Editor from '@tinymce/tinymce-vue';
import { initEditor } from '@/constants/constant';
import type { UploadProps } from 'ant-design-vue';
import type { CreateBlogInterface } from '@/interfaces/BlogInterface';
import { injectionKeys } from '@/constants/injectionKeys';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    PlusOutlined,
    Editor,
  },
  setup() {
    const router = useRouter();
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!;
    isLoading.value = true;

    const configEditor = initEditor((loading: boolean) => {
      isLoading.value = loading;
    });

    const formState = reactive<CreateBlogInterface>({
      title: '',
      short_text: '',
      tags: [],
      content: '',
      image: null,
    });

    const editorAPIKey = import.meta.env.VITE_EDITOR_API_KEY;

    const labelCol = { span: 3 };
    const wrapperCol = { span: 21 };

    const value = ref<string[]>([]);
    const treeData = ref([
      { label: 'parent 1', value: 'parent 1' },
      { label: 'parent 2', value: 'parent 2' },
      { label: 'parent 3', value: 'parent 3' },
      { label: 'parent 4', value: 'parent 4' },
      { label: 'parent 5', value: 'parent 5' },
    ]);

    const handleFinish = () => {
      console.log(formState);
      router.push({ name: 'admin.blog.index' });
    };

    const beforeUpload: UploadProps['beforeUpload'] = (file) => {
      formState.image = file;
      return false;
    };

    return {
      labelCol,
      wrapperCol,
      treeData,
      value,
      handleFinish,
      configEditor,
      formState,
      beforeUpload,
      editorAPIKey,
    };
  },
});
