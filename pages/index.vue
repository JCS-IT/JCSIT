<script setup lang="ts">
// import { FloorMap } from "@/data/mapping";
import type { ConfigDoc } from "@/types";
import { doc } from "firebase/firestore";

const configDoc = useDocument<ConfigDoc>(
  doc(useFirestore(), "global/config"),
);

const groups = computed(() => {
  if (!configDoc.value?.floors) return [];

  const { floors } = configDoc.value;

  return floors.map((floor) => {
    return {
      name: floor.name,
      carts: floor.carts.map((cart) => {
        return {
          ...cart,
          text: `Cart ${cart.id} (${cart.name.split(" ")[0]} | ${cart.location.room})`,
        };
      }),
    };
  });
});

const tab = ref(0);
</script>

<template>
  <div class="grid gap-2">
    <div class="flex justify-center" v-if="!configDoc">
      <span class="loading loading-spinner loading-lg" />
    </div>
    <div>
      <div
        class="grid gap-2 flex-wrap"
        v-for="(floor, i) in configDoc?.floors.toReversed()"
      >
        <div class="divider h-0">{{ floor.name }}</div>
        <div class="flex flex-wrap gap-1 justify-center">
          <Button v-for="item in groups[i]">{{ item }}</Button>
          <!-- <Button
            v-for="cart in floor.carts"
            :key="cart.id"
            @click="
              navigateTo({
                name: 'booking-target',
                params: { target: `cart-${cart.id}` },
              })
            "
            :style="{
              backgroundColor: cart.color,
              color: getTextColor(cart.color),
            }"
            class="flex-grow"
          >
            {{
              `Cart ${cart.id} (${cart.name.split(" ")[0]} | ${
                cart.location.room
              })`
            }}
          </Button> -->
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
