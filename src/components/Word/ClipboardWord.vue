<template>
  <div>
    <v-list-item class="clipboard-wrapper" @dblclick="isDblclick = !isDblclick">
      <template v-slot:default>
        <v-list-item-content class="clipboard-select">
          <p ref="text" v-html="setText(text)"></p>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon :disabled="!hendler">
            <v-icon @click="doCopy" color="green lighten-1" class="btn-clipboard">mdi-content-copy</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    hendler: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    textKey: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isDblclick: false,
      dialogs: {
        delete: false,
      },
    };
  },
  computed: {
    nameDownLine() {
      return this.textKey;
    },
  },
  methods: {
    setText(val) {
      const newHeader = !!this.hendler ? this.hendler : "<span>{ name }</span>";
      const newHeaderFixer = `${newHeader[0].toUpperCase()}${newHeader.slice(
        1
      )}`;
      const newText = val.replace(/{ }/i, newHeaderFixer);
      return `${newText}`;
    },
    async doCopy() {
      try {
        const data = await this.$copyText(this.$refs.text.innerHTML);
        this.$emit("dialog", "success");
      } catch (error) {
        this.$emit("dialog", "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.clipboard-select p {
  -webkit-user-select: all;
  user-select: all;

  span {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    animation: select 100ms step-end forwards;
  }
}

@keyframes select {
  to {
    -webkit-user-select: text;
    user-select: text;
  }
}
</style>
