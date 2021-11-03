<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>パスワード確認</ion-title>

      <ion-buttons slot="end">
        <ion-button @click="this.close()">
          <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col text-center size="12">
          <ion-item>
            <ion-label position="floating">パスワード</ion-label>
            <ion-input :value="password" @input="password = $event.target.value" type="password"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col text-center size="12">
          <ion-button @click="checkPassword" expand="block">確認</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/vue";
import {closeCircle} from "ionicons/icons";
import {defineComponent} from "vue";

export default defineComponent({
  name: "NewChatModal",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
    IonButton,
    IonIcon
  },
  data() {
    return {
      title: '',
      content: '',
      lock: 'false',
      password: ''
    }
  },
  props: {
    close: {type: Function},
    pw: {type: String},
    chatId: {type: String},
    chatTitle: {type: String}
  },
  methods: {
    checkPassword() {
      if (this.password === this.pw) {
        this.$router.push({name: 'Chat', params: {chatId: this.chatId, title: this.chatTitle}});
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.close();
      } else {
        alert('パスワードが違います');
      }
    }
  },
  setup() {
    return {
      closeCircle
    }
  }
});
</script>

<style scoped>

</style>
