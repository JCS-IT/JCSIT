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
