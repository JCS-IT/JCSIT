<script setup lang="ts">
const dialog = ref<HTMLDialogElement | null>(null);
</script>

<template>
  <button class="btn btn-ghost" @click="dialog?.showModal()">
    <IconCSS name="mdi:comedy" />
  </button>
  <dialog class="modal" ref="dialog">
    <div class="modal-box card">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="card-body">
        <RandomJoke />
      </div>
    </div>
    <div class="modal-backdrop" @click="dialog?.close()"></div>
  </dialog>
</template>
