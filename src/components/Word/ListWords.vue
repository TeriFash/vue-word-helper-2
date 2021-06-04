<template>
  <div>
    <v-list flat class="pt-0">
      <ClipboardWord
        v-for="(word, i) in words"
        :key="i"
        :hendler="hendlerText || clipboarText || isHeader"
        :text="word"
        :text-key="[i++, listLength[tabActive]]"
        @dialog="onDialog"
      />
    </v-list>
    <DialogInfo
      :snackbar="showDialog"
      :text="textDialog"
      :type="type"
      @snackbar:close="close"
    ></DialogInfo>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const DialogInfo = () => import('@/components/Global/DialogInfo')
const ClipboardWord = () => import('@/components/Word/ClipboardWord')
export default {
  components: {
    ClipboardWord,
    DialogInfo,
  },
  props: ['words'],
  data() {
    return {
      showDialog: false,
      textDialog: '',
      type: '',
      hendlerText: '',
      clipboarText: '',
      polling: null,
    }
  },
  watch: {
    '$store.state.words.textInputName': {
      immediate: true,
      handler(newValue) {
        this.hendlerText = newValue
      },
    },
    '$store.state.words.textInClipboard': {
      immediate: true,
      handler(newValue) {
        this.clipboarText = newValue
      },
    },
  },
  mounted() {
    window.addEventListener('focus', this.onWindowFocuse)
    window.addEventListener('blur', this.onWindowBlur)
  },
  beforeDestroy() {
    window.removeEventListener('focus', this.onWindowFocuse)
    window.removeEventListener('blur', this.onWindowBlur)
  },
  computed: {
    // ...mapState(['textInClipboard']),
    ...mapGetters({
      getClipboardData: 'getClipboardData',
      listLength: 'getWordListLength',
      tabActive: 'getTabActive',
    }),
    isHeader() {
      return this.getClipboardData || ''
    },
  },
  methods: {
    ...mapActions(['SET_CLIPBOARD_DATA']),
    close(e) {
      this.showDialog = e
    },
    onDialog(type) {
      if (type === 'success') {
        this.textDialog = 'Success текст добавлен в буфер обмена'
        this.showDialog = true
        this.type = 'success'
      } else {
        this.textDialog = 'Error текст не добавлен'
        this.showDialog = true
        this.type = 'error'
      }
    },
    async onClipParse() {
      this.polling = await setInterval(() => {
        this.SET_CLIPBOARD_DATA()
      }, 4000)
    },
    onWindowFocuse() {
      this.onClipParse()
    },
    onWindowBlur() {
      clearInterval(this.polling)
    },
  },
}
</script>
