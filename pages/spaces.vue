<script setup lang="ts">
import type { ConfigDoc } from "@/types";
import { doc } from "firebase/firestore";
import { stringToSlug } from "~/utils/parse";
const router = useRouter();

const configDoc = useDocument<ConfigDoc>(
  doc(useFirestore(), "global/config"),
);
</script>

<template>
  <div
    class="grid gap-2"
    v-if="configDoc?.rooms && configDoc?.rooms.length > 0"
  >
    <div
      class="grid gap-2 flex-wrap"
      v-for="(floor, i) in [
        'Main Floor',
        'Second Floor',
        'Third Floor',
      ].toReversed()"
    >
      <div class="divider h-0">{{ floor }}</div>
      <div class="flex flex-row flex-wrap gap-1 justify-center">
        <Button
          v-for="room in configDoc?.filter(
            (room) =>
              room.includes(floor) || room.split('')[0] == (i + 1).toString(),
          )"
          @click="
            navigateTo({
              name: 'booking-target',
              params: { target: stringToSlug(room) },
            })
          "
          class="flex-grow"
        >
          {{ parseInt(room) ? `Room ${room}` : room }}
        </Button>
      </div>
    </div>
  </div>
  <div class="text-center" v-else>
    <h1>No rooms found. Please contact the IT to add rooms.</h1>
    <p>Have this joke in the meantime</p>
    <RandomJoke
      class="mt-4 shadow-inner border rounded-xl p-2 dark:border-[#383f47]"
    />
  </div>
</template>
