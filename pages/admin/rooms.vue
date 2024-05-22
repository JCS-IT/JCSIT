<script setup lang="ts">
import { doc, updateDoc } from "firebase/firestore";
import type { ConfigDoc } from "~/types";

definePageMeta({
  middleware: "auth",
});

const newRoom = ref({
  name: "",
  floor: 0,
});

const configRef = doc(useFirestore(), "global", "config");
const configDoc = useDocument<ConfigDoc>(configRef);

const addRoom = async () => {
  if (!newRoom.value.name || !newRoom.value.floor) return;

  const floor = newRoom.value.floor - 1;

  console.log(configDoc.value?.floors[floor].rooms)

  if (!configDoc.value?.floors[floor].rooms) {
    configDoc.value?.floors[floor].rooms.push(newRoom.value);
  }

  console.log(configDoc.value?.floors[floor].rooms);

  await updateDoc(configRef, {
    floors: configDoc.value?.floors,
  });
};

const removeRoom = async (
  room: ConfigDoc["floors"][number]["rooms"][number],
) => {
  const arr = configDoc.value?.floors.toReversed()[room.floor].rooms;

  arr?.slice(arr?.indexOf(room), 1);

  await updateDoc(configRef, {
    floors: configDoc.value?.floors,
  });
};
</script>
<template>
  <div class="grid gap-2">
    <div class="grid gap-3">
      <div class="flex join items-center justify-center flex-grow">
        <input
          type="text"
          class="input input-bordered join-item"
          v-model="newRoom.name"
          placeholder="New Room"
        />
        <select
          class="select select-bordered join-item"
          v-model="newRoom.floor"
        >
          <option value="" disabled selected hidden>Floor</option>
          <option v-for="i in 3" :value="i" v-text="i" />
        </select>
        <button
          class="btn input-bordered btn-ghost join-item"
          title="Add"
          @click="addRoom()"
          disabled
        >
          <IconCSS name="mdi:plus-circle" />
        </button>
      </div>
    </div>
    <div class="divider" />

    <div class="grid gap-2">
      <div
        class="grid gap-2 flex-wrap"
        v-for="(floor, i) in configDoc?.floors.toReversed()"
      >
        <div class="divider h-0">{{ floor.name }}</div>
        <div class="flex flex-wrap gap-1 justify-center">
          <HoverButton
            v-for="room in floor.rooms"
            :room="room.name"
            @click="removeRoom(room)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
