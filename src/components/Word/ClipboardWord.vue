<template>
  <div>
    <v-list-item class="clipboard-wrapper" @dblclick="isDblclick = !isDblclick">
      <template v-slot:default>
        <v-list-item-content class="clipboard-select">
          <p ref="text" v-html="setText(text)"></p>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon
              color="red lighten-1"
              class="btn-clipboard"
              @click="doDelete"
              >mdi-delete-empty-outline</v-icon
            >
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon :disabled="!hendler">
            <v-icon
              color="green lighten-1"
              class="btn-clipboard"
              @click="doCopy"
              >mdi-content-copy</v-icon
            >
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider v-if="setLine"></v-divider>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { firebase } from '@firebase/app'
import '@firebase/firestore'

export default {
  props: {
    hendler: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    textKey: {
      type: Array,
    },
  },

  data() {
    return {
      isDblclick: false,
      dialogs: {
        delete: false,
      },
    }
  },
  computed: {
    ...mapGetters({ tabActive: 'getTabActive' }),
    setLine() {
      const index = this.textKey[0] + 1

      return index < this.textKey[1]
    },
  },
  methods: {
    ...mapActions({ deleteWord: 'DELETE_WORD' }),
    setText(val) {
      const opt = {
        name: '{ }',
        nameCompany: '{ $2 }',
        titleOffer: '{ $1 }',
        cost: '{ $cost }',
        time: '{ $time }',
      }
      const newHeader = this.hendler
        ? this.hendler
        : '<span class="mark">{ name }</span>'
      const newHeaderFixer = `${newHeader[0].toUpperCase()}${newHeader.slice(
        1
      )}`
      const newText = val.replace(opt.name, newHeaderFixer)
      return `${newText}`
    },
    async doCopy() {
      try {
        await this.$copyText(this.$refs.text.innerHTML)
        this.$emit('dialog', 'success')
      } catch (error) {
        this.$emit('dialog', 'error')
      }
    },
    async doDelete() {
      try {
        await this.deleteWord({ id: this.textKey[0], section: this.tabActive })
        await this.$copyText(this.$refs.text.innerHTML)
        this.$emit('dialog', 'success')
      } catch (error) {
        this.$emit('dialog', 'error')
      }
    },
  },
}
</script>

<style lang="scss">
.clipboard-select {
  p {
    span {
      opacity: 0.5 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.clipboard-select p {
  font-size: 14px;
  line-height: 17px;
  -webkit-user-select: all;
  user-select: all;

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
