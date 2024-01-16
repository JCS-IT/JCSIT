<script setup lang="ts">
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import type { ConfigData } from "~/types";

definePageMeta({
  middleware: "auth",
});

const rooms = ref<string[]>([]);
const newRoom = ref("");

const configRef = doc(useFirestore(), "global", "config");
const configData = useDocument<ConfigData>(configRef);

watchEffect(() => {
  if (configData.value?.rooms) {
    rooms.value = configData.value.rooms;
  }
});

const addRoom = async () => {
  if (newRoom.value) {
    await updateDoc(configRef, {
      rooms: arrayUnion(newRoom.value),
    });
    newRoom.value = "";
  }
};

const removeRoom = async (room: string) => {
  await updateDoc(configRef, {
    rooms: arrayRemove(room),
  });
};

const updateRooms = async () => {
  try {
    await updateDoc(configRef, {
      rooms: rooms.value,
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div class="grid gap-2">
    <div class="grid gap-3">
      <div class="flex join items-center justify-center flex-grow">
        <InputBasic
          type="text"
          class="join-item"
          placeholder="Space Name"
          v-model="newRoom"
        />
        <button
          class="btn input-bordered btn-ghost join-item"
          title="Add"
          @click="addRoom()"
        >
          <IconCSS name="mdi:plus-circle" />
        </button>
      </div>
    </div>
    <div class="divider" />
    <div v-if="configData?.rooms && configData.rooms.length > 0">
      <div class="flex flex-wrap max-w-4xl gap-1">
        <div
          class="flex join items-center justify-center flex-grow"
          v-for="(room, index) in rooms"
        >
          <input
            type="text"
            class="input input-bordered join-item"
            v-model="rooms[index]"
            @change.lazy="updateRooms()"
          />
          <button
            class="btn input-bordered btn-ghost join-item"
            @click="removeRoom(room)"
          >
            <IconCSS name="mdi:delete" />
          </button>
        </div>
      </div>
    </div>
    <span v-else class="text-center"> No rooms found </span>
  </div>
</template>
