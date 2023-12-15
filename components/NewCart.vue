<script setup lang="ts">
import type { Cart } from "~/types";

const emit = defineEmits<{
  (event: "submit", data: Cart): void;
}>();

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
      <div class="grid mt-5 join join-vertical">
        <input
          type="number"
          class="input input-bordered bg-inherit join-item"
          placeholder="Number"
          min="1"
          max="99"
          v-model="newCart.id"
        />
        <input
          type="text"
          class="input input-bordered bg-inherit join-item"
          placeholder="Name"
          v-model="newCart.name"
        />
        <input
          type="number"
          class="input input-bordered bg-inherit join-item"
          placeholder="Floor"
          min="1"
          max="3"
          v-model="newCart.location.floor"
        />
        <input
          type="text"
          class="input input-bordered bg-inherit join-item"
          placeholder="Room"
          v-model="newCart.location.room"
        />
        <input
          type="text"
          class="input input-bordered bg-inherit join-item"
          placeholder="Color (hex)"
          v-model="newCart.color"
          maxlength="7"
          pattern="[0-9a-fA-F]{3}([0-9a-fA-F]{3})?"
        />
      </div>
      <button
        class="btn btn-block btn-success mt-2"
        @click="
          emit('submit', newCart);
          dialog?.close();
        "
      >
        <span>Submit</span>
      </button>
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
