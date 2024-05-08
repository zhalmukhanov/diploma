<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu type="overlay" content-id="main-content" :disabled="isDisabledMenuPage">
      <div class="custom-menu">
        <div class="flex gap-3 items-center">
          <div class="text-[16px] text-white font-bold flex items-center justify-center rounded-full h-11 w-11 bg-blue-700">
            {{ getFirstLatters(userName) }}
          </div>
          <div class="flex flex-col">
            <span class="text-[16px] font-medium gap-0.5">
              {{userName}}
            </span>
            <span class="text-[14px]">
              {{phone}}
            </span>
          </div>
        </div>
        <div class="menu-link-container">
          <div v-for="pages in appPages" :key="pages.url" >
            <ion-menu-toggle>
              <span @click="goToPage(pages.url)" class="menu-link">{{pages.title}}</span>
            </ion-menu-toggle>
          </div>
        </div>
      </div>

    </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonMenu,
    IonMenuToggle,
    IonRouterOutlet
} from '@ionic/vue';
import {computed, onMounted} from 'vue';
import {
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';
import {useRoute, useRouter} from "vue-router";


const route = useRoute();
const router = useRouter();
const currentPage = computed(() => route.path.split('/')[1]);

const isDisabledMenuPage = computed(() => {
  return ['hello', 'login', 'register', 'reset-password'].includes(currentPage.value);
});

const userName = 'Adilbek Zhalmukhanov';
const phone = '+77058253345';

const getFirstLatters = (name: string) => {
  return name.split(' ').map((item) => item[0]).join('').toUpperCase();
};

const goToPage = (url: string) => {
  router.push(url);
};

const appPages = [
  {
    title: 'My reservations',
    url: '/my-reservation',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Bonuses and promo codes',
    url: '/bonuses',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: 'Settings',
    url: '/settings',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'Support',
    url: '/support',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: 'Log out',
    url: '/logout',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
];


onMounted(() => {
  const hasUser = window.localStorage.getItem('user');

  if (!hasUser) {
    router.push('/login');
  }
});
</script>

<style scoped>
.custom-menu {
  margin-top: 100px;
  padding: 0 25px 0 25px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}
.menu-link {
  font-size: 16px;
  font-weight: 500;
  color: #030712;
  text-transform: uppercase;
}
.menu-link-container {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
