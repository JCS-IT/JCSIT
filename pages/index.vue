<script setup lang="ts">
// import { FloorMap } from "@/data/mapping";
import type { ConfigDoc } from "@/types";
import { doc } from "firebase/firestore";

const configDoc = useDocument<ConfigDoc>(doc(useFirestore(), "global/config"));

const groups = computed(() => {
  if (!configDoc.value?.floors) return [];

  const { floors } = configDoc.value;

  return floors
    .map((floor) => {
      const carts = floor.carts.map((cart) => {
        return {
          ...cart,
          text: `Cart ${cart.id} (${cart.name.split(" ")[0]} | ${cart.location.room})`,
          target: `cart-${cart.id}`,
          style: {
            backgroundColor: cart.color,
            color: getTextColor(cart.color),
          },
        };
      });

      const rooms =
        floor.rooms?.map((room) => {
          return {
            text: parseInt(room.name) ? `Room ${room}` : room,
            target: stringToSlug(room.name),
            style: null,
          };
        }) || [];

      return {
        carts,
        rooms,
      };
    })
    .toReversed();
});

const tab = ref<"carts" | "rooms">("carts");
</script>

<template>
  <div class="grid gap-2">
    <div class="flex justify-center" v-if="!configDoc">
      <span class="loading loading-spinner loading-lg" />
    </div>
    <div class="grid gap-2">
      <div>
        <div role="tablist" class="tabs tabs-bordered">
          <button
            role="tab"
            class="tab"
            :class="{
              'tab-active': tab === 'carts',
            }"
            @click="tab = 'carts'"
          >
            Laptop Carts
          </button>
          <button
            role="tab"
            class="tab"
            :class="{
              'tab-active': tab === 'rooms',
            }"
            @click="tab = 'rooms'"
            disabled
          >
            Rooms
          </button>
        </div>
      </div>
      <div
        class="grid gap-2 flex-wrap"
        v-for="(floor, i) in configDoc?.floors.toReversed()"
      >
        <div class="divider h-0">{{ floor.name }}</div>
        <div class="flex flex-wrap gap-1 justify-center">
          <Button
            v-for="(item, j) in groups[i][tab]"
            :key="j"
            @click="
              navigateTo({
                name: 'booking-target',
                params: { target: item.target },
              })
            "
            :style="item.style"
            class="flex-grow"
          >
            {{ item.text }}
          </Button>
        </div>
      </div>
      <div class="w-full">
        <div class="divider"></div>
        <a class="btn-error w-full btn" href="https://ism.cbe.ab.ca">
          <IconCSS name="mdi:fire" />
          <span>HEAT ticket</span>
        </a>
      </div>
    </div>
  </div>
</template>
