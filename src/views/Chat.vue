<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
              defaultHref="/chats_menu"
              text="戻る"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row v-for="c in chat" :key="c.id">
          <ion-col v-if="userId === c.userId" size-lg="4" offset-lg="7">
            <ion-card style="background: #2dd36f;">
              <ion-card-content style="color: #1e2023">
                {{c.content}}
              </ion-card-content>
              <ion-card-subtitle style="padding-left: 5px;">
                {{c.nickName === '' ? '匿名' : c.nickName}}
              </ion-card-subtitle>
            </ion-card>
          </ion-col>
          <ion-col v-if="userId !== c.userId" size-lg="4" offset-lg="1">
            <ion-card style="background: #92949c;">
              <ion-card-content style="color: #1e2023">
                {{c.content}}
              </ion-card-content>
              <ion-card-subtitle style="padding-left: 5px;">
                {{c.nickName === '' ? '匿名' : c.nickName}}
              </ion-card-subtitle>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

    <ion-footer>
      <ion-toolbar :translucent="true">
        <ion-item>
          <ion-label position="floating">メッセージ</ion-label>
          <ion-textarea
              maxlength="1000"
              clear-on-edit="true"
              auto-grow="true"
              :value="content" @input="content = $event.target.value"
          ></ion-textarea>

          <ion-buttons slot="end">
            <ion-button @click="send" fill="outline" :disabled="content.length == 0">送信</ion-button>
          </ion-buttons>
        </ion-item>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
  IonItem,
  IonLabel,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardSubtitle
} from "@ionic/vue";
import {defineComponent} from "vue";
import {getAuth} from "firebase/auth";
import {getFirestore, doc, getDoc, collection, setDoc, onSnapshot, query, where, Timestamp, orderBy} from "firebase/firestore";

export default defineComponent({
  name: "Chat",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonFooter,
    IonButton,
    IonItem,
    IonLabel,
    IonTextarea,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardSubtitle
  },
  data() {
    return {
      title: '',
      chatId: '',
      chat: [],
      content: '',
      userId: ''
    }
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.title = this.$route.params.title;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.chatId = this.$route.params.chatId;

    if (this.chatId === undefined || this.chatId === null || this.chatId === '') {
      this.$router.push({path: '/chats_menu'});
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      this.userId = user.uid;
    }
    const db = getFirestore();
    const q = query(
        collection(db, 'chat'),
        where('chatId', '==', this.chatId),
        orderBy('createDate'));
    onSnapshot(q, (snapshot) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const list = [];
      snapshot.forEach((doc) => {
        const listData = {
          content: doc.data().content,
          userId: doc.data().userId,
          nickName: doc.data().nickName,
          id: doc.data().id
        }
        list.push(listData);
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.chat = list;
    })
  },
  methods: {
    async send() {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      let userId = '';
      let nickName = '';
      if (user !== null) {
        userId = user.uid;
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          nickName = userSnap.data().nickName;
        }
      }
      const chatId = this.chatId;
      const chatRef = doc(collection(db, 'chat'));
      await setDoc(chatRef, {
        chatId: chatId,
        id: chatRef.id,
        content: this.content,
        nickName: nickName,
        userId: userId,
        createDate: Timestamp.fromDate(new Date()),
        updateDate: Timestamp.fromDate(new Date())
      });
      this.content = '';
    }
  }
});
</script>

<style scoped>

</style>
