<script setup lang="ts">
import type { Cart } from "~/types";

const dialog = ref<HTMLDialogElement | null>(null);

const newCart = ref<Cart>({
  id: 0,
  name: "",
  location: {
    floor: "",
    room: "",
  },
  color: "",
});
</script>

<template>
  <button class="btn" @click="dialog?.showModal">
    <span> New Cart </span>
    <IconCSS name="mdi:plus-circle" />
  </button>
  <dialog ref="dialog" class="modal">
    <div class="modal-box w-fit">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <IconCSS name="mdi:close" />
        </button>
      </form>
      <span class="text-center font-semibold">New Cart</span>
      <div class="grid gap-2 mt-5">
        <input
          type="number"
          class="input input-bordered"
          v-model="newCart.id"
          placeholder="Number"
        />
        <input
          type="text"
          class="input input-bordered"
          v-model="newCart.name"
          placeholder="Name"
        />
        <input
          type="text"
          class="input input-bordered"
          v-model="newCart.location.room"
          placeholder="Room"
        />
        <input
          type="number"
          min="1"
          max="3"
          class="input input-bordered"
          v-model="newCart.location.floor"
          placeholder="Floor"
        />
        <input
          type="color"
          class="w-full bg-inherit rounded-xl"
          placeholder="Color (in HEX)"
          v-model="newCart.color"
        />
        <button class="btn btn-block btn-success">
          <span>Submit</span>
        </button>
      </div>
    </div>
    <form class="modal-backdrop" method="dialog">
      <button />
    </form>
  </dialog>
</template>

<style scoped>
/* input[type="color"] {
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  background-color: transparent;
  border: 0;
  border-radius: 100%;
}
input[type="color" i] {
  width: 44px;
  height: 23px;
  background-color: buttonface;
  cursor: default;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(169, 169, 169);
  border-image: initial;
  padding: 1px 2px;
} */
</style>
