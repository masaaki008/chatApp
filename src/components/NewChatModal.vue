<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>新規チャット作成</ion-title>

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
            <ion-label position="floating">タイトル</ion-label>
            <ion-input :value="title" @input="title = $event.target.value" type="text"></ion-input>
          </ion-item>
        </ion-col>

        <ion-col text-center size="12">
          <ion-item>
            <ion-label position="floating">内容</ion-label>
            <ion-textarea
                clear-on-edit="true"
                :value="content" @input="content = $event.target.value"
            ></ion-textarea>
          </ion-item>
        </ion-col>

        <ion-col text-center size="12">
          <ion-radio-group v-model="lock">
            <ion-item>
              <ion-label>なし</ion-label>
              <ion-radio slot="start" color="success" value="false"></ion-radio>
            </ion-item>

            <ion-item>
              <ion-label>あり</ion-label>
              <ion-radio slot="start" color="success" value="true"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-col>

        <ion-col text-center size="12">
          <ion-item>
            <ion-label position="floating">パスワード</ion-label>
            <ion-input :disabled="lock === 'false'" :value="password" @input="password = $event.target.value" type="password"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col text-center size="12">
          <ion-button @click="newChat" expand="block">作成</ion-button>
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
  IonTextarea,
  IonRadioGroup,
  IonRadio,
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/vue";
import {closeCircle} from "ionicons/icons";
import {defineComponent} from "vue";
import {getFirestore, doc, setDoc, collection} from "firebase/firestore";

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
    IonTextarea,
    IonRadioGroup,
    IonRadio,
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
    close: {type: Function}
  },
  methods: {
    newChat() {
      const db = getFirestore();
      const chatsRef = doc(collection(db, 'chats'));
      const chatId = chatsRef.id;
      const isLock = this.lock === 'true' ? true : false;
      const pw = isLock === true ? this.password : '';
      const chatData = {
        title: this.title,
        content: this.content,
        lock: isLock,
        password: pw,
        chatId: chatId
      }
      setDoc(chatsRef, chatData);
      if (this.close !== undefined) {
        this.close();
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
