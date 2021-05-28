<template>
  <div>
    <v-list flat class="pt-0">
      <ClipboardWord
        @dialog="onDialog"
        v-for="(word, i) in words"
        :key="i"
        :hendler="hendlerText || clipboarText || isHeader"
        :text="word.text"
      />
    </v-list>
    <DialogInfo @snackbar:close="close" :snackbar="showDialog" :text="textDialog" :type="type"></DialogInfo>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
const DialogInfo = () => import("@/components/Main/DialogInfo.vue");
const ClipboardWord = () => import("@/components/Word/ClipboardWord.vue");
export default {
  props: ["words"],
  components: {
    ClipboardWord,
    DialogInfo
  },
  data() {
    return {
      showDialog: false,
      textDialog: "",
      type: "",
      hendlerText: "",
      clipboarText: "",
      polling: null
    };
  },
  watch: {
    "$store.state.words.textInputName": {
      immediate: true,
      handler(newValue) {
        this.hendlerText = newValue;
      }
    },
    "$store.state.words.textInClipboard": {
      immediate: true,
      handler(newValue) {
        this.clipboarText = newValue;
      }
    }
  },
  computed: {
    ...mapState(["textInClipboard"]),
    ...mapGetters(["getClipboardData"]),
    isHeader() {
      return this.getClipboardData || "";
    }
  },
  methods: {
    ...mapActions(["SET_CLIPBOARD_DATA"]),
    close(e) {
      this.showDialog = e;
    },
    onDialog(type) {
      if (type === "success") {
        this.textDialog = "Success текст добавлен в буфер обмена";
        this.showDialog = true;
        this.type = "success";
      } else {
        this.textDialog = "Error текст не добавлен";
        this.showDialog = true;
        this.type = "error";
      }
    },
    async onClipParse() {
      this.polling = await setInterval(() => {
        this.SET_CLIPBOARD_DATA();
      }, 4000);
    },
    onWindowFocuse(event) {
      console.log("--- onWindowFocuse", event);

      this.onClipParse();
    },
    onWindowBlur(event) {
      console.log("--- onWindowBlur", event);

      clearInterval(this.polling);
      console.log("--- polling", this.polling);
    }
  }
};
</script>