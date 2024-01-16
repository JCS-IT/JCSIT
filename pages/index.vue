<script setup lang="ts">
// import { FloorMap } from "@/data/mapping";
import type { ConfigData } from "@/types";
import { doc } from "firebase/firestore";
const router = useRouter();

const configData = useDocument<ConfigData>(
  doc(useFirestore(), "global/config"),
);
</script>

<template>
  <div class="grid gap-2">
    <div class="flex justify-center" v-if="!configData">
      <span class="loading loading-spinner loading-lg" />
    </div>
    <div
      class="grid gap-2 flex-wrap"
      v-for="floor in configData?.floors.toReversed()"
    >
      <div class="divider h-0">{{ floor.name }}</div>
      <div class="flex flex-wrap gap-1 justify-center">
        <Button
          v-for="cart in floor.carts"
          :key="cart.id"
          @click="router.push({ name: 'cart-id', params: { id: cart.id } })"
          :style="{
            backgroundColor: `#${cart.color}`,
            color: getTextColor(`#${cart.color}`),
          }"
          class="flex-grow"
        >
          {{
            `Cart ${cart.id} (${cart.name.split(" ")[0]} | ${
              cart.location.room
            })`
          }}
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
</template>
