<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>ログイン</ion-title>
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
          <ion-col text-center size-lg="2" offset-lg="4">
            <ion-button @click="login()" expand="block">ログイン</ion-button>
          </ion-col>
          <ion-col text-center size-lg="2">
            <ion-button href="/sign_up" color="danger" expand="block">新規登録</ion-button>
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
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton
} from "@ionic/vue";
import {defineComponent} from "vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default defineComponent({
  name: "Login",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            alert('ログイン');
            this.$router.push({path: '/chats_menu'});
          })
          .catch((error) => {
            console.log(error);
            alert('ログインに失敗しました\n管理者に問い合わせてください');
          })
    }
  }
});
</script>

<style scoped>

</style>
