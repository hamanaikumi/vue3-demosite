<template>
  <div class="header">
    <p class="header-logo">Sample Cafe</p>
    <div class="header-menu__tab">
      <router-link class="router-link" to="/"> <p>Menu</p></router-link>
      <router-link class="router-link" to="/"> <p>Shops</p></router-link>
      <router-link class="router-link" to="/"> <p>Recruit</p></router-link>

      <div class="header-icon">
        <img src="../../assets/images/twitter.svg" alt="twitterアイコン" />
        <img src="../../assets/images/instagram.svg" alt="instagramアイコン" />
      </div>
    </div>
    <div
      class="header-menu__sp"
      @click="menuSwitch"
      v-bind:class="{ 'header-menu__active': state.isActive }"
    >
      <span></span>
    </div>
  </div>
  <transition name="slide">
    <modal v-show="state.isActive" />
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Modal from "./Top/Modal.vue";

export default defineComponent({
  components: { Modal },
  setup() {
    const state = ref({
      isActive: false,
    });
    const menuSwitch = () => {
      state.value.isActive = !state.value.isActive;
    };
    return { state, menuSwitch };
  },
});
</script>
<style lang="scss" scoped>
.router-link {
  text-decoration: none;
}
.header {
  height: 120px;
  display: flex;
  justify-content: space-between;

  &-logo {
    font-size: 2rem;
    font-weight: bold;
  }
  &-icon {
    display: flex;
    img {
      margin-left: 60px;
      width: 40px;
    }
  }
  &-menu__tab {
    @include menuText;
    @include tab {
      display: none;
    }
    display: flex;

    p {
      margin-left: 60px;

      &::after {
        border-bottom: solid 2px #3333;
        bottom: 0;
        content: "";
        display: block;
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        width: 0;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }

  @include tab {
    &-menu__sp {
      display: inline-block;
      transition: all 0.4s;
      box-sizing: border-box;
      position: relative;

      width: 40px;
      height: 40px;
      border: none;
      appearance: none;
      cursor: pointer;

      span {
        display: inline-block;
        transition: all 0.4s;
        box-sizing: border-box;

        position: relative;
        left: 0;
        width: 100%;
        height: 4px;
        border-radius: 4px;

        color: #3333;
        background: currentColor;
        position: relative;
        cursor: pointer;

        &::before {
          content: "";
          position: absolute;
          top: -15px;
          width: 100%;
          height: 100%;
          background: currentColor;
        }
        &::after {
          content: "";
          position: absolute;
          top: 15px;
          width: 100%;
          height: 100%;
          background: currentColor;
        }
      }
    }
  }

  &-menu__active {
    span {
      top: -15px;
      transform: translateY(20px) rotate(-45deg);

      &::before {
        opacity: 0;
      }
      &::after {
        top: 20px;
        transform: translateY(-20px) rotate(90deg);
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100vw) translateX(0px);
}
</style>
