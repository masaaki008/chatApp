<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
              defaultHref="/login"
              text="戻る"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>新規登録</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col text-center size-lg="4" offset-lg="4">
            <ion-item>
              <ion-label position="floating">メールアドレス</ion-label>
              <ion-input :value="email" @input="email = $event.target.value" type="email"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col text-center size-lg="4" offset-lg="4">
            <ion-item>
              <ion-label position="floating">パスワード</ion-label>
              <ion-input :value="password" @input="password = $event.target.value" type="password"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col text-center size-lg="4" offset-lg="4">
            <ion-item>
              <ion-label position="floating">ニックネーム</ion-label>
              <ion-input :value="nickName" @input="nickName = $event.target.value"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col text-center size-lg="4" offset-lg="4">
            <ion-button @click="signup()" expand="block">登録</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonInput,
  IonButton,
  IonItem
} from "@ionic/vue";
import {defineComponent} from "vue";

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, doc, setDoc, Timestamp} from 'firebase/firestore';

export default defineComponent({
  name: "SignUp",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonBackButton,
    IonButtons,
    IonLabel,
    IonInput,
    IonButton,
    IonItem
  },
  data() {
    return {
      email: '',
      password: '',
      nickName: '',
    }
  },
  methods: {
    signup() {
      const auth = getAuth();
      const db = getFirestore();
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;

            const userData = {
              uid: user.uid,
              nickName: this.nickName,
              createDate: Timestamp.fromDate(new Date()),
              updateDate: Timestamp.fromDate(new Date())
            }
            setDoc(doc(db, 'users', user.uid), userData);
            alert('登録しました');
            this.$router.push({path: '/chats_menu'});
          })
          .catch((error) => {
            console.log(error);
            alert('エラー');
          });
    }
  },
});
</script>

<style scoped>

</style>
