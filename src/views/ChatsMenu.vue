<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="logout()">
            <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-title>チャット一覧</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row v-for="chat in chats" :key="chat.chatId">
          <ion-col size-lg="8" offset-lg="2">
            <ion-card @click="goChat(chat)">
              <ion-card-header>
                <ion-item>
                  <ion-card-title>
                    {{chat.title}}
                  </ion-card-title>
                  <ion-icon v-if="!chat.lock" slot="end" :icon="lockOpen"></ion-icon>
                  <ion-icon v-if="chat.lock" slot="end" :icon="lockClosed"></ion-icon>
                </ion-item>
              </ion-card-header>

              <ion-card-content>
                {{chat.content}}
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button @click="openNewChatModal" shape="round" class="fixed-btn">
        <ion-icon slot="icon-only" :icon="pencilOutline"></ion-icon>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  modalController
} from "@ionic/vue";
import {
  logOutOutline,
  pencilOutline,
  lockOpen,
  lockClosed
} from 'ionicons/icons';
import {defineComponent} from "vue";
import {getAuth, signOut} from "firebase/auth";
import {getFirestore, onSnapshot, collection} from "firebase/firestore";
import NewChatModal from "@/components/NewChatModal.vue";
import ChatPasswordModal from "@/components/ChatPasswordModal.vue";

export default defineComponent({
  name: "ChatsMenu",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem
  },
  data() {
    return {
      chats: []
    }
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
          .then(() => {
            alert('ログアウトしました');
            this.$router.push({path: '/login'});
          })
          .catch((error) => {
            console.log(error);
            alert('ログアウトに失敗しました\n管理者に問い合わせしてください');
          })
    },
    async goChat(chat: any) {
      if (chat.lock) {
        const modal = await modalController.create({
          component: ChatPasswordModal,
          componentProps: {
            close: () => modalController.dismiss(),
            pw: chat.password,
            chatId: chat.chatId,
            chatTitle: chat.title
          }
        })
        return modal.present();
      } else {
        await this.$router.push({name: 'Chat', params: {chatId: chat.chatId, title: chat.title}});
      }
    },
    async openNewChatModal() {
      const modal = await modalController.create({
        component: NewChatModal,
        componentProps: {
          close: () => modalController.dismiss()
        }
      })
      return modal.present();
    }
  },
  setup() {
    return {
      logOutOutline,
      pencilOutline,
      lockOpen,
      lockClosed
    }
  },
  created() {
    const db = getFirestore();
    onSnapshot(collection(db, 'chats'), (snapshot) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const list = [];
      snapshot.forEach((doc) => {
        const listData = {
          title: doc.data().title,
          content: doc.data().content,
          lock: doc.data().lock,
          chatId: doc.data().chatId,
          password: doc.data().password
        }
        list.push(listData);
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.chats = list;
    });
  }
});
</script>

<style scoped>
.fixed-btn {
  position:fixed;
  right:20px;
  bottom:20px;
}
</style>
