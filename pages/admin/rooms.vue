<script setup lang="ts">
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import type { ConfigData } from "~/types";

definePageMeta({
  middleware: "auth",
});

const configRef = doc(useFirestore(), "global", "config");

const configData = useDocument<ConfigData>(configRef);

const updateConfig = async () => {
  await updateDoc(configRef, {
    rooms: configData.value?.rooms,
  });
};

const generateRandomNumber = (max: number) => {
  const num = Math.floor(Math.random() * max) + 1;
  return num.toString().padStart(3, "0");
};

console.log(
  new Set(
    Array.from({ length: 300 }, (i) => {
      return `${Math.floor(Math.random() * 3) + 1}${generateRandomNumber(200)}`;
    }),
  ),
);
</script>
<template>
  <div class="grid gap-2">
    <div v-if="(configData?.rooms && configData.rooms.length > 0) || true">
      <div class="w-full flex flex-wrap gap-2">
        <div
          v-for="(room, i) in new Set(
            Array.from({ length: 300 }, (i) => {
              return `${
                Math.floor(Math.random() * 3) + 1
              }${generateRandomNumber(200)}`;
            }),
          )"
        >
          <input
            type="text"
            class="input input-bordered"
            :key="room"
            :value="room"
          />
          <IconCSS name="mdi:delete" class="btn btn-ghost btn-error" />
        </div>
      </div>
      <button class="btn" @click="updateConfig">
        <IconCSS name="mdi:content-save" />
        <span>Save</span>
      </button>
    </div>
    <span v-else class="text-center"> No rooms found </span>
    <button class="btn">
      <IconCSS name="mdi:plus-circle" />
      <span>Add Room</span>
    </button>
  </div>
</template>
